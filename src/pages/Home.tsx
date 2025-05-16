import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, BookOpen, Award, Users, MapPin, Calendar, ChevronRight } from 'lucide-react';
import CourseCard from '../components/ProgramCard';
import { courses } from '../data/courses';

const MODES = [
  { label: 'Physical', value: 'physical' },
  { label: 'Online', value: 'online' },
  { label: 'Hybrid', value: 'hybrid' },
];
const PRICE_TYPES = [
  { label: 'Free', value: 'free' },
  { label: 'Paid', value: 'paid' },
  { label: 'Sponsorship', value: 'sponsorship' },
];

const Home = () => {
  const [selectedMode, setSelectedMode] = useState('physical');
  const [selectedPriceType, setSelectedPriceType] = useState('paid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(
    (course) =>
      course.mode === selectedMode &&
      course.priceType === selectedPriceType &&
      (searchQuery.trim() === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary pt-24 pb-16 md:pb-24 text-white">
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-1 mb-10 md:mb-0 md:pr-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight animate-fade-in text-center">
                Turn Your Passion into a Profession with NBTA!
              </h1>
              <p className="mt-4 text-lg text-gray-100 md:text-xl max-w-xl animate-slide-up mx-auto text-center">
                Step into your future with NBTA's world-class training platforms  whether on-site, online, or hybrid. Learn from expert mentors, master in-demand trades, and build a career you'll love. Your journey to greatness starts here!
              </p>
              <form onSubmit={handleSearch} className="mt-8 flex animate-slide-up">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search for programs..."
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
                <Link to="/programs" className="btn-outline bg-white/10 text-white border-white hover:bg-white hover:text-primary transition-all">
                  Browse All Programs
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Online Learning"
                  className="rounded-lg shadow-xl animate-fade-in"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg animate-slide-up">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-success/20 p-2">
                      <Award size={24} className="text-success" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium text-sm">Certified Training</p>
                      <p className="text-gray-500 text-xs">Expert Instructors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="container-custom mt-16">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 w-40 md:w-48 text-center flex flex-col items-center">
              <p className="text-xl md:text-2xl font-bold">100+</p>
              <p className="text-xs md:text-sm text-gray-200">Programs Available</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 w-40 md:w-48 text-center flex flex-col items-center">
              <p className="text-xl md:text-2xl font-bold">10+</p>
              <p className="text-xs md:text-sm text-gray-200">Institutions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 w-40 md:w-48 text-center flex flex-col items-center">
              <p className="text-xl md:text-2xl font-bold">50+</p>
              <p className="text-xs md:text-sm text-gray-200">Real-Life Training Workshops</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 w-40 md:w-48 text-center flex flex-col items-center">
              <p className="text-xl md:text-2xl font-bold">100+</p>
              <p className="text-xs md:text-sm text-gray-200">Instructors/Master Craftsmen</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 w-40 md:w-48 text-center flex flex-col items-center">
              <p className="text-xl md:text-2xl font-bold">98%</p>
              <p className="text-xs md:text-sm text-gray-200">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* NBTA Learning Platforms Section */}
      <section className="py-10 bg-white">
        <div className="container-custom">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-center mb-8 text-foreground tracking-tight">
            NBTA LEARNING PLATFORMS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Physical Platform */}
            <Link to="/platforms/physical" className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-primary group">
              <h3 className="font-bold text-lg mb-2 text-primary group-hover:underline">Physical Platform</h3>
              <p className="text-gray-700 mb-6">Physical dual apprenticeship, Face to face, on-the-job, handholding, mentorship, and simulation-based.</p>
              <div className="flex gap-3 mt-auto">
              </div>
            </Link>
            {/* Online/Virtual Platform */}
            <Link to="/platforms/online" className="rounded-xl border border-yellow-200 bg-yellow-50 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 group">
              <h3 className="font-bold text-lg mb-2 text-yellow-800 group-hover:underline">Online Platform</h3>
              <p className="text-gray-700 mb-6">Digital system, internet with mentors, remote, flexible, internet based.</p>
              <div className="flex gap-3 mt-auto">
                </div>
            </Link>
            {/* Hybrid Platform */}
            <Link to="/platforms/hybrid" className="rounded-xl border border-gray-300 bg-gray-100 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-400 group">
              <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:underline">Hybrid Platform</h3>
              <p className="text-gray-700 mb-6">Mix of physical and online/virtual platform with assigned mentors.</p>
              <div className="flex gap-3 mt-auto">
                </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Course Mode Tabs & PriceType Filters */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                Explore Our Programs
              </h2>
              <p className="mt-2 text-gray-600">
                Filter by learning mode and payment type
              </p>
            </div>
            <form onSubmit={handleSearch} className="mt-4 md:mt-0 flex animate-slide-up">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search for programs..."
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
          </div>

          {/* Tabs for Mode */}
          <div className="flex gap-4 mb-6">
            {MODES.map((mode) => (
              <button
                key={mode.value}
                className={`px-6 py-2 rounded-full font-medium border transition-all ${selectedMode === mode.value ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-gray-200 hover:bg-primary/10'}`}
                onClick={() => setSelectedMode(mode.value)}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Filters for PriceType */}
          <div className="flex gap-4 mb-10">
            {PRICE_TYPES.map((type) => (
              <button
                key={type.value}
                className={`px-5 py-2 rounded-full font-medium border transition-all ${selectedPriceType === type.value ? 'bg-accent text-white border-accent' : 'bg-white text-accent border-gray-200 hover:bg-accent/10'}`}
                onClick={() => setSelectedPriceType(type.value)}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} program={course} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12">
                No programs found for this selection.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How NBTA Programs Work section (world-class, visual) */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-10 text-center">
            How NBTA Programs Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-gray-50 rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Choose a Program</h3>
              <ul className="text-gray-700 text-base space-y-2 text-left">
                <li>Browse our program catalog and select a program that fits your interest and preferred learning format:</li>
                <ul className="pl-5 space-y-1">
                  <li><span className="font-bold text-primary">Physical:</span> Attend in-person classes at our approved training centers.</li>
                  <li><span className="font-bold text-primary">Online:</span> Learn from anywhere through our interactive digital platform.</li>
                  <li><span className="font-bold text-primary">Hybrid:</span> Combine the flexibility of online learning with occasional in-person workshops.</li>
                </ul>
              </ul>
            </div>
            {/* Step 2 */}
            <div className="bg-gray-50 rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 mb-4">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-accent">Register & Pay</h3>
              <ul className="text-gray-700 text-base space-y-2 text-left">
                <li>Complete the registration form for your chosen Program.</li>
                <li>Make payment securely through our online portal or make a transfer to NBTA's Access Bank account-1876883058, and submit proof of payment at any of our approved centres or email to wecanhelp@nbta.com.ng.</li>
                <li>Once registered, you'll be assigned a dedicated mentor or instructor to guide you through your learning journey, provide feedback, and answer your questions.</li>
                <li>For <span className="font-bold text-accent">physical and hybrid</span> learners, you'll be linked to a nearby partner school or workshop center for hands-on training and assessments.</li>
                <li>Online students may also be invited to optional practical sessions based on program, availability and location.</li>
              </ul>
            </div>
            {/* Step 3 */}
            <div className="bg-gray-50 rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-success/10 mb-4">
                <span className="text-2xl font-bold text-success">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-success">Start Learning</h3>
              <ul className="text-gray-700 text-base space-y-2 text-left">
                <li>Begin your program on your chosen platform.</li>
                <li>Access structured lessons, resources, assignments, and support from your mentor or instructor.</li>
                <li>Engage in assessments and practical sessions as part of your training path.</li>
              </ul>
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
                  <Link to="/programs/customs-clearing" className="btn-primary">
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
                  <Link to="/programs/export-documentation" className="btn-primary">
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/programs" className="btn-outline inline-block">
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
              <Link to="/programs" className="btn-accent text-foreground font-medium">
                Browse Programs
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