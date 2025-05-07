import React from 'react';
import { Program } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const { addToCart, removeFromCart, isInCart } = useCart();

  if (!program) {
    return null;
  }

  const handleCartAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInCart(program.id)) {
      removeFromCart(program.id);
    } else {
      addToCart(program);
    }
  };

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
    <Link to={`/register/${program.id}`} className="block">
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
            <span className="text-primary font-medium">₦{program.price.toLocaleString()}</span>
            <span className="text-sm text-gray-500">{program.duration}</span>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span>{program.instructor}</span>
            <span className="mx-2">•</span>
            <span className="capitalize">{program.level}</span>
          </div>
          <button
            onClick={handleCartAction}
            className={`mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
              isInCart(program.id)
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
          >
            {isInCart(program.id) ? (
              <>
                <Check size={20} />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProgramCard;