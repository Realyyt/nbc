import React, { useState, useEffect } from 'react';
import ProgramCard from '../components/ProgramCard';
import { Program } from '../lib/supabase';
import { programService } from '../services/programService';

const HybridPlatform = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState('all');

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await programService.getPrograms();
        setPrograms(data.filter(program => program.mode === 'hybrid'));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch programs');
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const filteredPrograms = programs.filter(program => 
    selectedLevel === 'all' || program.level === selectedLevel
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
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Hybrid Programs</h1>
      
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

        {/* Program Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
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
  );
};

export default HybridPlatform; 