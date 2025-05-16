export interface Course {
  id: number;
  title: string;
  platform: 'udemy' | 'google' | 'coursera' | 'other';
  description: string;
  imageUrl: string;
  affiliateLink: string;
  price: string;
  rating: number;
  instructor: string;
  isFree: boolean;
}

const courses: Course[] = [
  // Udemy Courses
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    platform: "udemy",
    description: "Learn web development from scratch with HTML, CSS, JavaScript, React, and more.",
    imageUrl: "https://img-c.udemycdn.com/course/750x422/1565838_e54e_16.jpg",
    affiliateLink: "https://www.udemy.com/course/the-complete-web-development-bootcamp/?affiliate_id=YOUR_AFFILIATE_ID",
    price: "$89.99",
    rating: 4.7,
    instructor: "Dr. Angela Yu",
    isFree: false
  },
  // ... rest of the courses ...
];

export { courses }; 