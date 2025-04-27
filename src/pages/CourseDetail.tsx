import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, Award, BookOpen, ShoppingCart, 
  Check, ChevronDown, ChevronUp, Share2, FileText
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { mockCourses } from '../data/mockData';
import { Course } from '../lib/supabase';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState<string | null>('section1');
  const { addToCart, removeFromCart, isInCart } = useCart();
  
  useEffect(() => {
    setLoading(true);
    const foundCourse = mockCourses.find(c => c.id === courseId);
    setCourse(foundCourse || null);
    setLoading(false);
  }, [courseId]);
  
  // Handle cart actions
  const handleCartAction = () => {
    if (!course) return;
    
    if (isInCart(course.id)) {
      removeFromCart(course.id);
    } else {
      addToCart(course);
    }
  };
  
  // Toggle accordion sections
  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Course not found</h2>
            <p className="text-gray-600 mb-6">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/courses" className="btn-primary">
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const courseInCart = isInCart(course.id);
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Course header */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="flex items-center space-x-2 text-sm text-primary-light mb-2">
                <span className="bg-primary-light/20 px-2 py-0.5 rounded">
                  {course.platform}
                </span>
                <span>•</span>
                <span>{course.level} Level</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold leading-tight mb-4">
                {course.title}
              </h1>
              
              <p className="text-gray-300 mb-4 md:text-lg">
                {course.description}
              </p>
              
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-3">
                  <span className="font-bold text-white">
                    {course.instructor.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">Instructor: {course.instructor}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star} 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill={star <= 4 ? "currentColor" : "none"} 
                          stroke="currentColor" 
                          className={`w-4 h-4 ${star <= 4 ? "text-yellow-400" : "text-gray-400"}`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-300 ml-2">4.0 (24 reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar size={18} className="text-primary-light" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={18} className="text-primary-light" />
                  <span>{course.level} Level</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={18} className="text-primary-light" />
                  <span>{course.platform}</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/3 flex flex-col">
              <div className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
                <img 
                  src={course.thumbnail_url} 
                  alt={course.title} 
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-bold">₦{course.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Limited seats available</div>
                  </div>
                  
                  <button
                    onClick={handleCartAction}
                    className={`w-full py-3 px-6 rounded-md flex items-center justify-center font-medium ${
                      courseInCart
                        ? 'bg-success text-white hover:bg-success/90'
                        : 'bg-primary text-white hover:bg-primary-light'
                    } transition-colors mb-3`}
                  >
                    {courseInCart ? (
                      <>
                        <Check size={18} className="mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} className="mr-2" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  
                  {courseInCart && (
                    <Link
                      to="/checkout"
                      className="w-full py-3 px-6 rounded-md bg-accent text-foreground font-medium hover:bg-accent/90 transition-colors flex items-center justify-center mb-3"
                    >
                      Proceed to Checkout
                    </Link>
                  )}
                  
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">This course includes:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Award size={16} className="mr-2 text-primary" />
                        Certificate of completion
                      </li>
                      <li className="flex items-center">
                        <BookOpen size={16} className="mr-2 text-primary" />
                        Access to all course materials
                      </li>
                      <li className="flex items-center">
                        <FileText size={16} className="mr-2 text-primary" />
                        Hands-on coding exercises
                      </li>
                      <li className="flex items-center">
                        <Share2 size={16} className="mr-2 text-primary" />
                        Lifetime access
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course content */}
      <div className="container-custom mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-4 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('curriculum')}
                  className={`pb-4 font-medium text-sm ${
                    activeTab === 'curriculum'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Curriculum
                </button>
                <button
                  onClick={() => setActiveTab('instructor')}
                  className={`pb-4 font-medium text-sm ${
                    activeTab === 'instructor'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Instructor
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-4 font-medium text-sm ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Reviews
                </button>
              </nav>
            </div>
            
            {/* Tab content */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              {/* Overview tab */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Course Overview</h2>
                  <p className="text-gray-700 mb-4">
                    This comprehensive {course.platform} course is designed to provide participants with practical, hands-on experience in {course.title.toLowerCase()}. Our curriculum is developed by industry experts and follows NBTA's proven learning methodology, combining theoretical knowledge with real-world applications.
                  </p>
                  
                  <h3 className="text-lg font-medium mt-6 mb-3">What You'll Learn</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Master the core concepts and fundamentals of {course.title.toLowerCase()}</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Develop practical skills through hands-on projects and exercises</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Learn industry best practices and current trends</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Build a professional portfolio of work</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Receive personalized feedback from expert instructors</span>
                    </li>
                  </ul>
                  
                  <h3 className="text-lg font-medium mt-6 mb-3">Course Features</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Live interactive sessions with industry experts</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Hands-on projects and real-world case studies</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Access to NBTA's learning resources and community</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Career support and job placement assistance</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>NBTA certification upon completion</span>
                    </li>
                  </ul>
                  
                  <h3 className="text-lg font-medium mt-6 mb-3">Who This Course is For</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Beginners looking to start a career in {course.title.toLowerCase()}</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Professionals seeking to upgrade their skills</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Entrepreneurs and business owners</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Students and recent graduates</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Anyone passionate about learning {course.title.toLowerCase()}</span>
                    </li>
                  </ul>
                </div>
              )}
              
              {/* Curriculum tab */}
              {activeTab === 'curriculum' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Course Curriculum</h2>
                  <p className="text-gray-700 mb-6">
                    Our {course.duration} curriculum is designed to provide both theoretical knowledge and practical skills through interactive workshops and exercises. The course is structured to ensure you gain hands-on experience and build a strong foundation in {course.title.toLowerCase()}.
                  </p>
                  
                  {/* Day 1 */}
                  <div className="border border-gray-200 rounded-md mb-4 overflow-hidden">
                    <button
                      onClick={() => toggleSection('section1')}
                      className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="font-medium">Module 1: Foundations and Core Concepts</div>
                      {expandedSection === 'section1' ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                    
                    {expandedSection === 'section1' && (
                      <div className="p-4 border-t border-gray-200">
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <Clock size={16} className="text-gray-500 mt-1 mr-3" />
                            <div>
                              <p className="font-medium">Introduction to {course.title}</p>
                              <p className="text-sm text-gray-600 mt-1">Overview of key concepts and industry standards</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Clock size={16} className="text-gray-500 mt-1 mr-3" />
                            <div>
                              <p className="font-medium">Core Principles and Best Practices</p>
                              <p className="text-sm text-gray-600 mt-1">Understanding fundamental principles and industry best practices</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Clock size={16} className="text-gray-500 mt-1 mr-3" />
                            <div>
                              <p className="font-medium">Tools and Technologies</p>
                              <p className="text-sm text-gray-600 mt-1">Introduction to essential tools and technologies</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Clock size={16} className="text-gray-500 mt-1 mr-3" />
                            <div>
                              <p className="font-medium">Practical Workshop</p>
                              <p className="text-sm text-gray-600 mt-1">Hands-on exercises and real-world applications</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* Day 2 */}
                  <div className="border border-gray-200 rounded-md mb-4 overflow-hidden">
                    <button
                      onClick={() => toggleSection('section2')}
                      className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="font-medium">Module 2: Advanced Concepts and Applications</div>
                      {expandedSection === 'section2' ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                    
                    {expandedSection === 'section2' && (
                      <div className="p-4 border-t border-gray-200">
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <Clock size={16} className="text-gray-500 mt-1 mr-3" />
                            <div>
                              <p className="font-medium">Advanced Techniques</p>
                              <p className="text-sm text-gray-600 mt-1">Deep dive into advanced concepts and methodologies</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Clock size={16} className="text-gray-500 mt-1 mr-3" />
                            <div>
                              <p className="font-medium">Industry Case Studies</p>
                              <p className="text-sm text-gray-600 mt-1">Analysis of real-world applications and success stories</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Clock size={16} className="text-gray-500 mt-1 mr-3" />
                            <div>
                              <p className="font-medium">Project Development</p>
                              <p className="text-sm text-gray-600 mt-1">Building and implementing practical projects</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Clock size={16} className="text-gray-500 mt-1 mr-3" />
                            <div>
                              <p className="font-medium">Expert Q&A Session</p>
                              <p className="text-sm text-gray-600 mt-1">Interactive session with industry experts</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* Day 3 */}
                  <div className="border border-gray-200 rounded-md mb-4 overflow-hidden">
                    <button
                      onClick={() => toggleSection('section3')}
                      className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="font-medium">Module 3: Professional Development and Career Readiness</div>
                      {expandedSection === 'section3' ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                    
                    {expandedSection === 'section3' && (
                      <div className="p-4 border-t border-gray-200">
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <Clock size={16} className="text-gray-500 mt-1 mr-3" />
                            <div>
                              <p className="font-medium">Portfolio Development</p>
                              <p className="text-sm text-gray-600 mt-1">Creating a professional portfolio of work</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Clock size={16} className="text-gray-500 mt-1 mr-3" />
                            <div>
                              <p className="font-medium">Career Guidance</p>
                              <p className="text-sm text-gray-600 mt-1">Industry insights and career path planning</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Clock size={16} className="text-gray-500 mt-1 mr-3" />
                            <div>
                              <p className="font-medium">Final Project</p>
                              <p className="text-sm text-gray-600 mt-1">Comprehensive project showcasing learned skills</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Clock size={16} className="text-gray-500 mt-1 mr-3" />
                            <div>
                              <p className="font-medium">Certification and Next Steps</p>
                              <p className="text-sm text-gray-600 mt-1">Course completion and future learning opportunities</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Instructor tab */}
              {activeTab === 'instructor' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Meet Your Instructor</h2>
                  
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                        alt={course.instructor} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">{course.instructor}</h3>
                      <p className="text-gray-600 mb-4">NBTA Certified Instructor & Industry Expert</p>
                      
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg 
                              key={star} 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24" 
                              fill={star <= 4 ? "currentColor" : "none"} 
                              stroke="currentColor" 
                              className={`w-4 h-4 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">4.0 Instructor Rating</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        {course.instructor} is a seasoned professional with extensive experience in {course.title.toLowerCase()}. 
                        As an NBTA certified instructor, {course.instructor.split(' ')[0]} brings a wealth of practical knowledge 
                        and industry insights to the training room.
                      </p>
                      
                      <p className="text-gray-700 mb-4">
                        With over 10 years of experience in the field, {course.instructor.split(' ')[0]} has trained hundreds of 
                        professionals and helped them achieve their career goals. {course.instructor.split(' ')[0]}'s teaching 
                        approach combines theoretical knowledge with practical applications, ensuring students gain real-world 
                        skills they can immediately apply in their careers.
                      </p>
                      
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Professional Background:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• NBTA Certified Instructor</li>
                          <li>• Industry Expert in {course.title.toLowerCase()}</li>
                          <li>• Professional Certifications in related fields</li>
                          <li>• Extensive project management experience</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Reviews tab */}
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Student Reviews</h2>
                    <div className="flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star} 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill={star <= 4 ? "currentColor" : "none"} 
                            stroke="currentColor" 
                            className={`w-5 h-5 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-lg font-medium ml-2">4.0</span>
                      <span className="text-sm text-gray-500 ml-1">(24 reviews)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Review 1 */}
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="font-bold text-gray-600">AO</span>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">Aisha Oladipo</h3>
                            <span className="text-gray-500 text-sm ml-2">• 1 month ago</span>
                          </div>
                          <div className="flex mt-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg 
                                key={star} 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill={star <= 5 ? "currentColor" : "none"} 
                                stroke="currentColor" 
                                className={`w-4 h-4 ${star <= 5 ? "text-yellow-400" : "text-gray-300"}`}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-gray-700">
                            The NBTA course exceeded my expectations. The instructor's expertise and the practical approach to learning made it easy to understand complex concepts. The hands-on projects were particularly valuable, and I've already started applying what I learned in my work.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Review 2 */}
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="font-bold text-gray-600">JO</span>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">James Okonkwo</h3>
                            <span className="text-gray-500 text-sm ml-2">• 2 months ago</span>
                          </div>
                          <div className="flex mt-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg 
                                key={star} 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill={star <= 4 ? "currentColor" : "none"} 
                                stroke="currentColor" 
                                className={`w-4 h-4 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-gray-700">
                            As someone new to the field, I found the NBTA course structure very helpful. The step-by-step approach and the support from instructors made learning enjoyable. The career guidance session was particularly valuable for someone like me looking to transition into this field.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Review 3 */}
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="font-bold text-gray-600">MA</span>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">Musa Abdullahi</h3>
                            <span className="text-gray-500 text-sm ml-2">• 3 months ago</span>
                          </div>
                          <div className="flex mt-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg 
                                key={star} 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill={star <= 3 ? "currentColor" : "none"} 
                                stroke="currentColor" 
                                className={`w-4 h-4 ${star <= 3 ? "text-yellow-400" : "text-gray-300"}`}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-gray-700">
                            The course content was comprehensive, but I felt some sections could have been covered in more detail. However, the instructor was very knowledgeable and always available to answer questions. The practical exercises were well-designed and helped reinforce the learning.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <button className="btn-outline">
                        Load More Reviews
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Related courses */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Related Courses</h3>
              
              <div className="space-y-4">
                {mockCourses
                  .filter(c => c.platform === course.platform && c.id !== course.id)
                  .slice(0, 3)
                  .map(relatedCourse => (
                    <Link
                      key={relatedCourse.id}
                      to={`/courses/${relatedCourse.id}`}
                      className="flex items-start group"
                    >
                      <img 
                        src={relatedCourse.thumbnail_url} 
                        alt={relatedCourse.title} 
                        className="w-16 h-16 object-cover rounded flex-shrink-0"
                      />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                          {relatedCourse.title}
                        </h4>
                        <p className="text-xs text-gray-600">{relatedCourse.instructor}</p>
                        <p className="text-sm font-semibold mt-1">₦{relatedCourse.price.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
              </div>
              
              <div className="mt-6">
                <Link 
                  to={`/courses?platform=${course.platform}`}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  View All {course.platform} Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;