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
}; 