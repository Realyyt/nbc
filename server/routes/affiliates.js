import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { runQuery, getQuery, allQuery } from '../database/init.js';
import { sendApplicationConfirmation, sendAffiliateApproval, sendAffiliateRejection, sendNewReferralNotification } from '../services/emailService.js';
import { verifyToken, requireAffiliate } from './auth.js';

const router = express.Router();

// Public: List published affiliate programs
router.get('/programs', async (req, res) => {
  try {
    const programs = await allQuery(
      `SELECT id, title, description, platform, image_url as imageUrl, affiliate_link as affiliateLink, price, rating, instructor, mode, price_type as priceType
       FROM affiliate_programs
       WHERE is_published = 1
       ORDER BY created_at DESC`
    );
    res.json({ programs });
  } catch (error) {
    console.error('Public programs list error:', error);
    res.status(500).json({ error: 'Failed to fetch programs' });
  }
});

// Submit affiliate application
router.post('/applications', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      website,
      audienceSize,
      audienceDescription,
      motivation,
      socialMediaHandles
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !audienceSize || !audienceDescription || !motivation) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Check if application already exists
    const existingApplication = await getQuery(
      'SELECT * FROM affiliate_applications WHERE email = ?',
      [email]
    );

    if (existingApplication) {
      return res.status(400).json({ error: 'Application already exists for this email' });
    }

    const applicationId = uuidv4();
    const socialMediaHandlesJson = JSON.stringify(socialMediaHandles || {});

    // Insert application
    await runQuery(
      `INSERT INTO affiliate_applications (
        id, full_name, email, phone, website, audience_size, 
        audience_description, motivation, social_media_handles
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        applicationId, fullName, email, phone, website, audienceSize,
        audienceDescription, motivation, socialMediaHandlesJson
      ]
    );

    // Send confirmation email
    try {
      await sendApplicationConfirmation({
        fullName,
        email,
        phone,
        website,
        audienceSize,
        audienceDescription,
        motivation
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      message: 'Application submitted successfully',
      applicationId
    });

  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Check application status
router.get('/applications/status/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const application = await getQuery(
      'SELECT * FROM affiliate_applications WHERE email = ?',
      [email]
    );

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);

  } catch (error) {
    console.error('Application status check error:', error);
    res.status(500).json({ error: 'Failed to check application status' });
  }
});

// Get affiliate profile (protected route)
router.get('/profile', verifyToken, requireAffiliate, async (req, res) => {
  try {
    console.log('Getting profile for user:', req.user);
    
    const affiliate = await getQuery(
      `SELECT a.*, ac.full_name, ac.email, ac.phone, ac.website, ac.audience_size, ac.audience_description, ac.social_media_handles
       FROM affiliates a 
       JOIN affiliate_applications ac ON a.application_id = ac.id 
       WHERE a.id = ?`,
      [req.user.id]
    );

    if (!affiliate) {
      console.log('No affiliate found for ID:', req.user.id);
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    console.log('Found affiliate:', affiliate);
    res.json(affiliate);

  } catch (error) {
    console.error('Get affiliate profile error:', error);
    res.status(500).json({ error: 'Failed to get affiliate profile' });
  }
});

// Update payment information
router.put('/payment-info', verifyToken, requireAffiliate, async (req, res) => {
  try {
    const { bankName, accountNumber, accountName } = req.body;

    if (!bankName || !accountNumber || !accountName) {
      return res.status(400).json({ error: 'All bank details are required' });
    }

    // Validate account number (10-11 digits)
    if (!/^\d{10,11}$/.test(accountNumber)) {
      return res.status(400).json({ error: 'Invalid account number format' });
    }

    await runQuery(
      'UPDATE affiliates SET bank_name = ?, account_number = ?, account_name = ? WHERE id = ?',
      [bankName, accountNumber, accountName, req.user.id]
    );

    const updatedAffiliate = await getQuery(
      `SELECT a.*, ac.full_name, ac.email, ac.phone
       FROM affiliates a 
       JOIN affiliate_applications ac ON a.application_id = ac.id 
       WHERE a.id = ?`,
      [req.user.id]
    );

    res.json(updatedAffiliate);

  } catch (error) {
    console.error('Update payment info error:', error);
    res.status(500).json({ error: 'Failed to update payment information' });
  }
});

// Get affiliate stats
router.get('/stats', verifyToken, requireAffiliate, async (req, res) => {
  try {
    const affiliateId = req.user.id;
    console.log('Getting stats for affiliate ID:', affiliateId);

    // For now, return basic stats without complex queries
    // This will work even if the affiliate_referrals table doesn't exist
    res.json({
      totalEarnings: 0,
      totalReferrals: 0,
      activeReferrals: 0,
      pendingCommissions: 0,
      paidCommissions: 0,
      monthlyEarnings: 0,
      monthlyReferrals: 0
    });

  } catch (error) {
    console.error('Get affiliate stats error:', error);
    res.status(500).json({ error: 'Failed to get affiliate stats' });
  }
});

// Get referrals
router.get('/referrals', verifyToken, requireAffiliate, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const affiliateId = req.user.id;

    // Get referrals with pagination
    const referrals = await allQuery(
      `SELECT * FROM affiliate_referrals 
       WHERE affiliate_id = ? 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [affiliateId, limit, offset]
    );

    // Get total count
    const totalCount = await getQuery(
      'SELECT COUNT(*) as count FROM affiliate_referrals WHERE affiliate_id = ?',
      [affiliateId]
    );

    res.json({
      referrals,
      total: totalCount.count,
      page: parseInt(page),
      totalPages: Math.ceil(totalCount.count / limit)
    });

  } catch (error) {
    console.error('Get referrals error:', error);
    res.status(500).json({ error: 'Failed to get referrals' });
  }
});

// Validate affiliate code
router.get('/validate-code/:code', async (req, res) => {
  try {
    const { code } = req.params;

    const affiliate = await getQuery(
      `SELECT a.*, ac.full_name, ac.email
       FROM affiliates a 
       JOIN affiliate_applications ac ON a.application_id = ac.id 
       WHERE a.affiliate_code = ? AND a.status = 'active'`,
      [code]
    );

    if (!affiliate) {
      return res.status(404).json({ valid: false });
    }

    res.json({ valid: true, affiliate });

  } catch (error) {
    console.error('Validate affiliate code error:', error);
    res.status(500).json({ error: 'Failed to validate affiliate code' });
  }
});

// Track referral (called when someone registers with affiliate code)
router.post('/track-referral', async (req, res) => {
  try {
    const {
      affiliateCode,
      userData,
      courseId,
      courseTitle,
      coursePrice
    } = req.body;

    // Get affiliate
    const affiliate = await getQuery(
      `SELECT a.*, ac.full_name, ac.email
       FROM affiliates a 
       JOIN affiliate_applications ac ON a.application_id = ac.id 
       WHERE a.affiliate_code = ? AND a.status = 'active'`,
      [affiliateCode]
    );

    if (!affiliate) {
      return res.status(404).json({ error: 'Invalid affiliate code' });
    }

    // Calculate commission (10%)
    const commissionAmount = coursePrice * 0.1;

    const referralId = uuidv4();

    // Create referral record
    await runQuery(
      `INSERT INTO affiliate_referrals (
        id, affiliate_id, referred_user_id, referred_user_email, 
        referred_user_name, course_id, course_title, course_price, 
        commission_amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        referralId, affiliate.id, userData.id, userData.email,
        userData.name, courseId, courseTitle, coursePrice, commissionAmount
      ]
    );

    // Update affiliate stats
    await runQuery(
      'UPDATE affiliates SET total_referrals = total_referrals + 1, total_earnings = total_earnings + ?, last_activity_at = CURRENT_TIMESTAMP WHERE id = ?',
      [commissionAmount, affiliate.id]
    );

    // Send notification email to affiliate
    try {
      await sendNewReferralNotification(affiliate, {
        referredUserName: userData.name,
        referredUserEmail: userData.email,
        courseTitle,
        coursePrice,
        commissionAmount
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
    }

    res.json({
      message: 'Referral tracked successfully',
      referralId,
      commissionAmount
    });

  } catch (error) {
    console.error('Track referral error:', error);
    res.status(500).json({ error: 'Failed to track referral' });
  }
});

export default router;
