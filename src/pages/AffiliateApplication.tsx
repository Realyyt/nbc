import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Users, 
  MessageSquare, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { affiliateService } from '../services/affiliateService';
import { AffiliateApplication } from '../types';

const AffiliateApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    website: '',
    audienceSize: '',
    audienceDescription: '',
    motivation: '',
    socialMediaHandles: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: ''
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialPlatform = name.replace('social_', '');
      setFormData(prev => ({
        ...prev,
        socialMediaHandles: {
          ...prev.socialMediaHandles,
          [socialPlatform]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.phone || !formData.audienceDescription || !formData.motivation) {
        throw new Error('Please fill in all required fields');
      }

      if (!formData.audienceSize || parseInt(formData.audienceSize) < 100) {
        throw new Error('Audience size must be at least 100');
      }

      const applicationData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        website: formData.website || undefined,
        audienceSize: parseInt(formData.audienceSize),
        audienceDescription: formData.audienceDescription,
        motivation: formData.motivation,
        socialMediaHandles: Object.fromEntries(
          Object.entries(formData.socialMediaHandles).filter(([_, value]) => value.trim() !== '')
        )
      };

      await affiliateService.submitApplication(applicationData);
      setSuccess(true);
      
      // Redirect to success page after 3 seconds
      setTimeout(() => {
        navigate('/affiliate-application-success');
      }, 3000);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to submit application. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 ">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in becoming an NBTA affiliate. We'll review your application and get back to you within 3-5 business days.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity mb-4"
          >
            <BookOpen size={32} />
            <span className="font-heading font-bold text-xl">NBTA Learning</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Become an NBTA Affiliate
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our affiliate program and earn commissions by promoting our quality vocational training courses. 
            Help others discover their potential while building your income.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Become an NBTA Affiliate?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold text-lg">10%</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Earn 10% Commission</h3>
              <p className="text-gray-600 text-sm">Get 10% commission on every successful course enrollment</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Users className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Help Others Succeed</h3>
              <p className="text-gray-600 text-sm">Connect people with life-changing vocational skills</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Globe className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Flexible Promotion</h3>
              <p className="text-gray-600 text-sm">Promote through your preferred channels and platforms</p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Affiliate Application</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center text-red-600">
              <AlertCircle size={18} className="mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="input pl-10 w-full"
                    placeholder="John Doe"
                  />
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input pl-10 w-full"
                    placeholder="john@example.com"
                  />
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input pl-10 w-full"
                    placeholder="+234 801 234 5678"
                  />
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website (Optional)
                </label>
                <div className="relative">
                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="input pl-10 w-full"
                    placeholder="https://yourwebsite.com"
                  />
                  <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Audience Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="audienceSize" className="block text-sm font-medium text-gray-700 mb-1">
                  Audience Size *
                </label>
                <div className="relative">
                  <input
                    id="audienceSize"
                    name="audienceSize"
                    type="number"
                    required
                    min="100"
                    value={formData.audienceSize}
                    onChange={handleInputChange}
                    className="input pl-10 w-full"
                    placeholder="1000"
                  />
                  <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum 100 followers/subscribers</p>
              </div>

              <div>
                <label htmlFor="audienceDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Describe Your Audience *
                </label>
                <textarea
                  id="audienceDescription"
                  name="audienceDescription"
                  required
                  value={formData.audienceDescription}
                  onChange={handleInputChange}
                  className="input w-full h-20 resize-none"
                  placeholder="e.g., Young professionals interested in career development, students looking for practical skills..."
                />
              </div>
            </div>

            {/* Social Media Handles */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Social Media Handles (Optional)
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    name="social_facebook"
                    type="text"
                    value={formData.socialMediaHandles.facebook}
                    onChange={handleInputChange}
                    className="input pl-10 w-full"
                    placeholder="Facebook username"
                  />
                  <Facebook size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative">
                  <input
                    name="social_instagram"
                    type="text"
                    value={formData.socialMediaHandles.instagram}
                    onChange={handleInputChange}
                    className="input pl-10 w-full"
                    placeholder="Instagram username"
                  />
                  <Instagram size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative">
                  <input
                    name="social_twitter"
                    type="text"
                    value={formData.socialMediaHandles.twitter}
                    onChange={handleInputChange}
                    className="input pl-10 w-full"
                    placeholder="Twitter username"
                  />
                  <Twitter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative">
                  <input
                    name="social_linkedin"
                    type="text"
                    value={formData.socialMediaHandles.linkedin}
                    onChange={handleInputChange}
                    className="input pl-10 w-full"
                    placeholder="LinkedIn profile URL"
                  />
                  <Linkedin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative md:col-span-2">
                  <input
                    name="social_youtube"
                    type="text"
                    value={formData.socialMediaHandles.youtube}
                    onChange={handleInputChange}
                    className="input pl-10 w-full"
                    placeholder="YouTube channel URL"
                  />
                  <Youtube size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Motivation */}
            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
                Why do you want to become an NBTA affiliate? *
              </label>
              <textarea
                id="motivation"
                name="motivation"
                required
                value={formData.motivation}
                onChange={handleInputChange}
                className="input w-full h-24 resize-none"
                placeholder="Tell us about your motivation, how you plan to promote our courses, and why you think you'd be a great affiliate partner..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-6">
              <Link
                to="/"
                className="text-primary hover:text-primary-dark font-medium"
              >
                ← Back to Home
              </Link>
              
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <MessageSquare className="-ml-1 mr-3 h-5 w-5" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AffiliateApplicationPage;
