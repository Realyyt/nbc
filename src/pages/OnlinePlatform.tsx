import React, { useState, useEffect } from 'react';
import ProgramCard from '../components/ProgramCard';
import { Program } from '../lib/supabase';
import { programService } from '../services/programService';

const PRICE_TYPES = [
  { label: 'Free', value: 'free' },
  { label: 'Paid', value: 'paid' },
  { label: 'Sponsorship', value: 'sponsorship' },
];

const HERO_QUOTES = [
  {
    title: 'Anywhere. Anytime. Your Future Starts Online.',
    text: "With NBTA's Virtual Platform, access world-class mentors, interactive learning, and flexible training — all from the comfort of your device. It's not just online learning — it's a digital gateway to your dreams."
  },
  {
    title: 'Plug into Possibility with NBTA Online!',
    text: 'Learn on your terms with flexible, internet-based training, real-time mentorship, and a digital system built for your success. Wherever you are, we bring the skills to you.'
  }
];

const OnlinePlatform = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPriceType, setSelectedPriceType] = useState('paid');
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await programService.getPrograms();
        setPrograms(data.filter(program => program.mode === 'online'));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch programs');
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % HERO_QUOTES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const filteredPrograms = programs.filter(program => 
    selectedLevel === 'all' || program.level === selectedLevel
  );

  const filteredCourses = filteredPrograms.filter(
    (program) => program.priceType === selectedPriceType
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-100 to-yellow-50 py-12 mb-10">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4 text-center">
          Online Platform Programs
        </h1>
        <div className="container-custom max-w-3xl mx-auto text-center">
          <div className="transition-all duration-700">
            <h1 className="text-2xl md:text-3xl font-bold text-yellow-800 mb-4 animate-fade-in">
              {HERO_QUOTES[currentQuote].title}
            </h1>
            <p className="text-lg text-gray-700 animate-fade-in">
              {HERO_QUOTES[currentQuote].text}
            </p>
          </div>
        </div>
      </section>
      
      <div className="container-custom">
        <div className="space-y-6">
          {/* Level Filter */}
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Price Filter */}
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

          {/* Program Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12">
                No programs found for this selection.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlinePlatform; 