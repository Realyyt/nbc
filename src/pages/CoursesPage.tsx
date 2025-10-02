import React, { useState, useMemo, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { Filter, Search, Loader2 } from 'lucide-react';
import { affiliateProgramsApi, type AffiliateProgram } from '../services/affiliatePrograms';

const CoursesPage: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState<AffiliateProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        const fetchedCourses = await affiliateProgramsApi.listPublic();
        setCourses(fetchedCourses);
        setError(null);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
        console.error('Error loading courses:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Filter courses based on selected filters
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const platformValue = (course.platform || 'other').toLowerCase();
      const isFree = (course.priceType || '').toLowerCase() === 'free' || course.price === 0 || course.price === 'Free';
      const matchesPlatform = selectedPlatform === 'all' || platformValue === selectedPlatform;
      const matchesPrice = priceFilter === 'all' || 
        (priceFilter === 'free' && isFree) || 
        (priceFilter === 'paid' && !isFree);
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description || '').toLowerCase().includes(searchQuery.toLowerCase());

      return matchesPlatform && matchesPrice && matchesSearch;
    });
  }, [courses, selectedPlatform, priceFilter, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Programs</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Recommended Programs</h1>
      
      {/* Filters */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full pl-10 pr-4 py-2"
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="input py-2 px-4"
        >
          <option value="all">All Platforms</option>
          <option value="udemy">Udemy</option>
          <option value="google">Google</option>
          <option value="coursera">Coursera</option>
          <option value="other">Other</option>
        </select>
        
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="input py-2 px-4"
        >
          <option value="all">All Prices</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {/* Results count */}
      <p className="text-gray-600 mb-6">
        Showing {filteredCourses.length} of {courses.length} programs
      </p>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            platform={(course.platform as any) || 'other'}
            description={course.description || ''}
            imageUrl={course.imageUrl || ''}
            affiliateLink={course.affiliateLink}
            price={typeof course.price === 'number' ? `₦${course.price.toLocaleString()}` : (course.price as string | undefined)}
            rating={course.rating}
            instructor={course.instructor}
          />
        ))}
      </div>

      {/* No results message */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <Filter size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No programs found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage; 