import React from 'react';
import { Search, MapPin, Briefcase, Clock, Users, GraduationCap, BookOpen } from 'lucide-react';

const Careers = () => {
  const jobListings = [
    {
      id: 1,
      title: 'Senior Training Instructor',
      department: 'Training',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      description: 'Lead physical training sessions and develop curriculum for business travel professionals.',
      requirements: [
        '5+ years of experience in business travel management',
        'Strong presentation and facilitation skills',
        'Experience in curriculum development',
        'Excellent communication skills'
      ]
    },
    {
      id: 2,
      title: 'Community Manager',
      department: 'Community',
      location: 'Abuja, Nigeria',
      type: 'Full-time',
      description: 'Build and nurture our community of business travel professionals through events and engagement.',
      requirements: [
        '3+ years of community management experience',
        'Strong event planning and execution skills',
        'Experience in professional networking',
        'Excellent interpersonal skills'
      ]
    },
    {
      id: 3,
      title: 'Training Coordinator',
      department: 'Training',
      location: 'Port Harcourt, Nigeria',
      type: 'Full-time',
      description: 'Coordinate physical training sessions and manage training logistics.',
      requirements: [
        '2+ years of training coordination experience',
        'Strong organizational skills',
        'Experience in event management',
        'Attention to detail'
      ]
    }
  ];

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

       

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">All Departments</option>
                  <option value="training">Training</option>
                  <option value="community">Community</option>
                  <option value="operations">Operations</option>
                </select>
                <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">All Locations</option>
                  <option value="lagos">Lagos</option>
                  <option value="abuja">Abuja</option>
                  <option value="port-harcourt">Port Harcourt</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          <div className="space-y-6">
            {jobListings.map(job => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Briefcase size={16} className="mr-2" />
                    {job.department}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2" />
                    {job.type}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div>
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <button className="btn-primary mt-4">Apply Now</button>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Build the Future Together</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At NBTA, we don't just teach skills—we build futures. Join us in creating a workforce that is resilient, relevant, and ready for the world.
          </p>
        </div>
       
      </div>
    </div>
  );
};

export default Careers; 