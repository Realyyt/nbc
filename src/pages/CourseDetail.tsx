import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { mockPrograms } from '../data/mockData';
import { Program } from '../lib/supabase';

const ProgramDetail = () => {
  const { id: programId } = useParams<{ id: string }>();
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [program, setProgram] = useState<Program | null>(null);

  useEffect(() => {
    const foundProgram = mockPrograms.find(p => p.id === programId);
    setProgram(foundProgram || null);
  }, [programId]);

  if (!program) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Program Not Found</h2>
          <p className="mt-4 text-gray-600">The program you're looking for doesn't exist or has been removed.</p>
          <Link to="/programs" className="btn-primary mt-8">
            Browse Programs
          </Link>
        </div>
      </div>
    );
  }

  const handleCartAction = () => {
    if (isInCart(program.id)) {
      removeFromCart(program.id);
    } else {
      addToCart(program);
    }
  };

  return (
    <div className="container-custom py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Program Image and Basic Info */}
        <div className="lg:col-span-2">
          <img
            src={program.thumbnail_url}
            alt={program.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
          <div className="mt-8">
            <h1 className="text-3xl font-bold text-gray-900">{program.title}</h1>
            <p className="mt-4 text-lg text-gray-700">{program.description}</p>
          </div>

          {/* Program Details */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Program Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900">Duration</h3>
                <p className="text-gray-600">{program.duration}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900">Level</h3>
                <p className="text-gray-600 capitalize">{program.level}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900">Platform</h3>
                <p className="text-gray-600">{program.platform}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900">Instructor</h3>
                <p className="text-gray-600">{program.instructor}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing and Action Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">₦{program.price.toLocaleString()}</h2>
                <div className="mt-4">
                  <button
                    onClick={handleCartAction}
                    className={`w-full py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors ${
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

              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-2">What's Included:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2">✓</span>
                    Full program access
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2">✓</span>
                    Mentor support
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2">✓</span>
                    Practice materials
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2">✓</span>
                    Certificate upon completion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Programs */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-8">Related Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPrograms
            .filter(p => p.level === program.level && p.id !== program.id)
            .slice(0, 3)
            .map(relatedProgram => (
              <Link
                key={relatedProgram.id}
                to={`/programs/${relatedProgram.id}`}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-shadow hover:shadow-md">
                  <img
                    src={relatedProgram.thumbnail_url}
                    alt={relatedProgram.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {relatedProgram.title}
                    </h3>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                      {relatedProgram.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-primary font-medium">
                        ₦{relatedProgram.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">{relatedProgram.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to={`/programs?platform=${program.platform}`}
            className="btn-outline inline-block"
          >
            View All {program.platform} Programs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;