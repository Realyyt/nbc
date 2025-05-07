import { supabase, Program, UserProgram, Payment } from '../lib/supabase';
import Stripe from 'stripe';
import { mockPrograms, mockPayments } from '../data/mockData';
import api from '../lib/api';

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
  apiVersion: '2025-03-31.basil',
});

// Platform configurations
const platformConfigs = {
  udemy: {
    apiKey: import.meta.env.VITE_UDEMY_API_KEY,
    apiUrl: import.meta.env.VITE_UDEMY_API_URL,
  },
  coursera: {
    apiKey: import.meta.env.VITE_COURSERA_API_KEY,
    apiUrl: import.meta.env.VITE_COURSERA_API_URL,
  },
  edx: {
    apiKey: import.meta.env.VITE_EDX_API_KEY,
    apiUrl: import.meta.env.VITE_EDX_API_URL,
  },
};

// Helper function to anonymize course data
const anonymizeProgram = (program: any, platform: string): Program => {
  // Convert price to Naira (assuming input is in USD)
  const priceInNaira = Math.round(program.price * 1300); // Using approximate exchange rate

  return {
    id: `${platform}-${program.id}`,
    title: program.title,
    description: program.description,
    price: priceInNaira,
    platform: 'NBTA', // Always show as NBTA
    platform_course_id: program.id,
    thumbnail_url: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Use generic image
    instructor: 'NBTA Instructor', // Generic instructor name
    duration: program.duration || '5 days',
    level: program.level || 'beginner',
    created_at: new Date().toISOString(),
    mode: program.mode || 'online',
    priceType: program.priceType || 'paid'
  };
};

// Helper function to fetch programs from a platform
const fetchPlatformPrograms = async (platform: string, config: any): Promise<Program[]> => {
  try {
    const response = await api.get(config.apiUrl, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
      },
    });
    return response.data.map((program: any) => anonymizeProgram(program, platform));
  } catch (error) {
    console.error(`Error fetching programs from ${platform}:`, error);
    return [];
  }
};

export const programService = {
  // Get all programs
  async getPrograms(): Promise<Program[]> {
    try {
      // Return mock programs directly
      return mockPrograms;
    } catch (error) {
      console.error('Error fetching programs:', error);
      throw error;
    }
  },

  // Get program by ID
  async getProgramById(id: string): Promise<Program | undefined> {
    try {
      const program = mockPrograms.find(program => program.id === id);
      return program;
    } catch (error) {
      console.error('Error fetching program:', error);
      throw error;
    }
  },

  // Search programs
  async searchPrograms(query: string): Promise<Program[]> {
    try {
      return mockPrograms.filter(program =>
        program.title.toLowerCase().includes(query.toLowerCase()) ||
        program.description.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching programs:', error);
      throw error;
    }
  },

  // Get programs by category
  async getProgramsByCategory(category: string): Promise<Program[]> {
    try {
      return mockPrograms.filter(program => program.level === category);
    } catch (error) {
      console.error(`Error fetching programs for category ${category}:`, error);
      throw error;
    }
  },

  // Create a payment intent for a program
  async createPaymentIntent(programId: string, userId: string) {
    const program = await this.getProgramById(programId);
    
    if (!program) {
      throw new Error('Program not found');
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(program.price * 100), // Convert to cents
      currency: 'ngn', // Use Naira
      metadata: {
        programId,
        userId,
      },
    });

    return paymentIntent;
  },

  // Handle successful payment
  async handleSuccessfulPayment(paymentIntentId: string) {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const { programId, userId } = paymentIntent.metadata;

    // Create payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        course_id: programId,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: 'completed',
        payment_method: paymentIntent.payment_method_types[0],
      });

    if (paymentError) throw paymentError;

    // Create user course record
    const { error: userCourseError } = await supabase
      .from('user_programs')
      .insert({
        user_id: userId,
        course_id: programId,
        status: 'active',
      });

    if (userCourseError) throw userCourseError;
  },

  // Get user's purchased programs
  async getUserPrograms(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_programs')
        .select(`
          *,
          programs (*)
        `)
        .eq('user_id', userId);
      if (error) throw error;
      return data as (UserProgram & { programs: Program })[];
    } catch (error) {
      console.error('Error fetching user programs:', error);
      throw error;
    }
  },

  // Get program platform access token
  async getPlatformAccessToken(programId: string, userId: string) {
    const { data, error } = await supabase
      .from('user_programs')
      .select('platform_access_token')
      .eq('course_id', programId)
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data?.platform_access_token;
  },

  // Get all payments (for admin)
  async getPayments() {
    return mockPayments;
  },
}; 