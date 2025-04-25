import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { Course } from '../contexts/CartContext';
import { mockCourses, categories } from '../data/mockData';

const Courses = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get('search') || '';
  const initialCategory = queryParams.get('category') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState('default');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Apply filters and sorting to courses
  useEffect(() => {
    let filtered = [...mockCourses];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(course => 
        course.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(course => 
      course.price >= priceRange[0] && course.price <= priceRange[1]
    );
    
    // Apply sorting
    if (sortBy === 'price-low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-a-z') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'name-z-a') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, priceRange, sortBy]);
  
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
    setSelectedCategory(category === selectedCategory ? '' : category);
    
    // Update URL to reflect category
    const params = new URLSearchParams(location.search);
    if (category && category !== selectedCategory) {
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
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input pr-10 appearance-none w-full"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
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
              
              {/* Categories filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <button
                        onClick={() => handleCategoryChange(category.name)}
                        className={`flex items-center text-sm ${
                          selectedCategory === category.name 
                            ? 'font-medium text-primary' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="ml-1 text-xs text-gray-500">({category.count})</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price range filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="5000"
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
              
              {/* Clear filters button */}
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setPriceRange([0, 100000]);
                  setSortBy('default');
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
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
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
                    setSelectedCategory('');
                    setPriceRange([0, 100000]);
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