import React from 'react';
import { Link } from 'react-router-dom';

const Partnerships = () => {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Partnerships</h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Join our network of partners and help shape the future of tech education and employment.
        </p>

        {/* Employers Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Employers</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Hire Our Graduates</h3>
            <p className="text-gray-600 mb-6">
              Partner with us to access a pool of skilled tech professionals. Our graduates are trained
              with industry-relevant skills and are ready to contribute to your organization.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Access to pre-screened, qualified candidates</li>
              <li>Industry-aligned curriculum</li>
              <li>Customized hiring solutions</li>
              <li>Ongoing support and training</li>
            </ul>
            <Link
              to="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Become an Employer Partner
            </Link>
          </div>
        </div>

        {/* Training Centers Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Training Workshops/Centers</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Expand Your Training Network</h3>
            <p className="text-gray-600 mb-6">
              Join our network of training partners and help us reach more aspiring tech professionals
              across different regions.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Access to our curriculum and resources</li>
              <li>Quality assurance support</li>
              <li>Marketing and student recruitment assistance</li>
              <li>Professional development opportunities</li>
            </ul>
            <Link
              to="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Become a Training Partner
            </Link>
          </div>
        </div>

        {/* Other Partners Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Other Partners</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4">General Partnerships</h3>
            <p className="text-gray-600 mb-6">
              We welcome partnerships with organizations that share our vision of making tech education
              accessible and impactful.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Technology providers</li>
              <li>Educational institutions</li>
              <li>Non-profit organizations</li>
              <li>Industry associations</li>
            </ul>
            <Link
              to="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Partnership Opportunities
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnerships; 