import { Link } from 'react-router-dom';
import { Book, Download, Clock, Users, GraduationCap, MapPin } from 'lucide-react';

const Guides = () => {
  const guides = [
    {
      id: 1,
      title: 'Business Travel Management Certification',
      description: 'Comprehensive physical training program covering all aspects of business travel management.',
      duration: '5 days',
      level: 'Beginner to Advanced',
      location: 'Lagos Training Center',
      seats: 20,
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      title: 'Travel Policy Development Workshop',
      description: 'Hands-on workshop for creating and implementing effective travel policies.',
      duration: '3 days',
      level: 'Intermediate',
      location: 'Abuja Training Center',
      seats: 15,
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      title: 'Advanced Travel Management',
      description: 'Advanced techniques for managing complex business travel scenarios.',
      duration: '4 days',
      level: 'Advanced',
      location: 'Port Harcourt Training Center',
      seats: 12,
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  const categories = [
    {
      title: 'Certification Programs',
      guides: 8,
      icon: <GraduationCap size={24} className="text-primary" />
    },
    {
      title: 'Workshops',
      guides: 12,
      icon: <Book size={24} className="text-primary" />
    },
    {
      title: 'Masterclasses',
      guides: 6,
      icon: <Users size={24} className="text-primary" />
    },
    {
      title: 'Specialized Training',
      guides: 10,
      icon: <Book size={24} className="text-primary" />
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Training Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our expert-led physical training programs and enhance your business travel management skills.
          </p>
        </div>

        {/* Categories */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {category.icon}
                  <h3 className="text-xl font-semibold ml-3">{category.title}</h3>
                </div>
                <p className="text-gray-600">{category.guides} programs available</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Programs */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Featured Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map(guide => (
              <div key={guide.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                  <p className="text-gray-600 mb-4">{guide.description}</p>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Clock size={16} className="mr-2" />
                    {guide.duration}
                    <span className="mx-2">•</span>
                    <span>{guide.level}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <MapPin size={16} className="mr-2" />
                    {guide.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={16} className="mr-2" />
                      {guide.seats} seats available
                    </div>
                    <button className="btn-primary">Register Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guides; 