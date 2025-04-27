import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I book a business trip?',
      answer: 'To book a business trip, log in to your NBTA account and navigate to the "Book Travel" section. Select your destination, dates, and preferences. Our system will show you available options, and you can complete the booking process in a few simple steps.'
    },
    {
      id: 2,
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards, including Visa, Mastercard, and American Express. We also support corporate payment methods and can set up direct billing for approved accounts.'
    },
    {
      id: 3,
      question: 'How can I modify or cancel a booking?',
      answer: 'You can modify or cancel your booking through your NBTA account. Go to "My Trips" and select the booking you want to change. Follow the prompts to modify or cancel your reservation. Please note that cancellation policies may vary depending on the service provider.'
    },
    {
      id: 4,
      question: 'What is the refund policy?',
      answer: 'Our refund policy varies depending on the type of booking and the service provider. Generally, refundable bookings can be cancelled for a full refund up to 24 hours before the scheduled time. Non-refundable bookings may be subject to cancellation fees.'
    },
    {
      id: 5,
      question: 'How do I contact customer support?',
      answer: 'You can reach our customer support team 24/7 through the following channels: Phone: +234 123 456 7890, Email: support@nbta.com, or through the live chat feature on our website.'
    }
  ];

  const supportResources = [
    {
      title: 'User Guide',
      description: 'Comprehensive guide to using NBTA platform',
      link: '#'
    },
    {
      title: 'Travel Policy Templates',
      description: 'Sample travel policies for your organization',
      link: '#'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      link: '#'
    },
    {
      title: 'API Documentation',
      description: 'Technical documentation for developers',
      link: '#'
    }
  ];

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to your questions and get support for your business travel needs.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* FAQs Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map(faq => (
                <div key={faq.id} className="bg-white rounded-lg shadow-sm">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span className="font-medium">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <ChevronUp size={20} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Support Resources */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Support Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportResources.map((resource, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <a
                    href={resource.link}
                    className="text-primary hover:underline"
                  >
                    Learn More
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;