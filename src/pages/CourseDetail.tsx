import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ExternalLink } from 'lucide-react';

const ProgramDetail = () => {
  // This is specifically for the NBTA Free Skill Training Program
  const program = {
    id: '209',
    title: 'Free Skill Acquisition Training',
    description: 'Join NBTA Netzero Business & Technical Academy for our comprehensive FREE skill training program. Learn essential skills including Digital Marketing, Cake Baking, Liquid Soap Production, Air Freshener & Perfume Production, Bag Making & Handbags, Footwear Making, and Fashion Design. Inspire, Equip, Connect and Empower People.',
    price: 0,
    platform: 'NBTA',
    platform_course_id: 'free-skill-training',
    thumbnail_url: '/p.jpg',
    video_url: null,
    instructor: 'NBTA Expert Instructors',
    duration: 'August 25th - September 3rd, 2025',
    level: 'beginner',
    created_at: '2024-12-19T00:00:00Z',
    mode: 'physical',
    priceType: 'free',
  };

  if (!program) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Program Not Found</h2>
          <p className="mt-4 text-gray-600">The program you're looking for doesn't exist or has been removed.</p>
          <Link to="/courses" className="btn-primary mt-8">
            Browse Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-16 pt-32">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Program Image/Video and Basic Info */}
        <div className="lg:col-span-2">
          {program.video_url ? (
            <div className="relative w-full h-96 rounded-lg shadow-md overflow-hidden">
              <video
                src={program.video_url}
                title={`${program.title} Preview`}
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                poster={program.thumbnail_url}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <img
              src={program.thumbnail_url}
              alt={program.title}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          )}
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

          {/* Skills You'll Learn */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Skills You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h3 className="font-medium text-emerald-900">Eco-Friendly Cosmetological Formulation</h3>
                <p className="text-emerald-700 text-sm">Sustainable and environmentally friendly cosmetic production techniques</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium text-orange-900">Techniques in Baking, Pastry Production, Decoration and Design</h3>
                <p className="text-orange-700 text-sm">Advanced baking techniques, pastry making, and artistic decoration</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-900">Creating and Managing a Fashion Brand</h3>
                <p className="text-purple-700 text-sm">Brand development, management, and marketing strategies for fashion businesses</p>
              </div>
              <div className="p-4 bg-brown-50 rounded-lg">
                <h3 className="font-medium text-brown-900">Leather Goods Crafting</h3>
                <p className="text-brown-700 text-sm">Professional leather crafting and goods production techniques</p>
              </div>
              <div className="p-4 bg-cyan-50 rounded-lg md:col-span-2">
                <h3 className="font-medium text-cyan-900">Online Marketing Strategy and Execution</h3>
                <p className="text-cyan-700 text-sm">Digital marketing strategies, social media management, and online business promotion</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900">Digital Marketing</h3>
                <p className="text-blue-700 text-sm">Social media marketing and digital promotion strategies</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900">Cake Baking</h3>
                <p className="text-green-700 text-sm">Professional cake baking and decoration techniques</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-900">Liquid Soap Production</h3>
                <p className="text-purple-700 text-sm">Manufacturing liquid soap and cleaning products</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-yellow-900">Air Freshener & Perfume</h3>
                <p className="text-yellow-700 text-sm">Production of air fresheners and perfumes</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-medium text-red-900">Bag Making & Handbags</h3>
                <p className="text-red-700 text-sm">Design and production of bags and handbags</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="font-medium text-indigo-900">Footwear Making</h3>
                <p className="text-indigo-700 text-sm">Shoe and sandal making techniques</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <h3 className="font-medium text-pink-900">Fashion Design</h3>
                <p className="text-pink-700 text-sm">Body measurement, fabric cutting, and sewing skills</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing and Action Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-green-600">FREE</h2>
                <div className="mt-4">
                  <a
                    href="https://forms.gle/ihywvhxijSEe5JWZ8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors bg-primary text-white hover:bg-primary-dark"
                  >
                    <ExternalLink size={20} />
                    Register Now
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-2">What's Included:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2">✓</span>
                    Free training materials
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2">✓</span>
                    Expert instructor guidance
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2">✓</span>
                    Hands-on practical sessions
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2">✓</span>
                    Certificate of completion
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2">✓</span>
                    Networking opportunities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Information */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-8">Training Location</h2>
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Jotti Plaza, Dinyavoh, Jalingo</h3>
          <p className="text-blue-700 mb-4">Join us at our training center for hands-on learning experience.</p>
          <div className="flex items-center text-blue-600">
            <span className="mr-2">📍</span>
            <span>Physical training location with all necessary equipment provided</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;