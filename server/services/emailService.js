import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { runQuery, getQuery } from '../database/init.js';

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate affiliate code
function generateAffiliateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Generate affiliate login credentials
async function generateAffiliateCredentials(email, fullName) {
  const userId = uuidv4();
  const password = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
  const passwordHash = await bcrypt.hash(password, 10);
  
  // Store affiliate credentials
  await runQuery(
    'INSERT INTO affiliate_credentials (id, email, password_hash, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
    [userId, email, passwordHash]
  );

  return { userId, password };
}

// Send affiliate application confirmation
export async function sendApplicationConfirmation(applicationData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: applicationData.email,
    subject: `Affiliate Application Received - ${applicationData.fullName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Affiliate Application Received</h2>
        <p>Dear ${applicationData.fullName},</p>
        <p>Thank you for your interest in becoming an NBTA affiliate! We have received your application and will review it carefully.</p>
        
        <h3>Application Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${applicationData.fullName}</li>
          <li><strong>Email:</strong> ${applicationData.email}</li>
          <li><strong>Phone:</strong> ${applicationData.phone}</li>
          <li><strong>Audience Size:</strong> ${applicationData.audienceSize.toLocaleString()} followers</li>
          <li><strong>Website:</strong> ${applicationData.website || 'Not provided'}</li>
        </ul>
        
        <p><strong>Audience Description:</strong></p>
        <p>${applicationData.audienceDescription}</p>
        
        <p><strong>Motivation:</strong></p>
        <p>${applicationData.motivation}</p>
        
        <p>We will review your application within 3-5 business days and get back to you with our decision.</p>
        
        <p>Best regards,<br>NBTA Academy Team</p>
      </div>
    `
  };

  try {
    // Temporarily disable email sending to focus on main functionality
    console.log(`📧 Email sending disabled - would send to ${applicationData.email}`);
    console.log('📧 Email content:', mailOptions.html);
    return true;
    
    // Uncomment below when email is configured
    /*
    await transporter.sendMail(mailOptions);
    console.log(`✅ Application confirmation sent to ${applicationData.email}`);
    */
  } catch (error) {
    console.error('❌ Error sending application confirmation:', error);
    throw error;
  }
}

// Send affiliate approval with login credentials
export async function sendAffiliateApproval(applicationData, affiliateData) {
  const { userId, password } = await generateAffiliateCredentials(applicationData.email, applicationData.fullName);
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: applicationData.email,
    subject: `Congratulations! Your Affiliate Application is Approved`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to NBTA Affiliate Program!</h2>
        <p>Dear ${applicationData.fullName},</p>
        <p>Great news! Your affiliate application has been approved. Welcome to the NBTA affiliate family!</p>
        
        <h3>Your Affiliate Details:</h3>
        <ul>
          <li><strong>Affiliate Code:</strong> <code style="background: #f3f4f6; padding: 4px 8px; border-radius: 4px;">${affiliateData.affiliateCode}</code></li>
          <li><strong>Commission Rate:</strong> ${affiliateData.commissionRate}%</li>
          <li><strong>Dashboard Access:</strong> <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/affiliate/dashboard" style="color: #2563eb;">Click here to access your dashboard</a></li>
        </ul>
        
        <h3>Your Login Credentials:</h3>
        <div style="background: #f9fafb; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p><strong>Email:</strong> ${applicationData.email}</p>
          <p><strong>Password:</strong> ${password}</p>
        </div>
        
        <h3>Next Steps:</h3>
        <ol>
          <li>Log into your affiliate dashboard using the credentials above</li>
          <li>Update your payment information</li>
          <li>Start sharing your affiliate link</li>
          <li>Track your earnings and referrals</li>
        </ol>
        
        <p><strong>Your Affiliate Link:</strong></p>
        <p><code style="background: #f3f4f6; padding: 8px; border-radius: 4px; display: block;">${process.env.FRONTEND_URL || 'http://localhost:3000'}/register?ref=${affiliateData.affiliateCode}</code></p>
        
        <p><strong>Important:</strong> Please change your password after your first login for security.</p>
        
        <p>If you have any questions, please don't hesitate to contact us at affiliates@nbta.com.ng</p>
        
        <p>Best regards,<br>NBTA Academy Team</p>
      </div>
    `
  };

  try {
    // Temporarily disable email sending to focus on main functionality
    console.log(`📧 Email sending disabled - would send approval to ${applicationData.email}`);
    console.log('📧 Email content:', mailOptions.html);
    
    // Always return credentials for admin dashboard display
    return { userId, password };
    
    // Uncomment below when email is configured
    /*
    await transporter.sendMail(mailOptions);
    console.log(`✅ Approval email sent to ${applicationData.email}`);
    return { userId, password };
    */
  } catch (error) {
    console.error('❌ Error sending approval email:', error);
    throw error;
  }
}

// Send affiliate rejection
export async function sendAffiliateRejection(applicationData, rejectionReason) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: applicationData.email,
    subject: `Affiliate Application Update`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Affiliate Application Update</h2>
        <p>Dear ${applicationData.fullName},</p>
        <p>Thank you for your interest in becoming an NBTA affiliate. After careful review of your application, we regret to inform you that we are unable to approve your application at this time.</p>
        
        <h3>Reason for Rejection:</h3>
        <p>${rejectionReason}</p>
        
        <p>We encourage you to address the concerns mentioned above and consider reapplying in the future. We value your interest in our program and hope to work with you in the future.</p>
        
        <p>If you have any questions about this decision, please contact us at affiliates@nbta.com.ng</p>
        
        <p>Best regards,<br>NBTA Academy Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Rejection email sent to ${applicationData.email}`);
  } catch (error) {
    console.error('❌ Error sending rejection email:', error);
    throw error;
  }
}

// Send new referral notification
export async function sendNewReferralNotification(affiliateData, referralData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: affiliateData.email,
    subject: `New Referral - Congratulations!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Referral Alert!</h2>
        <p>Dear ${affiliateData.fullName},</p>
        <p>Congratulations! You have a new referral through your affiliate link.</p>
        
        <h3>Referral Details:</h3>
        <ul>
          <li><strong>Student Name:</strong> ${referralData.referredUserName}</li>
          <li><strong>Student Email:</strong> ${referralData.referredUserEmail}</li>
          <li><strong>Course:</strong> ${referralData.courseTitle}</li>
          <li><strong>Course Price:</strong> ₦${referralData.coursePrice.toLocaleString()}</li>
          <li><strong>Your Commission:</strong> ₦${referralData.commissionAmount.toLocaleString()}</li>
        </ul>
        
        <p>Keep up the great work! Continue sharing your affiliate link to earn more commissions.</p>
        
        <p><a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/affiliate/dashboard" style="color: #2563eb;">View your dashboard</a> to track all your referrals and earnings.</p>
        
        <p>Best regards,<br>NBTA Academy Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ New referral notification sent to ${affiliateData.email}`);
  } catch (error) {
    console.error('❌ Error sending referral notification:', error);
    throw error;
  }
}

// Verify affiliate credentials
export async function verifyAffiliateCredentials(email, password) {
  try {
    const credential = await getQuery(
      'SELECT * FROM affiliate_credentials WHERE email = ?',
      [email]
    );

    if (!credential) {
      return null;
    }

    const isValid = await bcrypt.compare(password, credential.password_hash);
    return isValid ? credential : null;
  } catch (error) {
    console.error('Error verifying affiliate credentials:', error);
    return null;
  }
}
