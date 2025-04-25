import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const Help = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const faqs = [
    {
      id: '1',
      question: 'How do I enroll in a course?',
      answer: 'To enroll in a course, browse our available courses, select the one you\'re interested in, and click the "Add to Cart" button. Follow the checkout process to complete your enrollment.'
    },
    {
      id: '2',
      question: 'What are the payment methods accepted?',
      answer: 'We accept various payment methods including credit/debit cards and bank transfers. All payments are processed securely through our payment gateway.'
    },
    {
      id: '3',
      question: 'Can I get a refund?',
      answer: 'Yes, we offer refunds within 7 days of purchase if you haven\'t attended the physical training session. Contact our support team to initiate the refund process.'
    },
    // Add more FAQs as needed
  ];

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Help Center</h1>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Popular Topics */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Popular Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => toggleSection(faq.id)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  {expandedSection === faq.id ? (
                    <ChevronUp className="flex-shrink-0 text-gray-500" size={20} />
                  ) : (
                    <ChevronDown className="flex-shrink-0 text-gray-500" size={20} />
                  )}
                </div>
                {expandedSection === faq.id && (
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is available Monday to Friday, 9am - 5pm WAT
          </p>
          <div className="flex justify-center space-x-4">
            <button className="btn-primary">
              Contact Support
            </button>
            <button className="btn-outline">
              Submit a Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;