import axios from '../lib/api';
import { 
  AffiliateApplication, 
  Affiliate, 
  AffiliateReferral, 
  AffiliateStats 
} from '../types';

const API_BASE_URL = '/affiliates';

export const affiliateService = {
  // Submit affiliate application
  async submitApplication(application: Omit<AffiliateApplication, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<AffiliateApplication> {
    const response = await axios.post(`${API_BASE_URL}/applications`, application);
    return response.data;
  },

  // Check application status
  async checkApplicationStatus(email: string): Promise<{ status: string; message?: string }> {
    const response = await axios.get(`${API_BASE_URL}/applications/status/${email}`);
    return response.data;
  },

  // Get affiliate profile
  async getAffiliateProfile(): Promise<Affiliate> {
    const response = await axios.get(`${API_BASE_URL}/profile`);
    return response.data;
  },

  // Update payment information
  async updatePaymentInfo(paymentInfo: { bankName: string; accountNumber: string; accountName: string }): Promise<Affiliate> {
    const response = await axios.put(`${API_BASE_URL}/payment-info`, paymentInfo);
    return response.data;
  },

  // Get affiliate statistics
  async getAffiliateStats(): Promise<AffiliateStats> {
    const response = await axios.get(`${API_BASE_URL}/stats`);
    return response.data;
  },

  // Get affiliate referrals
  async getAffiliateReferrals(): Promise<{ referrals: AffiliateReferral[], total: number, page: number, totalPages: number }> {
    const response = await axios.get(`${API_BASE_URL}/referrals`);
    return response.data;
  },

  // Validate affiliate code
  async validateAffiliateCode(code: string): Promise<{ valid: boolean; affiliateId?: string }> {
    const response = await axios.get(`${API_BASE_URL}/validate-code/${code}`);
    return response.data;
  },

  // Track referral
  async trackReferral(affiliateCode: string, userData: { email: string; name: string }, courseId: string, courseTitle: string, coursePrice: number): Promise<{ success: boolean; referralId?: string }> {
    const response = await axios.post(`${API_BASE_URL}/track-referral`, {
      affiliateCode,
      userData,
      courseId,
      courseTitle,
      coursePrice
    });
    return response.data;
  },

  // Admin methods
  async getAllApplications(): Promise<AffiliateApplication[]> {
    const response = await axios.get('/admin/applications');
    return response.data.applications;
  },

  async getAllAffiliates(): Promise<Affiliate[]> {
    const response = await axios.get('/admin/affiliates');
    return response.data.affiliates;
  },

  async reviewApplication(applicationId: string, status: 'approved' | 'rejected', rejectionReason?: string): Promise<{
    success: boolean;
    affiliateId?: string;
    affiliateCode?: string;
    credentials?: { email: string; password: string };
  }> {
    const response = await axios.post(`/admin/applications/${applicationId}/review`, {
      status,
      rejectionReason
    });
    return response.data;
  },

  // Alias methods for AdminAffiliates component
  async getAdminApplications(): Promise<AffiliateApplication[]> {
    return this.getAllApplications();
  },

  async getAdminAffiliates(): Promise<Affiliate[]> {
    return this.getAllAffiliates();
  }
};
