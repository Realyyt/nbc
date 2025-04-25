import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, BookOpen, Award, Users, MapPin, Calendar, ChevronRight } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { Course } from '../contexts/CartContext';
import { mockCourses } from '../data/mockData';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll use the mock data
    setFeaturedCourses(mockCourses.slice(0, 6));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/courses?search=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  return (
    <div>
      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary pt-24 pb-16 md:pb-24 text-white">
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-1 mb-10 md:mb-0 md:pr-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight animate-fade-in">
                Advance Your Career in Nigerian Trade & Customs
              </h1>
              <p className="mt-4 text-lg text-gray-100 md:text-xl max-w-xl animate-slide-up">
                Join Nigeria's leading platform for practical training in customs procedures, import/export
                documentation, and trade regulations. Physical courses taught by industry experts.
              </p>
              <form onSubmit={handleSearch} className="mt-8 flex animate-slide-up">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search for courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-5 py-3 rounded-l-md text-gray-800 focus:outline-none"
                  />
                  <SearchIcon size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <button type="submit" className="bg-accent text-foreground font-medium px-6 py-3 rounded-r-md hover:opacity-90 transition-opacity">
                  Search
                </button>
              </form>
              <div className="mt-8 animate-slide-up">
                <Link to="/courses" className="btn-outline bg-white/10 text-white border-white hover:bg-white hover:text-primary transition-all">
                  Browse All Courses
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="NBTA Training"
                  className="rounded-lg shadow-xl animate-fade-in"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg animate-slide-up">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-success/20 p-2">
                      <Award size={24} className="text-success" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium text-sm">Certified Training</p>
                      <p className="text-gray-500 text-xs">NBTA Accredited</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="container-custom mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold">15+</p>
              <p className="text-sm text-gray-200">Courses Available</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold">20+</p>
              <p className="text-sm text-gray-200">Expert Instructors</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold">5,000+</p>
              <p className="text-sm text-gray-200">Trained Professionals</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold">98%</p>
              <p className="text-sm text-gray-200">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured courses section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                Featured Courses
              </h2>
              <p className="mt-2 text-gray-600">
                Discover our most popular training programs
              </p>
            </div>
            <Link to="/courses" className="mt-4 md:mt-0 flex items-center text-primary font-medium hover:underline">
              View all courses <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              How Our Courses Work
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Our physical training programs are designed to give you practical, hands-on experience
              with Nigerian trade and customs procedures
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">1. Choose a Course</h3>
              <p className="text-gray-600">
                Browse our catalog of specialized courses and select the one that matches your career goals.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">2. Register & Pay</h3>
              <p className="text-gray-600">
                Complete your registration and payment process online to secure your spot in the class.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">3. Attend Training</h3>
              <p className="text-gray-600">
                Join us at our training center for expert-led sessions with practical demonstrations and networking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming trainings section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Upcoming Training Sessions
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Reserve your spot in our next physical training sessions across Nigeria
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-medium text-foreground">Customs Clearing Procedures</h3>
                    <p className="text-gray-600 mt-1">3-day intensive workshop</p>
                  </div>
                  <div className="bg-accent/10 text-accent font-medium px-3 py-1 rounded-full text-sm">
                    Filling Fast
                  </div>
                </div>
                
                <div className="mt-4 flex items-center text-gray-600">
                  <Calendar size={18} className="mr-2" />
                  <span>June 15-17, 2025 (9 AM - 4 PM)</span>
                </div>
                
                <div className="mt-2 flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2" />
                  <span>NBTA Training Center, Lagos</span>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <span className="font-semibold text-lg">₦75,000</span>
                  <Link to="/courses/customs-clearing" className="btn-primary">
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-medium text-foreground">Export Documentation Masterclass</h3>
                    <p className="text-gray-600 mt-1">2-day comprehensive training</p>
                  </div>
                  <div className="bg-success/10 text-success font-medium px-3 py-1 rounded-full text-sm">
                    New
                  </div>
                </div>
                
                <div className="mt-4 flex items-center text-gray-600">
                  <Calendar size={18} className="mr-2" />
                  <span>July 8-9, 2025 (9 AM - 4 PM)</span>
                </div>
                
                <div className="mt-2 flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2" />
                  <span>NBTA Training Center, Abuja</span>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <span className="font-semibold text-lg">₦60,000</span>
                  <Link to="/courses/export-documentation" className="btn-primary">
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/courses" className="btn-outline inline-block">
              View All Upcoming Trainings
            </Link>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Ready to Advance Your Career in Nigerian Trade?
            </h2>
            <p className="text-lg text-gray-100 mb-8">
              Join thousands of professionals who have transformed their careers through NBTA's 
              practical training programs. Register today for upcoming classes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/courses" className="btn-accent text-foreground font-medium">
                Browse Courses
              </Link>
              <Link to="/register" className="btn-outline bg-white/10 text-white border-white hover:bg-white hover:text-primary">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;