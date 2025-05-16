import axios from 'axios';
import { supabase } from '../lib/supabase';
import { Course } from '../data/affiliateCourses';

// API configuration
const UDEMY_API_KEY = import.meta.env.VITE_UDEMY_API_KEY;
const UDEMY_CLIENT_ID = import.meta.env.VITE_UDEMY_CLIENT_ID;
const COURSERA_API_KEY = import.meta.env.VITE_COURSERA_API_KEY;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// Udemy API service
const udemyApi = axios.create({
  baseURL: 'https://www.udemy.com/api-2.0',
  auth: {
    username: UDEMY_CLIENT_ID,
    password: UDEMY_API_KEY
  }
});

// Coursera API service
const courseraApi = axios.create({
  baseURL: 'https://api.coursera.org/api/catalog.v1',
  headers: {
    'Authorization': `Bearer ${COURSERA_API_KEY}`
  }
});

// Google Cloud Training API service
const googleApi = axios.create({
  baseURL: 'https://cloud.google.com/training/api/v1',
  headers: {
    'Authorization': `Bearer ${GOOGLE_API_KEY}`
  }
});

// Transform Udemy course to our Course interface
const transformUdemyCourse = (course: any): Course => ({
  id: course.id,
  title: course.title,
  platform: 'udemy',
  description: course.headline,
  imageUrl: course.image_480x270,
  affiliateLink: `https://www.udemy.com${course.url}?affiliate_id=YOUR_AFFILIATE_ID`,
  price: course.price,
  rating: course.rating,
  instructor: course.visible_instructors[0]?.display_name || 'Unknown',
  isFree: course.price === '0' || course.price === '0.0'
});

// Transform Coursera course to our Course interface
const transformCourseraCourse = (course: any): Course => ({
  id: course.id,
  title: course.name,
  platform: 'coursera',
  description: course.shortDescription,
  imageUrl: course.photoUrl,
  affiliateLink: `https://www.coursera.org/learn/${course.slug}?affiliate_id=YOUR_AFFILIATE_ID`,
  price: course.isPaid ? course.price : 'Free',
  rating: course.rating,
  instructor: course.instructorName,
  isFree: !course.isPaid
});

// Transform Google course to our Course interface
const transformGoogleCourse = (course: any): Course => ({
  id: course.id,
  title: course.title,
  platform: 'google',
  description: course.description,
  imageUrl: course.imageUrl,
  affiliateLink: `https://cloud.google.com/training/${course.slug}?affiliate_id=YOUR_AFFILIATE_ID`,
  price: course.price || 'Free',
  rating: course.rating,
  instructor: course.instructor,
  isFree: !course.price
});

// Fetch courses from all platforms
export const fetchAllCourses = async (): Promise<Course[]> => {
  try {
    const [udemyCourses, courseraCourses, googleCourses] = await Promise.all([
      fetchUdemyCourses(),
      fetchCourseraCourses(),
      fetchGoogleCourses()
    ]);

    return [...udemyCourses, ...courseraCourses, ...googleCourses];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

// Fetch Udemy courses
export const fetchUdemyCourses = async (): Promise<Course[]> => {
  try {
    const response = await udemyApi.get('/courses/', {
      params: {
        page_size: 100,
        ordering: 'highest-rated'
      }
    });
    return response.data.results.map(transformUdemyCourse);
  } catch (error) {
    console.error('Error fetching Udemy courses:', error);
    return [];
  }
};

// Fetch Coursera courses
export const fetchCourseraCourses = async (): Promise<Course[]> => {
  try {
    const response = await courseraApi.get('/courses', {
      params: {
        limit: 100,
        fields: 'id,name,shortDescription,photoUrl,slug,isPaid,price,rating,instructorName'
      }
    });
    return response.data.elements.map(transformCourseraCourse);
  } catch (error) {
    console.error('Error fetching Coursera courses:', error);
    return [];
  }
};

// Fetch Google courses
export const fetchGoogleCourses = async (): Promise<Course[]> => {
  try {
    const response = await googleApi.get('/courses', {
      params: {
        pageSize: 100,
        orderBy: 'rating'
      }
    });
    return response.data.courses.map(transformGoogleCourse);
  } catch (error) {
    console.error('Error fetching Google courses:', error);
    return [];
  }
};

// Similar implementations for other platforms 