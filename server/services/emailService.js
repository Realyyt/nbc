import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import { runQuery, getQuery } from '../database/init.js';

// Generate unique ID
function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Email configuration (supports both "service" and raw SMTP)
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
const smtpSecure = typeof process.env.SMTP_SECURE === 'string'
  ? process.env.SMTP_SECURE.toLowerCase() === 'true'
  : undefined;

const emailService = process.env.EMAIL_SERVICE; // e.g., 'gmail'
const emailUser = process.env.SMTP_USER || process.env.EMAIL_USER;
const emailPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

export const emailConfig = smtpHost
  ? {
      host: smtpHost,
      port: smtpPort ?? 587,
      secure: smtpSecure ?? (smtpPort === 465),
      auth: emailUser && emailPass ? { user: emailUser, pass: emailPass } : undefined,
      from: process.env.EMAIL_FROM || 'NBTA Affiliate System <noreply@nbta.com.ng>'
    }
  : {
      service: emailService || 'gmail',
      auth: emailUser && emailPass ? { user: emailUser, pass: emailPass } : undefined,
      from: process.env.EMAIL_FROM || 'NBTA Affiliate System <noreply@nbta.com.ng>'
    };

// Create transporter
let transporter;
try {
  transporter = nodemailer.createTransport(emailConfig);
} catch (error) {
  console.warn('Email service not configured:', error.message);
}

// Optional Resend provider (preferred when RESEND_API_KEY is set)
const resendApiKey = process.env.RESEND_API_KEY;
const resendClient = resendApiKey ? new Resend(resendApiKey) : null;

// Email templates
const emailTemplates = {
  applicationConfirmation: (data) => ({
    subject: 'Affiliate Application Received - NBTA',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">🎉 Application Received!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Thank you for applying to become an NBTA affiliate</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${data.fullName},</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            We've received your affiliate application and are excited about the possibility of working together!
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Application Details:</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li><strong>Name:</strong> ${data.fullName}</li>
              <li><strong>Email:</strong> ${data.email}</li>
              <li><strong>Phone:</strong> ${data.phone || 'Not provided'}</li>
              <li><strong>Audience Size:</strong> ${data.audienceSize || 'Not specified'}</li>
            </ul>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Our team will review your application within 2-3 business days. You'll receive an email notification once the review is complete.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              Visit NBTA Platform
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If you have any questions, feel free to reach out to our support team.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin: 0;">
            Best regards,<br>
            <strong>The NBTA Team</strong>
          </p>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">© 2024 NBTA. All rights reserved.</p>
        </div>
      </div>
    `
  }),

  applicationApproved: (data) => ({
    subject: '🎉 Affiliate Application Approved - Welcome to NBTA!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">🎉 Congratulations!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Your affiliate application has been approved!</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${data.fullName},</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Great news! We're excited to welcome you to the NBTA affiliate program. Your application has been reviewed and approved.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Affiliate Details:</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li><strong>Affiliate Code:</strong> <code style="background: #f8f9fa; padding: 5px 10px; border-radius: 4px; font-family: monospace;">${data.affiliateCode}</code></li>
              <li><strong>Commission Rate:</strong> ${(data.commissionRate * 100).toFixed(1)}%</li>
              <li><strong>Login Email:</strong> ${data.email}</li>
              <li><strong>Login Password:</strong> <code style="background: #f8f9fa; padding: 5px 10px; border-radius: 4px; font-family: monospace;">${data.password}</code></li>
            </ul>
          </div>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #155724; margin-top: 0;">🚀 Next Steps:</h3>
            <ol style="color: #155724; line-height: 1.8;">
              <li>Login to your affiliate dashboard using the credentials above</li>
              <li>Update your payment information (bank details)</li>
              <li>Start sharing your affiliate link: <code style="background: white; padding: 3px 8px; border-radius: 4px; font-family: monospace;">${process.env.FRONTEND_URL || 'http://localhost:5173'}/register?ref=${data.affiliateCode}</code></li>
              <li>Track your referrals and earnings in real-time</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/affiliate/login" 
               style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              Access Your Dashboard
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            <strong>Important:</strong> Please change your password after your first login for security purposes.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin: 0;">
            Welcome to the team!<br>
            <strong>The NBTA Team</strong>
          </p>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">© 2024 NBTA. All rights reserved.</p>
        </div>
      </div>
    `
  }),

  applicationRejected: (data) => ({
    subject: 'Affiliate Application Update - NBTA',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Application Update</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Your affiliate application has been reviewed</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${data.fullName},</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for your interest in becoming an NBTA affiliate. After careful review of your application, we regret to inform you that we are unable to approve your application at this time.
          </p>
          
          ${data.rejectionReason ? `
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
            <h3 style="color: #856404; margin-top: 0;">Feedback:</h3>
            <p style="color: #856404; line-height: 1.6; margin: 0;">${data.rejectionReason}</p>
          </div>
          ` : ''}
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            We encourage you to address the feedback provided and consider reapplying in the future. We're always looking for passionate individuals to join our affiliate program.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/affiliate-application" 
               style="background: linear-gradient(135deg, #6c757d 0%, #495057 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              Apply Again
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin: 0;">
            Thank you for your understanding.<br>
            <strong>The NBTA Team</strong>
          </p>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">© 2024 NBTA. All rights reserved.</p>
        </div>
      </div>
    `
  }),

  newReferral: (data) => ({
    subject: '🎯 New Referral Alert - NBTA Affiliate',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #17a2b8 0%, #138496 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">🎯 New Referral!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Someone signed up using your affiliate link</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${data.affiliateName},</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Great news! You have a new referral through your affiliate link.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #17a2b8; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Referral Details:</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li><strong>New User:</strong> ${data.referredUserName}</li>
              <li><strong>Email:</strong> ${data.referredUserEmail}</li>
              <li><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
              <li><strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">Active</span></li>
            </ul>
          </div>
          
          <div style="background: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #004085; margin-top: 0;">💰 Earnings Update:</h3>
            <p style="color: #004085; line-height: 1.6; margin: 0;">
              Your referral is now active! You'll earn commission on any courses they purchase. 
              Track your earnings in real-time through your affiliate dashboard.
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/affiliate/dashboard" 
               style="background: linear-gradient(135deg, #17a2b8 0%, #138496 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              View Dashboard
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin: 0;">
            Keep up the great work!<br>
            <strong>The NBTA Team</strong>
          </p>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">© 2024 NBTA. All rights reserved.</p>
        </div>
      </div>
    `
  })
};

// Contact/Partnership inquiry template
const contactTemplate = (data) => ({
  subject: `[NBTA Contact] ${data.subject || 'New Message'}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0f172a; color: white; padding: 20px; text-align: center;">
        <h2 style="margin: 0;">New Contact Message</h2>
      </div>
      <div style="padding: 20px; background: #f8fafc;">
        <p style="margin: 0 0 12px 0; color: #334155;"><strong>Name:</strong> ${data.name}</p>
        <p style="margin: 0 0 12px 0; color: #334155;"><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p style="margin: 0 0 12px 0; color: #334155;"><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <p style="margin: 0 0 12px 0; color: #334155;"><strong>Subject:</strong> ${data.subject}</p>
        <div style="background: white; border-left: 4px solid #2563eb; padding: 16px; border-radius: 6px; color: #0f172a;">
          <p style="white-space: pre-wrap; margin: 0;">${(data.message || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
      </div>
      <div style="background: #e2e8f0; color: #0f172a; padding: 12px; text-align: center; font-size: 12px;">
        <p style="margin: 0;">This message was sent from the NBTA website contact form.</p>
      </div>
    </div>
  `
});

export async function sendContactMessage(data) {
  // Always deliver contact messages to the specified support inbox
  const recipient = 'wecanhelp@nbta.institute';

  // If a dedicated contact API key is provided, use it exclusively for contact emails
  const contactApiKey = process.env.RESEND_CONTACT_API_KEY;
  if (contactApiKey) {
    try {
      const contactResend = new Resend(contactApiKey);
      const emailData = contactTemplate(data);
      const { data: result, error } = await contactResend.emails.send({
        from: emailConfig.from,
        to: [recipient],
        subject: emailData.subject,
        html: emailData.html
      });
      if (error) throw new Error(error.message || 'Resend send failed');
      return { success: true, messageId: result?.id };
    } catch (error) {
      console.error('Contact Resend send failed, falling back:', error.message);
      // fall through to the standard retry flow below
    }
  }

  // Fallback to the standard mechanism (global Resend if set, else SMTP)
  return sendEmailWithRetry(recipient, contactTemplate, data);
}

// Generate affiliate credentials
export async function generateAffiliateCredentials(affiliateId, email) {
  try {
    const userId = generateId();
    const password = generatePassword();
    const passwordHash = await bcrypt.hash(password, 12);

    // Store credentials in database
    await runQuery(`
      INSERT INTO affiliate_credentials (id, affiliate_id, user_id, password_hash)
      VALUES (?, ?, ?, ?)
    `, [generateId(), affiliateId, userId, passwordHash]);

    return {
      email,
      password,
      userId
    };
  } catch (error) {
    console.error('Error generating affiliate credentials:', error);
    throw error;
  }
}

// Generate secure password
function generatePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Send email with retry logic
async function sendEmailWithRetry(to, template, data, maxRetries = 3) {
  const emailData = template(data);

  // Prefer Resend if configured
  if (resendClient) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const { data: result, error } = await resendClient.emails.send({
          from: emailConfig.from,
          to: [to],
          subject: emailData.subject,
          html: emailData.html
        });
        if (error) throw new Error(error.message || 'Resend send failed');
        console.log(`✅ Email sent via Resend to ${to} (attempt ${attempt})`);
        return { success: true, messageId: result?.id };
      } catch (error) {
        console.error(`❌ Resend attempt ${attempt} failed:`, error.message);
        if (attempt === maxRetries) {
          return { success: false, error: error.message };
        }
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  // Fallback to SMTP transporter
  if (!transporter) {
    console.warn('Email service not configured, skipping email send');
    return { success: false, reason: 'Email service not configured' };
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await transporter.sendMail({
        from: emailConfig.from,
        to,
        subject: emailData.subject,
        html: emailData.html
      });
      console.log(`✅ Email sent successfully to ${to} (attempt ${attempt})`);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error(`❌ Email send attempt ${attempt} failed:`, error.message);
      if (attempt === maxRetries) {
        console.error(`❌ All email attempts failed for ${to}`);
        return { success: false, error: error.message };
      }
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
}

// Email service functions
export async function sendApplicationConfirmation(applicationData) {
  return sendEmailWithRetry(
    applicationData.email,
    emailTemplates.applicationConfirmation,
    applicationData
  );
}

export async function sendApplicationApproved(affiliateData) {
  return sendEmailWithRetry(
    affiliateData.email,
    emailTemplates.applicationApproved,
    affiliateData
  );
}

export async function sendApplicationRejected(applicationData) {
  return sendEmailWithRetry(
    applicationData.email,
    emailTemplates.applicationRejected,
    applicationData
  );
}

export async function sendNewReferralNotification(affiliateData) {
  return sendEmailWithRetry(
    affiliateData.email,
    emailTemplates.newReferral,
    affiliateData
  );
}

// Verify email service configuration
export async function verifyEmailService() {
  if (!transporter) {
    return { configured: false, message: 'Email service not configured' };
  }

  try {
    await transporter.verify();
    return { configured: true, message: 'Email service verified successfully' };
  } catch (error) {
    return { configured: false, message: `Email service verification failed: ${error.message}` };
  }
}

// Verify affiliate credentials for login
export async function verifyAffiliateCredentials(email, password) {
  console.log('Verifying credentials for email:', email);
  
  const credential = await getQuery(
    `SELECT ac.user_id as id, ac.password_hash as password_hash
     FROM affiliates a
     JOIN affiliate_applications app ON a.application_id = app.id
     JOIN affiliate_credentials ac ON ac.affiliate_id = a.id
     WHERE app.email = ? AND a.status = 'active'`,
    [email]
  );
  
  console.log('Found credential:', credential ? 'yes' : 'no');
  
  if (!credential) {
    console.log('No credential found for email:', email);
    return null;
  }
  
  const isValid = await bcrypt.compare(password, credential.password_hash);
  console.log('Password valid:', isValid);
  
  if (!isValid) return null;
  return { id: credential.id };
}

// Simple UUID-like generator sufficient for IDs here
function cryptoRandomId() {
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return template.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Backward-compatible export names used by route files
export { sendApplicationApproved as sendAffiliateApproval };
export { sendApplicationRejected as sendAffiliateRejection };
