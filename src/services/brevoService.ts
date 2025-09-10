import axios from 'axios';

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

if (!BREVO_API_KEY) {
  console.error('BREVO_API_KEY is not defined in environment variables');
}

interface EmailData {
  to: string;
  subject: string;
  htmlContent: string;
}

export const brevoService = {
  async sendEmail({ to, subject, htmlContent }: EmailData) {
    if (!BREVO_API_KEY) {
      throw new Error('Brevo API key is not configured. Please check your environment variables.');
    }

    try {
      console.log('Sending email to:', to);
      console.log('Using API key:', BREVO_API_KEY.substring(0, 5) + '...');
      
      const response = await axios.post(
        BREVO_API_URL,
        {
          sender: {
            name: 'NBTA Academy',
            email: 'noreply@nbtaacademy.com',
          },
          to: [{ email: to }],
          subject,
          htmlContent,
        },
        {
          headers: {
            'api-key': BREVO_API_KEY,
            'content-type': 'application/json',
            accept: 'application/json',
          },
        }
      );
      
      console.log('Email sent successfully:', response.status);
      return response.data;
    } catch (error: any) {
      console.error('Error sending email:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      
      if (error.response?.status === 401) {
        throw new Error('Invalid Brevo API key. Please check your environment variables.');
      } else if (error.response?.status === 400) {
        throw new Error('Invalid email data: ' + JSON.stringify(error.response?.data));
      } else {
        throw new Error('Failed to send email: ' + (error.response?.data?.message || error.message));
      }
    }
  },

  generateRegistrationEmail(courseTitle: string, studentName: string) {
    return {
      subject: `Registration Confirmation - ${courseTitle}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Registration Confirmation</h2>
          <p>Dear ${studentName},</p>
          <p>Thank you for registering for <strong>${courseTitle}</strong> at NBTA Academy.</p>
          <p>We have received your registration and will review it shortly. Our team will contact you with further details about the course.</p>
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <br>
          <p>Best regards,</p>
          <p>NBTA Academy Team</p>
        </div>
      `,
    };
  },

  generateAdminNotificationEmail(courseTitle: string, studentData: any) {
    return {
      subject: `New Course Registration - ${courseTitle}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Course Registration</h2>
          <p>A new student has registered for <strong>${courseTitle}</strong>.</p>
          <h3>Student Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${studentData.first_name} ${studentData.last_name}</li>
            <li><strong>Email:</strong> ${studentData.email}</li>
            <li><strong>Phone:</strong> ${studentData.phone_number}</li>
            <li><strong>Education Level:</strong> ${studentData.education_level}</li>
            <li><strong>Previous Experience:</strong> ${studentData.previous_experience || 'None provided'}</li>
          </ul>
          <p><strong>Reason for Registration:</strong></p>
          <p>${studentData.reason_for_registration}</p>
        </div>
      `,
    };
  },

  generateAffiliateApplicationEmail(applicationData: any) {
    return {
      subject: `Affiliate Application Received - ${applicationData.fullName}`,
      htmlContent: `
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
      `,
    };
  },

  generateAffiliateApprovalEmail(affiliateData: any) {
    return {
      subject: `Congratulations! Your Affiliate Application is Approved`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome to NBTA Affiliate Program!</h2>
          <p>Dear ${affiliateData.fullName},</p>
          <p>Great news! Your affiliate application has been approved. Welcome to the NBTA affiliate family!</p>
          
          <h3>Your Affiliate Details:</h3>
          <ul>
            <li><strong>Affiliate Code:</strong> <code style="background: #f3f4f6; padding: 4px 8px; border-radius: 4px;">${affiliateData.affiliateCode}</code></li>
            <li><strong>Commission Rate:</strong> ${(affiliateData.commissionRate * 100).toFixed(1)}%</li>
            <li><strong>Dashboard Access:</strong> <a href="${window.location.origin}/affiliate/dashboard" style="color: #2563eb;">Click here to access your dashboard</a></li>
          </ul>
          
          <h3>Next Steps:</h3>
          <ol>
            <li>Log into your affiliate dashboard</li>
            <li>Update your payment information</li>
            <li>Start sharing your affiliate link</li>
            <li>Track your earnings and referrals</li>
          </ol>
          
          <p><strong>Your Affiliate Link:</strong></p>
          <p><code style="background: #f3f4f6; padding: 8px; border-radius: 4px; display: block;">${window.location.origin}/register?ref=${affiliateData.affiliateCode}</code></p>
          
          <p>If you have any questions, please don't hesitate to contact us at affiliates@nbta.com.ng</p>
          
          <p>Best regards,<br>NBTA Academy Team</p>
        </div>
      `,
    };
  },

  generateAffiliateRejectionEmail(applicationData: any, rejectionReason: string) {
    return {
      subject: `Affiliate Application Update`,
      htmlContent: `
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
      `,
    };
  },

  generateNewReferralEmail(affiliateData: any, referralData: any) {
    return {
      subject: `New Referral - Congratulations!`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Referral Alert!</h2>
          <p>Dear ${affiliateData.userId},</p>
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
          
          <p><a href="${window.location.origin}/affiliate/dashboard" style="color: #2563eb;">View your dashboard</a> to track all your referrals and earnings.</p>
          
          <p>Best regards,<br>NBTA Academy Team</p>
        </div>
      `,
    };
  },
}; 