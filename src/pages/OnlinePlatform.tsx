import React, { useState } from 'react';
import { courses } from '../data/courses';
import CourseCard from '../components/ProgramCard';

const PRICE_TYPES = [
  { label: 'All', value: 'all' },
  { label: 'Free', value: 'free' },
  { label: 'Paid', value: 'paid' },
  { label: 'Sponsorship', value: 'sponsorship' },
];

const OnlinePlatform = () => {
  const [selectedPriceType, setSelectedPriceType] = useState('all');

  const filteredCourses = courses.filter(
    (course) =>
      course.mode === 'online' &&
      (selectedPriceType === 'all' || course.priceType === selectedPriceType)
  );

  return (
    <div className="container-custom pt-24 pb-16">
      <h1 className="text-3xl font-bold mb-8">Online Platform Courses</h1>
      <div className="flex gap-4 mb-10">
        {PRICE_TYPES.map((type) => (
          <button
            key={type.value}
            className={`px-5 py-2 rounded-full font-medium border transition-all ${
              selectedPriceType === type.value
                ? 'bg-accent text-white border-accent'
                : 'bg-white text-accent border-gray-200 hover:bg-accent/10'
            }`}
            onClick={() => setSelectedPriceType(type.value)}
          >
            {type.label}
          </button>
        ))}
      </div>
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
  );
};

export default OnlinePlatform; 