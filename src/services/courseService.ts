import { supabase, Course, UserCourse, Payment } from '../lib/supabase';
import Stripe from 'stripe';
import { mockCourses, mockPayments } from '../data/mockData';
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
const anonymizeCourse = (course: any, platform: string): Course => {
  // Convert price to Naira (assuming input is in USD)
  const priceInNaira = Math.round(course.price * 1300); // Using approximate exchange rate

  return {
    id: `${platform}-${course.id}`,
    title: course.title,
    description: course.description,
    price: priceInNaira,
    platform: 'NBTA', // Always show as NBTA
    platform_course_id: course.id,
    thumbnail_url: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Use generic image
    instructor: 'NBTA Instructor', // Generic instructor name
    duration: course.duration || '5 days',
    level: course.level || 'beginner',
    created_at: new Date().toISOString()
  };
};

// Helper function to fetch courses from a platform
const fetchPlatformCourses = async (platform: string, config: any): Promise<Course[]> => {
  try {
    const response = await api.get(config.apiUrl, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`
      }
    });
    
    return response.data.map((course: any) => anonymizeCourse(course, platform));
  } catch (error) {
    console.error(`Error fetching courses from ${platform}:`, error);
    return [];
  }
};

export const courseService = {
  // Get all courses
  async getCourses(): Promise<Course[]> {
    try {
      // Return mock courses directly
      return mockCourses;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  },

  // Get course by ID
  async getCourseById(id: string): Promise<Course | null> {
    try {
      const course = mockCourses.find(course => course.id === id);
      return course || null;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      return null;
    }
  },

  // Search courses
  async searchCourses(query: string): Promise<Course[]> {
    try {
      return mockCourses.filter(course =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching courses:', error);
      return [];
    }
  },

  // Get courses by category
  async getCoursesByCategory(category: string): Promise<Course[]> {
    try {
      return mockCourses.filter(course => course.level === category);
    } catch (error) {
      console.error(`Error fetching courses for category ${category}:`, error);
      return [];
    }
  },

  // Create a payment intent for a course
  async createPaymentIntent(courseId: string, userId: string) {
    const course = await this.getCourseById(courseId);
    
    if (!course) {
      throw new Error('Course not found');
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(course.price * 100), // Convert to cents
      currency: 'ngn', // Use Naira
      metadata: {
        courseId,
        userId,
      },
    });

    return paymentIntent;
  },

  // Handle successful payment
  async handleSuccessfulPayment(paymentIntentId: string) {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const { courseId, userId } = paymentIntent.metadata;

    // Create payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        course_id: courseId,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: 'completed',
        payment_method: paymentIntent.payment_method_types[0],
      });

    if (paymentError) throw paymentError;

    // Create user course record
    const { error: userCourseError } = await supabase
      .from('user_courses')
      .insert({
        user_id: userId,
        course_id: courseId,
        status: 'active',
      });

    if (userCourseError) throw userCourseError;
  },

  // Get user's purchased courses
  async getUserCourses(userId: string) {
    const { data, error } = await supabase
      .from('user_courses')
      .select(`
        *,
        courses (*)
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return data as (UserCourse & { courses: Course })[];
  },

  // Get course platform access token
  async getPlatformAccessToken(courseId: string, userId: string) {
    const { data, error } = await supabase
      .from('user_courses')
      .select('platform_access_token')
      .eq('course_id', courseId)
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