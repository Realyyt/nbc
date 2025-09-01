import api from '../lib/api';
import { 
  AffiliateApplication, 
  Affiliate, 
  AffiliateReferral, 
  AffiliateStats, 
  AffiliateWithdrawal 
} from '../types';

// Generate unique affiliate code
const generateAffiliateCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const affiliateService = {
  // Affiliate Application
  async submitApplication(application: Omit<AffiliateApplication, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<AffiliateApplication> {
    const response = await api.post('/affiliates/applications', {
      ...application,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  },

  async getApplicationStatus(email: string): Promise<AffiliateApplication | null> {
    try {
      const response = await api.get(`/affiliates/applications/status/${email}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  // Affiliate Management
  async getAffiliateProfile(): Promise<Affiliate> {
    const response = await api.get('/affiliates/profile');
    return response.data;
  },

  async updatePaymentInfo(paymentInfo: Affiliate['paymentInfo']): Promise<Affiliate> {
    const response = await api.put('/affiliates/payment-info', { paymentInfo });
    return response.data;
  },

  async getAffiliateStats(): Promise<AffiliateStats> {
    const response = await api.get('/affiliates/stats');
    return response.data;
  },

  // Referrals
  async getReferrals(page: number = 1, limit: number = 10): Promise<{
    referrals: AffiliateReferral[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await api.get(`/affiliates/referrals?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getReferralById(referralId: string): Promise<AffiliateReferral> {
    const response = await api.get(`/affiliates/referrals/${referralId}`);
    return response.data;
  },



  // Admin Functions
  async getAllApplications(page: number = 1, limit: number = 10): Promise<{
    applications: AffiliateApplication[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await api.get(`/admin/affiliates/applications?page=${page}&limit=${limit}`);
    return response.data;
  },

  async reviewApplication(
    applicationId: string, 
    status: 'approved' | 'rejected', 
    rejectionReason?: string
  ): Promise<AffiliateApplication> {
    const response = await api.put(`/admin/affiliates/applications/${applicationId}/review`, {
      status,
      rejectionReason,
      reviewedAt: new Date().toISOString(),
    });
    return response.data;
  },

  async getAllAffiliates(page: number = 1, limit: number = 10): Promise<{
    affiliates: Affiliate[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await api.get(`/admin/affiliates?page=${page}&limit=${limit}`);
    return response.data;
  },

  async updateAffiliateStatus(affiliateId: string, status: 'active' | 'suspended' | 'inactive'): Promise<Affiliate> {
    const response = await api.put(`/admin/affiliates/${affiliateId}/status`, { status });
    return response.data;
  },



  // Utility Functions
  generateAffiliateCode,
  
  // Validate affiliate code
  async validateAffiliateCode(code: string): Promise<{ valid: boolean; affiliate?: Affiliate }> {
    try {
      const response = await api.get(`/affiliates/validate-code/${code}`);
      return { valid: true, affiliate: response.data };
    } catch (error) {
      return { valid: false };
    }
  },

  // Track referral (called when someone registers with affiliate code)
  async trackReferral(
    affiliateCode: string,
    userData: { email: string; name: string },
    courseId: string,
    courseTitle: string,
    coursePrice: number
  ): Promise<AffiliateReferral> {
    const response = await api.post('/affiliates/track-referral', {
      affiliateCode,
      userData,
      courseId,
      courseTitle,
      coursePrice,
    });
    return response.data;
  },
};
