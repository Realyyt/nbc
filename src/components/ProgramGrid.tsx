import React from 'react';
import { useState, useEffect } from 'react';
import { programService } from '../services/programService';
import ProgramCard from './ProgramCard';

interface Program {
  id: string;
  title: string;
  description: string;
  price: number;
  platform: string;
  platform_course_id: string;
  thumbnail_url: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
  mode: 'online' | 'physical' | 'hybrid';
  priceType: 'paid' | 'free' | 'sponsorship';
}


export default function ProgramGrid() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await programService.getPrograms();
        setPrograms(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch programs');
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) return <div>Loading programs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
} 