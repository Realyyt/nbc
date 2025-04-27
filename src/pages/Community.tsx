import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MessageSquare, MapPin, Building, GraduationCap } from 'lucide-react';

const Community = () => {
  const events = [
    {
      id: 1,
      title: 'NBTA Annual Conference 2024',
      date: 'June 15-17, 2024',
      location: 'Lagos, Nigeria',
      description: 'Join industry leaders for three days of networking, learning, and innovation.',
      attendees: 500,
      type: 'Conference',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      title: 'Travel Management Workshop',
      date: 'April 20, 2024',
      location: 'Abuja, Nigeria',
      description: 'Hands-on workshop for travel managers to enhance their skills.',
      attendees: 200,
      type: 'Workshop',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      title: 'Networking Mixer',
      date: 'May 5, 2024',
      location: 'Port Harcourt, Nigeria',
      description: 'Connect with fellow travel professionals in a casual setting.',
      attendees: 150,
      type: 'Networking',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  const chapters = [
    {
      id: 1,
      name: 'Lagos Chapter',
      members: 250,
      nextEvent: 'April 15, 2024',
      location: 'Lagos, Nigeria'
    },
    {
      id: 2,
      name: 'Abuja Chapter',
      members: 180,
      nextEvent: 'April 20, 2024',
      location: 'Abuja, Nigeria'
    },
    {
      id: 3,
      name: 'Port Harcourt Chapter',
      members: 120,
      nextEvent: 'April 25, 2024',
      location: 'Port Harcourt, Nigeria'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">NBTA Community</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with fellow travel professionals, attend physical events, and grow your network.
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar size={16} className="mr-2" />
                    {event.date}
                    <span className="mx-2">•</span>
                    <span>{event.type}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <MapPin size={16} className="mr-2" />
                    {event.location}
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={16} className="mr-2" />
                      {event.attendees} attendees
                    </div>
                    <button className="btn-primary">Register Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Chapters */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">Local Chapters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chapters.map(chapter => (
              <div key={chapter.id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{chapter.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Users size={16} className="mr-2" />
                    {chapter.members} members
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    Next event: {chapter.nextEvent}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    {chapter.location}
                  </div>
                </div>
                <button className="btn-outline w-full mt-4">Join Chapter</button>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Benefits */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Community Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Networking Opportunities</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Regular networking events</li>
                <li>• Industry conferences</li>
                <li>• Chapter meetings</li>
                <li>• Professional mixers</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Professional Development</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Exclusive training sessions</li>
                <li>• Mentorship programs</li>
                <li>• Career development workshops</li>
                <li>• Industry certifications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;