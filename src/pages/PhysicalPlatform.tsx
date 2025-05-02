import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { courses } from '../data/courses';

const PRICE_TYPES = [
  { label: 'Free', value: 'free' },
  { label: 'Paid', value: 'paid' },
  { label: 'Sponsorship', value: 'sponsorship' },
];

const HERO_QUOTES = [
  {
    title: "Build Your Future With Gold Standard Skills!",
    text: "Join the NBTA Global Gold Platform — where hands-on experience meets expert mentorship. Through physical dual apprenticeship, face-to-face guidance, and real-world simulation, we don't just teach skills — we shape futures."
  },
  {
    title: "Learn by Doing. Grow by Mentorship. Succeed by Design.",
    text: "At NBTA Global Gold Platform, we bring your career dreams to life through immersive, on-the-job training, expert handholding, and life-changing apprenticeship. This is more than learning — it's transformation."
  }
];

const PhysicalPlatform = () => {
  const [selectedPriceType, setSelectedPriceType] = useState('paid');
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % HERO_QUOTES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.mode === 'physical' &&
      course.priceType === selectedPriceType
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 mb-10">
      <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4 text-center">
          NBTA Global Gold Platform Courses
        </h1>
        <div className="container-custom max-w-3xl mx-auto text-center">
          <div className="transition-all duration-700">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4 animate-fade-in">
              {HERO_QUOTES[currentQuote].title}
            </h1>
            <p className="text-lg text-gray-700 animate-fade-in">
              {HERO_QUOTES[currentQuote].text}
            </p>
          </div>
        </div>
      </section>
      <div className="container-custom">
      
        <div className="flex gap-4 justify-center mb-10">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
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

export default PhysicalPlatform; 