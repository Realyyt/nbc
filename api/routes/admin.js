const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const router = express.Router();

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Helper function to run queries
const runQuery = async (query, params = []) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result;
  } finally {
    client.release();
  }
};

// Middleware to verify admin token
const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if admin exists
    const adminResult = await runQuery(
      'SELECT id, email, role FROM admin_users WHERE id = $1 AND role = $2',
      [decoded.adminId, 'admin']
    );

    if (adminResult.rows.length === 0) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    req.admin = adminResult.rows[0];
    next();
  } catch (error) {
    console.error('Admin token verification error:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find admin
    const adminResult = await runQuery(
      'SELECT id, email, password, role FROM admin_users WHERE email = $1 AND role = $2',
      [email, 'admin']
    );

    if (adminResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = adminResult.rows[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Admin login successful',
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role
      },
      token
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get all affiliate applications
router.get('/applications', verifyAdminToken, async (req, res) => {
  try {
    const result = await runQuery(`
      SELECT 
        id, full_name, email, phone, social_media_handles, 
        audience_size, audience_description, motivation, 
        status, created_at, updated_at
      FROM affiliate_applications 
      ORDER BY created_at DESC
    `);

    res.json({
      applications: result.rows.map(row => ({
        id: row.id,
        fullName: row.full_name,
        email: row.email,
        phone: row.phone,
        socialMediaHandles: row.social_media_handles,
        audienceSize: row.audience_size,
        audienceDescription: row.audience_description,
        motivation: row.motivation,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }))
    });

  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get all approved affiliates
router.get('/affiliates', verifyAdminToken, async (req, res) => {
  try {
    const result = await runQuery(`
      SELECT 
        a.id, a.full_name, a.email, a.phone, a.social_media_handles,
        a.audience_size, a.audience_description, a.motivation,
        a.affiliate_code, a.commission_rate, a.status, a.created_at,
        ac.email as login_email, ac.password as login_password
      FROM affiliates a
      LEFT JOIN affiliate_credentials ac ON a.id = ac.affiliate_id
      WHERE a.status = 'approved'
      ORDER BY a.created_at DESC
    `);

    res.json({
      affiliates: result.rows.map(row => ({
        id: row.id,
        fullName: row.full_name,
        email: row.email,
        phone: row.phone,
        socialMediaHandles: row.social_media_handles,
        audienceSize: row.audience_size,
        audienceDescription: row.audience_description,
        motivation: row.motivation,
        affiliateCode: row.affiliate_code,
        commissionRate: row.commission_rate,
        status: row.status,
        createdAt: row.created_at,
        loginEmail: row.login_email,
        loginPassword: row.login_password
      }))
    });

  } catch (error) {
    console.error('Get affiliates error:', error);
    res.status(500).json({ error: 'Failed to fetch affiliates' });
  }
});

// Review affiliate application
router.post('/applications/:id/review', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, commissionRate = 0.10 } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Update application status
    await runQuery(
      'UPDATE affiliate_applications SET status = $1, updated_at = NOW() WHERE id = $2',
      [status, id]
    );

    if (status === 'approved') {
      // Get application details
      const appResult = await runQuery(
        'SELECT * FROM affiliate_applications WHERE id = $1',
        [id]
      );

      if (appResult.rows.length === 0) {
        return res.status(404).json({ error: 'Application not found' });
      }

      const application = appResult.rows[0];
      const affiliateCode = uuidv4().substring(0, 8).toUpperCase();
      const affiliateId = uuidv4();

      // Create affiliate
      await runQuery(`
        INSERT INTO affiliates (
          id, full_name, email, phone, social_media_handles,
          audience_size, audience_description, motivation,
          affiliate_code, commission_rate, status, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
      `, [
        affiliateId, application.full_name, application.email, application.phone,
        application.social_media_handles, application.audience_size,
        application.audience_description, application.motivation,
        affiliateCode, commissionRate, 'approved'
      ]);

      // Generate affiliate credentials
      const password = Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15);
      const hashedPassword = await bcrypt.hash(password, 12);

      await runQuery(`
        INSERT INTO affiliate_credentials (affiliate_id, email, password)
        VALUES ($1, $2, $3)
      `, [affiliateId, application.email, hashedPassword]);

      // Send approval email with credentials
      try {
        const transporter = nodemailer.createTransporter({
          service: process.env.EMAIL_SERVICE || 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: application.email,
          subject: 'Your Affiliate Application Has Been Approved!',
          html: `
            <h2>Congratulations! Your affiliate application has been approved.</h2>
            <p>Welcome to our affiliate program! Here are your login credentials:</p>
            <p><strong>Email:</strong> ${application.email}</p>
            <p><strong>Password:</strong> ${password}</p>
            <p><strong>Affiliate Code:</strong> ${affiliateCode}</p>
            <p>You can now log in to your affiliate dashboard and start earning commissions!</p>
          `
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the approval process if email fails
      }

      res.json({
        message: 'Application approved successfully',
        affiliateCode,
        credentials: {
          email: application.email,
          password
        }
      });

    } else {
      // Send rejection email
      try {
        const appResult = await runQuery(
          'SELECT email FROM affiliate_applications WHERE id = $1',
          [id]
        );

        if (appResult.rows.length > 0) {
          const transporter = nodemailer.createTransporter({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: appResult.rows[0].email,
            subject: 'Affiliate Application Update',
            html: `
              <h2>Application Status Update</h2>
              <p>Thank you for your interest in our affiliate program. After careful review, we regret to inform you that your application has not been approved at this time.</p>
              <p>We encourage you to apply again in the future.</p>
            `
          });
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }

      res.json({ message: 'Application rejected successfully' });
    }

  } catch (error) {
    console.error('Review application error:', error);
    res.status(500).json({ error: 'Failed to review application' });
  }
});

module.exports = router;

