import { Program } from '../lib/supabase';

interface PlatformConfig {
  apiKey: string;
  apiUrl: string;
}

interface PlatformCourse {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail_url: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export const platformService = {
  // Udemy API integration
  async fetchUdemyCourses(config: PlatformConfig): Promise<Program[]> {
    try {
      const response = await fetch(`${config.apiUrl}/courses`, {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Udemy courses');
      }

      const data = await response.json();
      return data.results.map((course: any) => ({
        id: course.id.toString(),
        title: course.title,
        description: course.description,
        price: course.price,
        platform: 'udemy',
        platform_course_id: course.id.toString(),
        thumbnail_url: course.image_480x270,
        instructor: course.visible_instructors[0]?.display_name || 'Unknown',
        duration: course.content_info,
        level: this.mapUdemyLevel(course.instructional_level),
        created_at: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error fetching Udemy courses:', error);
      throw error;
    }
  },

  // Coursera API integration
  async fetchCourseraCourses(config: PlatformConfig): Promise<Program[]> {
    try {
      const response = await fetch(`${config.apiUrl}/courses`, {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Coursera courses');
      }

      const data = await response.json();
      return data.elements.map((course: any) => ({
        id: course.id,
        title: course.name,
        description: course.description,
        price: course.price || 0,
        platform: 'coursera',
        platform_course_id: course.id,
        thumbnail_url: course.photoUrl,
        instructor: course.instructorIds?.[0] || 'Unknown',
        duration: course.duration,
        level: this.mapCourseraLevel(course.level),
        created_at: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error fetching Coursera courses:', error);
      throw error;
    }
  },

  // edX API integration
  async fetchEdxCourses(config: PlatformConfig): Promise<Program[]> {
    try {
      const response = await fetch(`${config.apiUrl}/courses`, {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch edX courses');
      }

      const data = await response.json();
      return data.results.map((course: any) => ({
        id: course.id,
        title: course.name,
        description: course.short_description,
        price: course.price || 0,
        platform: 'edx',
        platform_course_id: course.id,
        thumbnail_url: course.image_url,
        instructor: course.org,
        duration: course.effort,
        level: this.mapEdxLevel(course.level),
        created_at: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error fetching edX courses:', error);
      throw error;
    }
  },

  // Helper functions to map platform-specific levels to our standard levels
  mapUdemyLevel(level: string): 'beginner' | 'intermediate' | 'advanced' {
    const levelMap: { [key: string]: 'beginner' | 'intermediate' | 'advanced' } = {
      'beginner': 'beginner',
      'intermediate': 'intermediate',
      'advanced': 'advanced',
      'all': 'beginner',
    };
    return levelMap[level.toLowerCase()] || 'beginner';
  },

  mapCourseraLevel(level: string): 'beginner' | 'intermediate' | 'advanced' {
    const levelMap: { [key: string]: 'beginner' | 'intermediate' | 'advanced' } = {
      'beginner': 'beginner',
      'intermediate': 'intermediate',
      'advanced': 'advanced',
      'mixed': 'beginner',
    };
    return levelMap[level.toLowerCase()] || 'beginner';
  },

  mapEdxLevel(level: string): 'beginner' | 'intermediate' | 'advanced' {
    const levelMap: { [key: string]: 'beginner' | 'intermediate' | 'advanced' } = {
      'introductory': 'beginner',
      'intermediate': 'intermediate',
      'advanced': 'advanced',
    };
    return levelMap[level.toLowerCase()] || 'beginner';
  },
}; 