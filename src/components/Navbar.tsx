import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X, Search, ShoppingCart, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  // Check if the navbar should be transparent (only on homepage)
  const isHomepage = location.pathname === '/';

  // Handle scroll effect for transparent navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  // Navbar background class based on scroll and current page
  const navbarBgClass = isHomepage
    ? isScrolled
      ? 'bg-white shadow-md'
      : 'bg-transparent'
    : 'bg-white shadow-md';

  // Text color class based on scroll and current page
  const textColorClass = isHomepage && !isScrolled ? 'text-white' : 'text-foreground';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarBgClass}`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className={`flex items-center space-x-2 ${textColorClass} hover:opacity-80 transition-opacity`}
          >
            <img src="/logo.png" alt="NBTA Logo" className="w-20 h-10" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex-1 flex justify-center">
              <form onSubmit={handleSearchSubmit} className="w-full max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for programs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input w-full pl-10 pr-4 py-2 text-sm"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </form>
            </div>
            
            <Link 
              to="/" 
              className={`${textColorClass} text-sm font-medium hover:text-primary transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className={`${textColorClass} text-sm font-medium hover:text-primary transition-colors`}
            >
              Programs
            </Link>
            <Link 
              to="/affiliate-courses" 
              className={`${textColorClass} text-sm font-medium hover:text-primary transition-colors`}
            >
              Affiliate Courses
            </Link>
            <Link 
              to="/affiliate-application" 
              className={`${textColorClass} text-sm font-medium hover:text-primary transition-colors`}
            >
              Become an Affiliate
            </Link>
            <Link 
              to="/Partnerships" 
              className={`${textColorClass} text-sm font-medium hover:text-primary transition-colors`}
            >
              Patnerships
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-1 text-sm font-medium text-primary">
                  <User size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/checkout" className="relative">
                  <ShoppingCart size={20} className="text-primary" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-xs font-semibold h-5 w-5 flex items-center justify-center rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/checkout" className="relative mr-4">
              <ShoppingCart size={20} className="text-primary" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-xs font-semibold h-5 w-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${textColorClass} p-2 rounded-md focus:outline-none`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-white ${isMenuOpen ? 'block' : 'hidden'} shadow-md`}>
        <div className="container-custom py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input w-full pl-10 pr-4 py-2 text-sm"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </form>
          
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-foreground text-base font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className="text-foreground text-base font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Programs
            </Link>
            <Link 
              to="/affiliate-courses" 
              className="text-foreground text-base font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Affiliate Courses
            </Link>
            <Link 
              to="/affiliate-application" 
              className="text-foreground text-base font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Become an Affiliate
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-foreground text-base font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-foreground text-base font-medium hover:text-primary"
                >
                  Log out
                </button>
              </>
            ) : (
              <div className="space-y-3 pt-2">
                
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;