// Use the Course type from src/lib/supabase.ts

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  instructor: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in hours
  rating: number;
  reviews: number;
  students: number;
  createdAt: string;
  updatedAt: string;
  mode: 'physical' | 'online' | 'hybrid';
  priceType: 'free' | 'paid' | 'sponsorship';
}

// Affiliate System Types
export interface AffiliateApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  socialMediaHandles: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  website?: string;
  audienceSize: number;
  audienceDescription: string;
  motivation: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

export interface Affiliate {
  id: string;
  userId: string;
  applicationId: string;
  fullName: string;
  email: string;
  phone: string;
  socialMediaHandles: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  audienceSize: number;
  audienceDescription: string;
  motivation: string;
  affiliateCode: string;
  commissionRate: number; // Percentage (e.g., 0.10 for 10%)
  totalEarnings: number;
  totalReferrals: number;
  activeReferrals: number;
  status: 'active' | 'suspended' | 'inactive';
  joinedAt: string;
  lastActivityAt: string;
  paymentInfo: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

export interface AffiliateReferral {
  id: string;
  affiliateId: string;
  referredUserId: string;
  referredUserEmail: string;
  referredUserName: string;
  courseId: string;
  courseTitle: string;
  coursePrice: number;
  commissionAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paidAt?: string;
}

export interface AffiliateStats {
  totalEarnings: number;
  totalReferrals: number;
  activeReferrals: number;
  pendingCommissions: number;
  paidCommissions: number;
  monthlyEarnings: number;
  monthlyReferrals: number;
}

 