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
} 