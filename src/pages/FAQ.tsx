import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('general');

  const faqSections = {
    general: [
      {
        question: 'What is NBTA Learning Platform?',
        answer: 'NBTA Learning Platform is Nigeria\'s premier educational platform for customs, trade, and import/export training. We offer physical courses taught by industry experts.'
      },
      {
        question: 'Are the courses online or physical?',
        answer: 'Our courses are conducted physically at our training centers. This allows for hands-on learning and direct interaction with instructors.'
      },
      // Add more general FAQs
    ],
    courses: [
      {
        question: 'How long are the courses?',
        answer: 'Course duration varies from 2-5 days depending on the topic and depth of content. Each course schedule is clearly listed on the course details page.'
      },
      {
        question: 'Do I get a certificate?',
        answer: 'Yes, upon successful completion of the course, you will receive an NBTA-certified certificate recognized in the industry.'
      },
      // Add more course-related FAQs
    ],
    payment: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept various payment methods including credit/debit cards and bank transfers. All transactions are secure and processed through our payment gateway.'
      },
      {
        question: 'Is there a payment plan available?',
        answer: 'Yes, we offer flexible payment plans for some of our courses. Contact our support team for more information.'
      },
      // Add more payment FAQs
    ]
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>

          {/* FAQ Categories */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setExpandedSection('general')}
              className={`px-4 py-2 rounded-md ${
                expandedSection === 'general'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setExpandedSection('courses')}
              className={`px-4 py-2 rounded-md ${
                expandedSection === 'courses'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setExpandedSection('payment')}
              className={`px-4 py-2 rounded-md ${
                expandedSection === 'payment'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Payment
            </button>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {expandedSection && faqSections[expandedSection as keyof typeof faqSections].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Please chat with our friendly team.
            </p>
            <button className="btn-primary">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;