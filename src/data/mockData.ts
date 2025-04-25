import { Course } from '../contexts/CartContext';

// Mock courses data
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Comprehensive Customs Clearing Procedures',
    instructor: 'Dr. Adebayo Johnson',
    price: 75000,
    image: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Customs'
  },
  {
    id: '2',
    title: 'Export Documentation Masterclass',
    instructor: 'Mrs. Folake Ademola',
    price: 60000,
    image: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Export'
  },
  {
    id: '3',
    title: 'Nigerian Import Guidelines and Compliance',
    instructor: 'Mr. Emeka Okafor',
    price: 65000,
    image: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Import'
  },
  {
    id: '4',
    title: 'Trade Finance for Nigerian Businesses',
    instructor: 'Dr. Sarah Ahmed',
    price: 55000,
    image: 'https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Trade'
  },
  {
    id: '5',
    title: 'Advanced HS Code Classification',
    instructor: 'Mr. David Olawale',
    price: 50000,
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Customs'
  },
  {
    id: '6',
    title: 'Ports and Terminal Operations in Nigeria',
    instructor: 'Capt. Michael Ebere',
    price: 70000,
    image: 'https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Logistics'
  },
  {
    id: '7',
    title: 'ECOWAS Trade Regulations and Documentation',
    instructor: 'Prof. Kwame Mensah',
    price: 45000,
    image: 'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Trade'
  },
  {
    id: '8',
    title: 'Strategic Supply Chain Management',
    instructor: 'Ms. Amina Bello',
    price: 80000,
    image: 'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Logistics'
  },
  {
    id: '9',
    title: 'Customs Valuation and Transfer Pricing',
    instructor: 'Mr. Vincent Okoro',
    price: 55000,
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Customs'
  },
  {
    id: '10',
    title: 'Export Market Development for SMEs',
    instructor: 'Dr. Ngozi Okonjo',
    price: 40000,
    image: 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Export'
  }
];

// Mock categories
export const categories = [
  { id: 1, name: 'Customs', count: 3 },
  { id: 2, name: 'Export', count: 2 },
  { id: 3, name: 'Import', count: 1 },
  { id: 4, name: 'Trade', count: 2 },
  { id: 5, name: 'Logistics', count: 2 }
];

// Mock users for admin panel
export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234123456789',
    courses: 2,
    totalSpent: 135000,
    lastActive: '2025-06-01T10:23:45'
  },
  {
    id: '2',
    name: 'Mary Smith',
    email: 'mary@example.com',
    phone: '+234987654321',
    courses: 1,
    totalSpent: 60000,
    lastActive: '2025-05-28T14:15:20'
  },
  {
    id: '3',
    name: 'Emeka Johnson',
    email: 'emeka@example.com',
    phone: '+2348012345678',
    courses: 3,
    totalSpent: 190000,
    lastActive: '2025-06-02T09:10:15'
  },
  {
    id: '4',
    name: 'Blessing Okafor',
    email: 'blessing@example.com',
    phone: '+2347023456789',
    courses: 1,
    totalSpent: 70000,
    lastActive: '2025-05-30T16:42:10'
  },
  {
    id: '5',
    name: 'Ibrahim Mohammed',
    email: 'ibrahim@example.com',
    phone: '+2349087654321',
    courses: 2,
    totalSpent: 95000,
    lastActive: '2025-06-01T11:30:00'
  }
];

// Mock payments for admin panel
export const mockPayments = [
  {
    id: 'PAY-1001',
    user: 'John Doe',
    email: 'john@example.com',
    amount: 75000,
    date: '2025-06-01T10:20:30',
    status: 'completed',
    method: 'card',
    course: 'Comprehensive Customs Clearing Procedures'
  },
  {
    id: 'PAY-1002',
    user: 'Mary Smith',
    email: 'mary@example.com',
    amount: 60000,
    date: '2025-05-28T14:10:15',
    status: 'completed',
    method: 'transfer',
    course: 'Export Documentation Masterclass'
  },
  {
    id: 'PAY-1003',
    user: 'Emeka Johnson',
    email: 'emeka@example.com',
    amount: 65000,
    date: '2025-06-02T09:05:10',
    status: 'completed',
    method: 'card',
    course: 'Nigerian Import Guidelines and Compliance'
  },
  {
    id: 'PAY-1004',
    user: 'John Doe',
    email: 'john@example.com',
    amount: 60000,
    date: '2025-06-01T11:30:45',
    status: 'completed',
    method: 'card',
    course: 'Export Documentation Masterclass'
  },
  {
    id: 'PAY-1005',
    user: 'Blessing Okafor',
    email: 'blessing@example.com',
    amount: 70000,
    date: '2025-05-30T16:40:20',
    status: 'completed',
    method: 'transfer',
    course: 'Ports and Terminal Operations in Nigeria'
  },
  {
    id: 'PAY-1006',
    user: 'Ibrahim Mohammed',
    email: 'ibrahim@example.com',
    amount: 50000,
    date: '2025-06-01T11:25:30',
    status: 'completed',
    method: 'card',
    course: 'Advanced HS Code Classification'
  },
  {
    id: 'PAY-1007',
    user: 'Ibrahim Mohammed',
    email: 'ibrahim@example.com',
    amount: 45000,
    date: '2025-06-01T11:28:45',
    status: 'completed',
    method: 'card',
    course: 'ECOWAS Trade Regulations and Documentation'
  },
  {
    id: 'PAY-1008',
    user: 'Emeka Johnson',
    email: 'emeka@example.com',
    amount: 55000,
    date: '2025-06-02T09:15:30',
    status: 'completed',
    method: 'transfer',
    course: 'Trade Finance for Nigerian Businesses'
  },
  {
    id: 'PAY-1009',
    user: 'Emeka Johnson',
    email: 'emeka@example.com',
    amount: 70000,
    date: '2025-06-02T09:20:15',
    status: 'completed',
    method: 'transfer',
    course: 'Ports and Terminal Operations in Nigeria'
  }
];

// Mock user enrollments for dashboard
export const mockEnrollments = [
  {
    id: '1',
    courseId: '1',
    title: 'Comprehensive Customs Clearing Procedures',
    instructor: 'Dr. Adebayo Johnson',
    image: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    enrolledDate: '2025-06-01',
    startDate: '2025-06-15',
    location: 'NBTA Training Center, Lagos',
    status: 'upcoming'
  },
  {
    id: '2',
    courseId: '2',
    title: 'Export Documentation Masterclass',
    instructor: 'Mrs. Folake Ademola',
    image: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    enrolledDate: '2025-06-01',
    startDate: '2025-07-08',
    location: 'NBTA Training Center, Abuja',
    status: 'upcoming'
  }
];