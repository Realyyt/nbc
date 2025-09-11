import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTotalFee, formatCurrency, LEVEL_TO_DURATION } from '../data/nbcPricing';

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

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  if (!program) {
    return null;
  }

  const navigate = useNavigate();
  const [showChooser, setShowChooser] = useState(false);
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'udemy':
        return '🎓';
      case 'coursera':
        return '📚';
      case 'edx':
        return '🎯';
      default:
        return '📖';
    }
  };

  const getLevelBadge = (level: 'beginner' | 'intermediate' | 'advanced') => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[level]}`}>
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </span>
    );
  };

  return (
    <div className="block">
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <img
          src={program.thumbnail_url}
          alt={program.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{program.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{program.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{program.duration}</span>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span>{program.instructor}</span>
            <span className="mx-2">•</span>
            <span className="capitalize">{program.level}</span>
          </div>
          <button
            type="button"
            className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
            onClick={() => setShowChooser((s) => !s)}
          >
            Register
          </button>
          {showChooser && (
            <div className="mt-4 border rounded-md p-3 bg-gray-50">
              {program.mode === 'physical' ? (
                <>
                  <div className="flex flex-wrap gap-3">
                    {(['beginner','intermediate','advanced'] as const).map((lvl) => (
                      <label key={lvl} className="inline-flex items-center">
                        <input
                          type="radio"
                          name={`level-${program.id}`}
                          value={lvl}
                          checked={level === lvl}
                          onChange={() => setLevel(lvl)}
                          className="form-radio"
                        />
                        <span className="ml-2 capitalize">{lvl} ({LEVEL_TO_DURATION[lvl]})</span>
                      </label>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-y-1 text-sm mt-3">
                    <span className="font-medium">Total</span>
                    <span className="text-right font-semibold">{formatCurrency(getTotalFee(level))}</span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-600">You will confirm options on the next step.</p>
              )}
              <button
                type="button"
                className="mt-3 w-full py-2 px-4 rounded-md bg-accent text-white hover:bg-accent/90"
                onClick={() => navigate(`/register/${program.id}`)}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;