import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  platform: 'udemy' | 'coursera' | 'edx' | 'NBTA' | 'other';
  platform_course_id: string;
  thumbnail_url: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
  mode: 'physical' | 'online' | 'hybrid';
  priceType: 'free' | 'paid' | 'sponsorship';
};

export type UserCourse = {
  id: string;
  user_id: string;
  course_id: string;
  purchase_date: string;
  status: 'active' | 'completed' | 'expired';
  platform_access_token?: string;
};

export type Payment = {
  id: string;
  user_id: string;
  course_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  payment_method: string;
  created_at: string;
}; 