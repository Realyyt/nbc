import { Link } from 'react-router-dom';
import { BookOpen, Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 flex items-center">
      <div className="container-custom text-center">
        <div className="flex justify-center mb-6">
          <BookOpen size={64} className="text-primary" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn-primary flex items-center">
            <Home size={18} className="mr-2" />
            Go to Homepage
          </Link>
          
          <Link to="/courses" className="btn-outline flex items-center">
            <Search size={18} className="mr-2" />
            Browse Programs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;