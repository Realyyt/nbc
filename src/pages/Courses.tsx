import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Filter, ChevronDown, ArrowUpDown, DollarSign, BookOpen } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { Course } from '../lib/supabase';
import { courseService } from '../services/courseService';
import { mockCourses } from '../data/mockData';

interface Category {
  id: string;
  name: string;
  count: number;
}

const Courses = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get('search') || '';
  const initialCategory = queryParams.get('category') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState<'price' | 'title'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories: Category[] = [
    { id: 'all', name: 'All Categories', count: 0 },
    { id: 'beginner', name: 'Beginner', count: 0 },
    { id: 'intermediate', name: 'Intermediate', count: 0 },
    { id: 'advanced', name: 'Advanced', count: 0 }
  ];

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Use mockCourses directly instead of fetching
        console.log('Using mock courses:', mockCourses);
        setCourses(mockCourses);
        setFilteredCourses(mockCourses);
        
        // Update category counts
        categories.forEach(category => {
          if (category.id !== 'all') {
            category.count = mockCourses.filter(course => course.level === category.id).length;
          }
        });
      } catch (err) {
        console.error('Error setting up courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...courses];
    console.log('Applying filters to courses:', result);

    // Apply search filter
    if (searchQuery) {
      result = result.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(course => course.level === selectedCategory);
    }

    // Apply price range filter
    result = result.filter(course =>
      course.price >= priceRange[0] && course.price <= priceRange[1]
    );

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      } else {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
    });

    console.log('Filtered courses:', result);
    setFilteredCourses(result);
  }, [courses, searchQuery, sortBy, sortOrder, priceRange, selectedCategory]);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL to reflect search
    const params = new URLSearchParams(location.search);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    
    window.history.replaceState(
      {},
      '',
      `${location.pathname}?${params.toString()}`
    );
  };
  
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    // Update URL to reflect category
    const params = new URLSearchParams(location.search);
    if (category && category !== 'all') {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    
    window.history.replaceState(
      {},
      '',
      `${location.pathname}?${params.toString()}`
    );
  };
  
  // Handle price range change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  
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
                className="input pl-10 pr-4 py-2 w-full md:w-80"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary text-sm font-medium">
                Search
              </button>
            </div>
          </form>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 md:hidden btn-outline"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
            
            <div className="relative inline-block w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="input pr-10 appearance-none w-full"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} {category.count > 0 ? `(${category.count})` : ''}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter sidebar */}
          <div className={`md:w-64 md:block ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Filters</h2>
              
              {/* Price range filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₦0</span>
                    <span>₦{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Sort by */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Sort by</h3>
                <div className="space-y-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'price' | 'title')}
                    className="input pr-10 appearance-none w-full"
                  >
                    <option value="title">Title</option>
                    <option value="price">Price</option>
                  </select>
                </div>
              </div>
              
              {/* Sort order */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Sort order</h3>
                <div className="space-y-2">
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="input pr-10 appearance-none w-full"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
              
              {/* Clear filters button */}
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 100000]);
                  setSortBy('title');
                  setSortOrder('asc');
                  // Clear URL params
                  window.history.replaceState({}, '', location.pathname);
                }}
                className="text-sm text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
          
          {/* Courses grid */}
          <div className="flex-1">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => {
                  console.log('Rendering course:', course);
                  return <CourseCard key={course.id} course={course} />;
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-lg font-medium text-gray-800 mb-2">No courses found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setPriceRange([0, 100000]);
                    setSortBy('title');
                    setSortOrder('asc');
                    // Clear URL params
                    window.history.replaceState({}, '', location.pathname);
                  }}
                  className="btn-primary"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Course request CTA */}
        <div className="mt-16 bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Don't see what you're looking for?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We can create custom training programs tailored to your organization's specific needs.
            Contact us to discuss your requirements.
          </p>
          <Link to="/contact" className="btn-primary">
            Request Custom Training
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Courses;