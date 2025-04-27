import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, Globe, BookOpen, Building, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About NBTA</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering business travel professionals through expert-led physical training and community-driven learning.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Users size={40} className="text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">10K+</h3>
            <p className="text-gray-600">Trained Professionals</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Award size={40} className="text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">50+</h3>
            <p className="text-gray-600">Expert Instructors</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Building size={40} className="text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">5</h3>
            <p className="text-gray-600">Training Centers</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <GraduationCap size={40} className="text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">100+</h3>
            <p className="text-gray-600">Certification Programs</p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <p className="text-gray-600 text-lg mb-8">
            At NBTA, we believe in the power of face-to-face learning and community engagement. Our mission is to provide high-quality physical training programs that equip business travel professionals with the skills and knowledge they need to excel in their careers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">What We Do</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Conduct expert-led physical training sessions</li>
                <li>• Provide hands-on practical experience</li>
                <li>• Offer industry-recognized certifications</li>
                <li>• Facilitate networking opportunities</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Our Values</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Excellence in training delivery</li>
                <li>• Community building</li>
                <li>• Professional development</li>
                <li>• Industry leadership</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Training Centers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Training Centers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Lagos Center" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Lagos Center</h3>
              <p className="text-gray-600">Our flagship training center in Lagos, offering comprehensive programs and state-of-the-art facilities.</p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Abuja Center" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Abuja Center</h3>
              <p className="text-gray-600">Modern training facility in the capital city, focusing on government and corporate training programs.</p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Port Harcourt Center" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Port Harcourt Center</h3>
              <p className="text-gray-600">Specialized center for oil and gas industry training programs.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Become part of our growing community of business travel professionals. Attend our physical training sessions and connect with industry experts.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/courses" className="btn-primary">
              View Training Programs
            </Link>
            <Link to="/community" className="btn-outline">
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 