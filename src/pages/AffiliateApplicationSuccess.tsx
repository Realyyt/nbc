import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  CheckCircle, 
  Mail, 
  Clock, 
  Users, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const AffiliateApplicationSuccess: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 ">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity mb-4"
          >
        
        
            <BookOpen size={32} />
            <span className="font-heading font-bold text-xl">NBTA Learning</span>
          </Link>
        </div>

        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Submitted Successfully!
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Thank you for your interest in becoming an NBTA affiliate. We've received your application and will review it carefully.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center text-blue-700 mb-2">
              <Mail className="mr-2" size={20} />
              <span className="font-semibold">Check Your Email</span>
            </div>
            <p className="text-blue-600 text-sm">
              We've sent a confirmation email with your application details. Please check your inbox (and spam folder).
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Clock className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Review Process</h3>
              <p className="text-gray-600 text-sm">
                Our team will review your application within 3-5 business days
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Mail className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Notification</h3>
              <p className="text-gray-600 text-sm">
                You'll receive an email with our decision and next steps
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Users className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Started</h3>
              <p className="text-gray-600 text-sm">
                If approved, you'll receive your unique affiliate code and dashboard access
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Reminder */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow-md p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Why Choose NBTA Affiliate Program?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-white/20 rounded-full p-2 mr-4">
                <TrendingUp size={20} />
              </div>
              <div>
                <h3 className="font-semibold mb-2">High Commission Rate</h3>
                <p className="text-white/90 text-sm">
                  Earn 10% commission on every successful course enrollment
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 rounded-full p-2 mr-4">
                <Users size={20} />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Quality Courses</h3>
                <p className="text-white/90 text-sm">
                  Promote high-quality vocational training courses with proven results
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 rounded-full p-2 mr-4">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Comprehensive Support</h3>
                <p className="text-white/90 text-sm">
                  Get marketing materials, tracking tools, and dedicated support
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 rounded-full p-2 mr-4">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Flexible Promotion</h3>
                <p className="text-white/90 text-sm">
                  Promote through your preferred channels and platforms
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            <BookOpen className="mr-2" size={20} />
            Explore Our Courses
          </Link>
          
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Contact Support
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Have questions about your application? Contact us at{' '}
            <a href="mailto:affiliates@nbta.com.ng" className="text-primary hover:text-primary-dark">
              affiliates@nbta.com.ng
            </a>
          </p>
          <p className="mt-2">
            Follow us on social media for updates and tips on becoming a successful affiliate
          </p>
        </div>
      </div>
    </div>
  );
};

export default AffiliateApplicationSuccess;
