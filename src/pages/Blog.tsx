import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, Users, GraduationCap } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Power of Face-to-Face Training in Business Travel',
      excerpt: 'Discover why physical training sessions are crucial for developing practical skills in business travel management.',
      author: 'John Smith',
      date: 'March 15, 2024',
      category: 'Training Insights',
      image: '/about1.jpg'
    },
    {
      id: 2,
      title: 'Building a Strong Community of Travel Professionals',
      excerpt: 'Learn how networking and community engagement can enhance your career in business travel.',
      author: 'Sarah Johnson',
      date: 'March 10, 2024',
      category: 'Community',
      image: '/about2.jpg'
    },
    {
      id: 3,
      title: 'Hands-on Training: The Key to Success',
      excerpt: 'Explore the benefits of practical, hands-on training in mastering business travel management.',
      author: 'Mike Brown',
      date: 'March 5, 2024',
      category: 'Training Methods',
      image: '/about3.jpg'
    }
  ];

  const categories = [
    'Training Insights',
    'Community',
    'Training Methods',
    'Success Stories',
    'Industry News',
    'Expert Tips'
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">NBTA Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about physical training, community events, and industry insights.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block text-gray-600 hover:text-primary"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map(post => (
                  <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar size={16} className="mr-2" />
                        {post.date}
                        <span className="mx-2">•</span>
                        <User size={16} className="mr-2" />
                        {post.author}
                      </div>
                      <h2 className="text-xl font-semibold mb-2">
                        <Link to={`/blog/${post.id}`} className="hover:text-primary">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center">
                        <Tag size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{post.category}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; 