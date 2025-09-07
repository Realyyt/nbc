import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getQuery } from '../database/init.js';
import { verifyAffiliateCredentials } from '../services/emailService.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Admin login
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Get admin user
    const admin = await getQuery('SELECT * FROM admin_users WHERE email = ?', [email]);
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin.id, 
        email: admin.email, 
        role: 'admin' 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: admin.id,
        email: admin.email,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Affiliate login
router.post('/affiliate/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Verify affiliate credentials
    const credential = await verifyAffiliateCredentials(email, password);
    
    if (!credential) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Get affiliate data
    const affiliate = await getQuery(
      `SELECT a.*, app.email, app.full_name 
       FROM affiliates a 
       JOIN affiliate_applications app ON a.application_id = app.id 
       JOIN affiliate_credentials cred ON cred.affiliate_id = a.id
       WHERE cred.user_id = ?`,
      [credential.id]
    );

    if (!affiliate) {
      return res.status(401).json({ error: 'Affiliate not found' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: affiliate.id, 
        userId: affiliate.user_id,
        email: affiliate.email,
        role: 'affiliate' 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: affiliate.id,
        userId: affiliate.user_id,
        email: affiliate.email,
        fullName: affiliate.full_name,
        role: 'affiliate'
      }
    });

  } catch (error) {
    console.error('Affiliate login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify token middleware
export function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Admin only middleware
export function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// Affiliate only middleware
export function requireAffiliate(req, res, next) {
  if (req.user.role !== 'affiliate') {
    return res.status(403).json({ error: 'Affiliate access required' });
  }
  next();
}

export default router;
