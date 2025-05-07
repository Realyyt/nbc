import { mockPrograms, mockPayments } from '../data/mockData';
import api from '../lib/api';

// Add type declarations for environment variables
declare global {
  interface ImportMeta {
    env: {
      VITE_UDEMY_API_KEY: string;
      VITE_UDEMY_API_URL: string;
      VITE_COURSERA_API_KEY: string;
      VITE_COURSERA_API_URL: string;
      VITE_EDX_API_KEY: string;
      VITE_EDX_API_URL: string;
    }
  }
}

// Define types
export type Program = {
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

export type UserProgram = {
  id: string;
  user_id: string;
  program_id: string;
  status: string;
  created_at: string;
  platform_access_token?: string;
};

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

  // Get user's purchased programs
  async getUserPrograms(userId: string) {
    try {
      const userPrograms = JSON.parse(localStorage.getItem('userPrograms') || '[]');
      const programs = mockPrograms;
      
      return userPrograms
        .filter((up: UserProgram) => up.user_id === userId)
        .map((up: UserProgram) => ({
          ...up,
          programs: programs.find(p => p.id === up.program_id)
        }));
    } catch (error) {
      console.error('Error fetching user programs:', error);
      throw error;
    }
  },

  // Get program platform access token
  async getPlatformAccessToken(programId: string, userId: string) {
    const userPrograms = JSON.parse(localStorage.getItem('userPrograms') || '[]');
    const userProgram = userPrograms.find(
      (up: UserProgram) => up.program_id === programId && up.user_id === userId
    );
    return userProgram?.platform_access_token;
  }
}; 