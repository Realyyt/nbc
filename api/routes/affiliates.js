import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

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

// Middleware to verify affiliate token
const verifyAffiliateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if affiliate exists and is approved
    const affiliateResult = await runQuery(
      'SELECT id, email, full_name, status FROM affiliates WHERE id = $1 AND status = $2',
      [decoded.affiliateId, 'approved']
    );

    if (affiliateResult.rows.length === 0) {
      return res.status(403).json({ error: 'Affiliate access required' });
    }

    req.affiliate = affiliateResult.rows[0];
    next();
  } catch (error) {
    console.error('Affiliate token verification error:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Affiliate login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find affiliate credentials
    const credResult = await runQuery(`
      SELECT ac.affiliate_id, ac.password, a.full_name, a.email, a.status, a.affiliate_code
      FROM affiliate_credentials ac
      JOIN affiliates a ON ac.affiliate_id = a.id
      WHERE ac.email = $1 AND a.status = $2
    `, [email, 'approved']);

    if (credResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const affiliate = credResult.rows[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, affiliate.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { affiliateId: affiliate.affiliate_id, email: affiliate.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Affiliate login successful',
      affiliate: {
        id: affiliate.affiliate_id,
        email: affiliate.email,
        fullName: affiliate.full_name,
        affiliateCode: affiliate.affiliate_code,
        status: affiliate.status
      },
      token
    });

  } catch (error) {
    console.error('Affiliate login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Submit affiliate application
router.post('/apply', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      socialMediaHandles,
      audienceSize,
      audienceDescription,
      motivation
    } = req.body;

    if (!fullName || !email || !phone || !socialMediaHandles || !audienceSize || !audienceDescription || !motivation) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if application already exists
    const existingApp = await runQuery(
      'SELECT id FROM affiliate_applications WHERE email = $1',
      [email]
    );

    if (existingApp.rows.length > 0) {
      return res.status(400).json({ error: 'Application already submitted for this email' });
    }

    // Create application
    const result = await runQuery(`
      INSERT INTO affiliate_applications (
        id, full_name, email, phone, social_media_handles,
        audience_size, audience_description, motivation,
        status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
      RETURNING id
    `, [
      uuidv4(), fullName, email, phone, socialMediaHandles,
      audienceSize, audienceDescription, motivation, 'pending'
    ]);

    // Send confirmation email
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransporter({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Affiliate Application Received',
        html: `
          <h2>Thank you for your affiliate application!</h2>
          <p>We have received your application to join our affiliate program.</p>
          <p>Our team will review your application and get back to you within 2-3 business days.</p>
          <p>If you have any questions, please don't hesitate to contact us.</p>
        `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the application process if email fails
    }

    res.status(201).json({
      message: 'Application submitted successfully',
      applicationId: result.rows[0].id
    });

  } catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Get affiliate dashboard data
router.get('/dashboard', verifyAffiliateToken, async (req, res) => {
  try {
    const affiliateId = req.affiliate.id;

    // Get affiliate details
    const affiliateResult = await runQuery(`
      SELECT 
        full_name, email, phone, social_media_handles,
        audience_size, audience_description, motivation,
        affiliate_code, commission_rate, status, created_at
      FROM affiliates 
      WHERE id = $1
    `, [affiliateId]);

    if (affiliateResult.rows.length === 0) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    const affiliate = affiliateResult.rows[0];

    // Get referral stats
    const statsResult = await runQuery(`
      SELECT 
        COUNT(*) as total_referrals,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_referrals,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_referrals
      FROM affiliate_referrals 
      WHERE affiliate_id = $1
    `, [affiliateId]);

    // Get recent referrals
    const referralsResult = await runQuery(`
      SELECT 
        ar.id, ar.status, ar.created_at,
        u.name as referred_user_name, u.email as referred_user_email
      FROM affiliate_referrals ar
      JOIN users u ON ar.referred_user_id = u.id
      WHERE ar.affiliate_id = $1
      ORDER BY ar.created_at DESC
      LIMIT 10
    `, [affiliateId]);

    // Get payment info
    const paymentResult = await runQuery(`
      SELECT bank_name, account_number, account_name
      FROM affiliate_payments 
      WHERE affiliate_id = $1
      ORDER BY created_at DESC
      LIMIT 1
    `, [affiliateId]);

    res.json({
      affiliate: {
        fullName: affiliate.full_name,
        email: affiliate.email,
        phone: affiliate.phone,
        socialMediaHandles: affiliate.social_media_handles,
        audienceSize: affiliate.audience_size,
        audienceDescription: affiliate.audience_description,
        motivation: affiliate.motivation,
        affiliateCode: affiliate.affiliate_code,
        commissionRate: affiliate.commission_rate,
        status: affiliate.status,
        createdAt: affiliate.created_at
      },
      stats: {
        totalReferrals: parseInt(statsResult.rows[0].total_referrals) || 0,
        completedReferrals: parseInt(statsResult.rows[0].completed_referrals) || 0,
        pendingReferrals: parseInt(statsResult.rows[0].pending_referrals) || 0
      },
      recentReferrals: referralsResult.rows.map(row => ({
        id: row.id,
        status: row.status,
        createdAt: row.created_at,
        referredUserName: row.referred_user_name,
        referredUserEmail: row.referred_user_email
      })),
      paymentInfo: paymentResult.rows.length > 0 ? {
        bankName: paymentResult.rows[0].bank_name,
        accountNumber: paymentResult.rows[0].account_number,
        accountName: paymentResult.rows[0].account_name
      } : null
    });

  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Update payment settings
router.put('/payment-settings', verifyAffiliateToken, async (req, res) => {
  try {
    const affiliateId = req.affiliate.id;
    const { bankName, accountNumber, accountName } = req.body;

    if (!bankName || !accountNumber || !accountName) {
      return res.status(400).json({ error: 'All payment fields are required' });
    }

    // Check if payment info already exists
    const existingPayment = await runQuery(
      'SELECT id FROM affiliate_payments WHERE affiliate_id = $1',
      [affiliateId]
    );

    if (existingPayment.rows.length > 0) {
      // Update existing payment info
      await runQuery(`
        UPDATE affiliate_payments 
        SET bank_name = $1, account_number = $2, account_name = $3, updated_at = NOW()
        WHERE affiliate_id = $4
      `, [bankName, accountNumber, accountName, affiliateId]);
    } else {
      // Create new payment info
      await runQuery(`
        INSERT INTO affiliate_payments (affiliate_id, bank_name, account_number, account_name, created_at)
        VALUES ($1, $2, $3, $4, NOW())
      `, [affiliateId, bankName, accountNumber, accountName]);
    }

    res.json({ message: 'Payment settings updated successfully' });

  } catch (error) {
    console.error('Update payment settings error:', error);
    res.status(500).json({ error: 'Failed to update payment settings' });
  }
});

export default router;

