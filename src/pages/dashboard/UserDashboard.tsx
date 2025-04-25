import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Users, Calendar, CreditCard, 
  ChevronRight, ArrowRight, MapPin 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockEnrollments } from '../../data/mockData';

const UserDashboard = () => {
  const { user } = useAuth();
  const [upcomingCourses, setUpcomingCourses] = useState(mockEnrollments);
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's an overview of your learning journey
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Enrolled Courses</p>
              <p className="text-2xl font-semibold mt-1">2</p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <BookOpen size={24} className="text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-semibold mt-1">0</p>
            </div>
            <div className="h-12 w-12 bg-success/10 rounded-full flex items-center justify-center">
              <Users size={24} className="text-success" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Upcoming</p>
              <p className="text-2xl font-semibold mt-1">2</p>
            </div>
            <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center">
              <Calendar size={24} className="text-accent" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Amount Spent</p>
              <p className="text-2xl font-semibold mt-1">₦135,000</p>
            </div>
            <div className="h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center">
              <CreditCard size={24} className="text-secondary" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Next upcoming course */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Your Next Training</h2>
          <Link to="/dashboard/courses" className="text-sm text-primary font-medium hover:underline flex items-center">
            View all <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={upcomingCourses[0].image} 
                alt={upcomingCourses[0].title} 
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
            
            <div className="p-6 md:w-2/3">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {upcomingCourses[0].title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                Instructor: {upcomingCourses[0].instructor}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar size={18} className="text-primary mr-2" />
                  <span className="text-gray-700">{upcomingCourses[0].startDate}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin size={18} className="text-primary mr-2" />
                  <span className="text-gray-700">{upcomingCourses[0].location}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="bg-yellow-50 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                  Starts in 2 weeks
                </div>
                
                <Link to={`/courses/${upcomingCourses[0].courseId}`} className="text-primary font-medium flex items-center hover:underline">
                  View course details <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recommended courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recommended For You</h2>
          <Link to="/courses" className="text-sm text-primary font-medium hover:underline flex items-center">
            Browse all courses <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Advanced HS Code Classification" 
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-1">Advanced HS Code Classification</h3>
              <p className="text-sm text-gray-600 mb-3">Mr. David Olawale</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold">₦50,000</span>
                <Link to="/courses/5" className="text-sm text-primary font-medium hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Strategic Supply Chain Management" 
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-1">Strategic Supply Chain Management</h3>
              <p className="text-sm text-gray-600 mb-3">Ms. Amina Bello</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold">₦80,000</span>
                <Link to="/courses/8" className="text-sm text-primary font-medium hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Trade Finance for Nigerian Businesses" 
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-1">Trade Finance for Nigerian Businesses</h3>
              <p className="text-sm text-gray-600 mb-3">Dr. Sarah Ahmed</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold">₦55,000</span>
                <Link to="/courses/4" className="text-sm text-primary font-medium hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;