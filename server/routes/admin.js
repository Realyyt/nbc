import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { runQuery, getQuery, allQuery } from '../database/init.js';
import { sendAffiliateApproval, sendAffiliateRejection, generateAffiliateCredentials } from '../services/emailService.js';
import { verifyToken, requireAdmin } from './auth.js';

const router = express.Router();

// Get all applications
router.get('/affiliates/applications', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Get applications with pagination
    const applications = await allQuery(
      `SELECT * FROM affiliate_applications 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    // Get total count
    const totalCount = await getQuery('SELECT COUNT(*) as count FROM affiliate_applications');

    res.json({
      applications,
      total: totalCount.count,
      page: parseInt(page),
      totalPages: Math.ceil(totalCount.count / limit)
    });

  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Failed to get applications' });
  }
});

// Review application (approve/reject)
router.put('/affiliates/applications/:id/review', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Get application
    const application = await getQuery(
      'SELECT * FROM affiliate_applications WHERE id = ?',
      [id]
    );

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({ error: 'Application has already been reviewed' });
    }

    // Update application status
    await runQuery(
      `UPDATE affiliate_applications 
       SET status = ?, reviewed_by = ?, reviewed_at = CURRENT_TIMESTAMP, rejection_reason = ?
       WHERE id = ?`,
      [status, req.user.id, rejectionReason || null, id]
    );

    if (status === 'approved') {
      // Generate affiliate code
      const affiliateCode = generateAffiliateCode();
      const affiliateId = uuidv4();
      const userId = uuidv4();

      // Create affiliate record
      await runQuery(
        `INSERT INTO affiliates (
          id, application_id, full_name, email, phone, social_media_handles, 
          audience_size, audience_description, affiliate_code, commission_rate
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          affiliateId, id, application.full_name, application.email, application.phone,
          application.social_media_handles, application.audience_size, 
          application.audience_description, affiliateCode, 0.10
        ]
      );

      // Generate and persist affiliate credentials
      let credentials = null;
      try {
        const generated = await generateAffiliateCredentials(affiliateId, application.email);

        // Send approval email with real credentials
        await sendAffiliateApproval({
          fullName: application.full_name,
          email: application.email,
          phone: application.phone,
          website: application.website,
          audienceSize: application.audience_size,
          audienceDescription: application.audience_description,
          motivation: application.motivation,
          socialMediaHandles: application.social_media_handles,
          affiliateCode,
          commissionRate: 0.10,
          password: generated.password
        });

        credentials = { email: generated.email, password: generated.password, userId: generated.userId };
      } catch (emailError) {
        console.error('Approval email or credential generation failed:', emailError);
        // Don't fail the request if email fails
      }

      res.json({
        message: 'Application approved successfully',
        affiliateCode,
        userId,
        credentials: credentials || { password: 'Generated but not sent' }
      });

    } else {
      // Send rejection email
      try {
        await sendAffiliateRejection(application, rejectionReason);
      } catch (emailError) {
        console.error('Rejection email failed:', emailError);
        // Don't fail the request if email fails
      }

      res.json({
        message: 'Application rejected successfully'
      });
    }

  } catch (error) {
    console.error('Review application error:', error);
    res.status(500).json({ error: 'Failed to review application' });
  }
});

// Get all affiliates
router.get('/affiliates', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Get affiliates with pagination
    const affiliates = await allQuery(
      `SELECT a.*
       FROM affiliates a 
       ORDER BY a.created_at DESC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    // Get total count
    const totalCount = await getQuery('SELECT COUNT(*) as count FROM affiliates');

    res.json({
      affiliates,
      total: totalCount.count,
      page: parseInt(page),
      totalPages: Math.ceil(totalCount.count / limit)
    });

  } catch (error) {
    console.error('Get affiliates error:', error);
    res.status(500).json({ error: 'Failed to get affiliates' });
  }
});

// Update affiliate status
router.put('/affiliates/:id/status', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'suspended', 'inactive'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    await runQuery(
      'UPDATE affiliates SET status = ? WHERE id = ?',
      [status, id]
    );

    res.json({
      message: 'Affiliate status updated successfully'
    });

  } catch (error) {
    console.error('Update affiliate status error:', error);
    res.status(500).json({ error: 'Failed to update affiliate status' });
  }
});

// Get affiliate details with referrals
router.get('/affiliates/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Get affiliate details
    const affiliate = await getQuery(
      `SELECT a.*, ac.full_name, ac.email, ac.phone, ac.website, ac.audience_size, ac.audience_description
       FROM affiliates a 
       JOIN affiliate_applications ac ON a.application_id = ac.id 
       WHERE a.id = ?`,
      [id]
    );

    if (!affiliate) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    // Get recent referrals
    const referrals = await allQuery(
      `SELECT * FROM affiliate_referrals 
       WHERE affiliate_id = ? 
       ORDER BY created_at DESC 
       LIMIT 10`,
      [id]
    );

    res.json({
      affiliate,
      recentReferrals: referrals
    });

  } catch (error) {
    console.error('Get affiliate details error:', error);
    res.status(500).json({ error: 'Failed to get affiliate details' });
  }
});

// Get dashboard stats
router.get('/dashboard/stats', verifyToken, requireAdmin, async (req, res) => {
  try {
    // Total applications
    const totalApplications = await getQuery('SELECT COUNT(*) as count FROM affiliate_applications');
    
    // Pending applications
    const pendingApplications = await getQuery(
      'SELECT COUNT(*) as count FROM affiliate_applications WHERE status = "pending"'
    );
    
    // Total affiliates
    const totalAffiliates = await getQuery('SELECT COUNT(*) as count FROM affiliates');
    
    // Active affiliates
    const activeAffiliates = await getQuery(
      'SELECT COUNT(*) as count FROM affiliates WHERE status = "active"'
    );
    
    // Total referrals
    const totalReferrals = await getQuery('SELECT COUNT(*) as count FROM affiliate_referrals');
    
    // Total commissions paid
    const totalCommissions = await getQuery(
      'SELECT SUM(commission_amount) as total FROM affiliate_referrals WHERE status = "completed"'
    );

    res.json({
      totalApplications: totalApplications.count,
      pendingApplications: pendingApplications.count,
      totalAffiliates: totalAffiliates.count,
      activeAffiliates: activeAffiliates.count,
      totalReferrals: totalReferrals.count,
      totalCommissions: totalCommissions.total || 0
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to get dashboard stats' });
  }
});

// Helper function to generate affiliate code
function generateAffiliateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default router;
