import React, { useState } from 'react';
import { Users, GraduationCap, BookOpen } from 'lucide-react';
import JobApplicationForm from '../components/JobApplicationForm';

const Careers = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const handleFormSubmit = async (formData: any) => {
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // For now, we'll just close the form
    setShowApplicationForm(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* New Content */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team at NBTA</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Are you passionate about transforming lives through skills and hands-on learning? We are building a community of forward-thinking professionals who are ready to inspire, equip, and empower the next generation of skilled workers, entrepreneurs, and changemakers.
          </p>
        </div>

         {/* Benefits Section */}
         <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl font-bold mb-6">Why Join NBTA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Our Culture</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Collaborative and supportive environment</li>
                <li>• Deeply community-centered approach</li>
                <li>• Healthy work-life balance</li>
                <li>• Diversity and inclusion</li>
                <li>• Continuous learning and professional development</li>
                <li>• Innovation and creative thinking to solve real-world challenges</li>
                <li>• Lasting impact in the lives of learners and communities</li>
                <li>• Culture of respect, integrity, and mutual trust</li>
                <li>• Success measured by tangible, real-world outcomes</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Benefits</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Be part of a mission-driven institution shaping Nigeria's future workforce</li>
                <li>• Collaborate with industry leaders and institutions</li>
                <li>• Influence lives through practical, impactful education</li>
                <li>• Enjoy a flexible, supportive work environment across physical and virtual platforms</li>
                <li>• Access professional development opportunities in technical and educational advancement</li>
                <li>• Flexible work arrangements</li>
                <li>• Health insurance package</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Locations Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-center text-2xl font-bold mb-8">Our Training Locations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Jalingo Location */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-xl shadow-sm border border-primary/20">
              <div className="flex items-center mb-4">
                <div className="bg-primary rounded-full p-3 mr-4">
                  <BookOpen size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Jalingo Training Center</h3>
                  <p className="text-primary font-medium">Taraba State</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  <span>Main training facility with full equipment</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  <span>Hands-on vocational skills training</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  <span>Professional instructors and mentors</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  <span>Modern workshop facilities</span>
                </div>
              </div>
            </div>

            {/* Yola Location */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-sm border border-green-200">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 rounded-full p-3 mr-4">
                  <BookOpen size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Yola Training Center</h3>
                  <p className="text-green-600 font-medium">Adamawa State</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  <span>Comprehensive skill development programs</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  <span>Specialized training workshops</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  <span>Industry-standard equipment</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  <span>Certified training programs</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Physical Training Availability</h4>
            <p className="text-blue-700">
              All hands-on training programs are conducted exclusively at our Jalingo and Yola training centers. 
              We also offer online courses for students who cannot attend physical sessions.
            </p>
          </div>
        </div>

        {/* Application Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Join Our Team?</h2>
            <p className="text-gray-600 mb-6">
              We're always looking for passionate individuals who want to make a difference in vocational education. 
              Whether you're interested in training, community management, operations, or any other role, 
              we'd love to hear from you.
            </p>
            <button 
              className="btn-primary"
              onClick={() => setShowApplicationForm(true)}
            >
              Apply Now
            </button>
          </div>
        </div>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Build the Future Together</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At NBTA, we don't just teach skills—we build futures. Join us in creating a workforce that is resilient, relevant, and ready for the world.
          </p>
        </div>
       
      </div>

      {showApplicationForm && (
        <JobApplicationForm
          onClose={() => setShowApplicationForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default Careers; 