import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
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

const Courses = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get('search') || '';

  const [selectedMode, setSelectedMode] = useState('physical');
  const [selectedPriceType, setSelectedPriceType] = useState('paid');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

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
    // Update URL to reflect search
    const params = new URLSearchParams(location.search);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            Available Courses
          </h1>
          <p className="mt-2 text-gray-600">
            Browse our selection of professional training programs
          </p>
        </div>

        {/* Search and filter row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <form onSubmit={handleSearch} className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 rounded-l-md text-gray-800 focus:outline-none"
              />
              <Search size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
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
              No courses found for this selection.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;