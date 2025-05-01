import React from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('about');

  const faqSections = {
    about: [
      {
        question: 'What is NBTA?',
        answer: 'NBTA (NetZero Business and Technical Academy) is a dynamic skills development platform offering dual apprenticeship, hands-on training, simulation-based learning, and expert mentorship across multiple trades and professions — both in-person and online.'
      },
      {
        question: 'Who can join NBTA?',
        answer: 'NBTA is open to women, youth, school leavers, early-career professionals, and anyone seeking to gain or upgrade technical and business skills aligned with global standards.'
      },
      {
        question: 'What trades or skills does NBTA offer training in?',
        answer: 'NBTA offers training in sectors including construction, technology, business, agriculture, hospitality, health, and more. For a full list, visit our Programs page.'
      }
    ],
    enrollment: [
      {
        question: 'What are the different platforms I can choose from?',
        answer: '• Physical (On-site) Platform: Face-to-face, on-the-job training with mentorship.\n• Online/Virtual Platform: Flexible, internet-based learning with remote mentor support.\n• Blended Platform: A mix of physical and virtual learning guided by assigned mentors.'
      },
      {
        question: 'Can I switch from online to physical training later?',
        answer: 'Yes, learners on the blended or virtual platform may request to transition to physical training, subject to availability and evaluation.'
      },
      {
        question: 'How do I enroll in NBTA programs?',
        answer: 'Simply visit our website and go to the Join NBTA or Apply Now page. Complete the registration form and select your preferred program and platform.'
      },
      {
        question: 'Is there an age limit to join NBTA programs?',
        answer: 'NBTA welcomes learners aged 14 and above. Some programs may have additional eligibility criteria based on trade or certification requirements.'
      },
      {
        question: 'Are there any fees involved?',
        answer: 'Yes, a modest training and resource fee may apply depending on the program. However, free programs and scholarships are available in partnership with selected institutions.'
      }
    ],
    experience: [
      {
        question: 'Will I have a mentor assigned to me?',
        answer: 'Absolutely. Every learner is paired with a dedicated mentor who offers personal guidance, motivation, and career support throughout the program.'
      },
      {
        question: 'What kind of support will I receive as a student?',
        answer: 'Learners receive mentorship, access to expert facilitators, practical assignments, assessments, career development support, and entry into the NBTA alumni network.'
      },
      {
        question: 'How is the NBTA training program structured?',
        answer: 'NBTA follows a unique 6-day/week blended apprenticeship model:\n• 2 Days/Week: Classroom learning with certified instructors (theory).\n• 3 Days/Week: Real-world, hands-on training under a master craftsman (practice).\n• 1 Day/Week: Team-based contextual project, jointly assessed by instructors and mentors.'
      },
      {
        question: 'Who delivers the training at NBTA?',
        answer: 'NBTA combines the expertise of certified instructors for classroom sessions and skilled master craftsmen for practical workplace learning.'
      }
    ],
    certification: [
      {
        question: 'Will I receive a certificate after completing the training?',
        answer: 'Yes. Upon successful completion, learners receive a nationally and globally recognized NBTA Certificate of Competency.'
      },
      {
        question: 'Can NBTA help me find a job after training?',
        answer: 'NBTA actively collaborates with partner industries and employers to connect learners to apprenticeship, internship, and job placement opportunities.'
      },
      {
        question: 'Is NBTA aligned with the National Skills Qualifications Framework (NSQF)?',
        answer: 'Yes. NBTA operates in full compliance with the NSQF as outlined by the National Board for Technical Education (NBTE). Our programs meet recognized national competency standards.'
      }
    ]
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>

          {/* FAQ Categories */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setExpandedSection('about')}
              className={`px-4 py-2 rounded-md ${
                expandedSection === 'about'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              About NBTA
            </button>
            <button
              onClick={() => setExpandedSection('enrollment')}
              className={`px-4 py-2 rounded-md ${
                expandedSection === 'enrollment'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Enrollment
            </button>
            <button
              onClick={() => setExpandedSection('experience')}
              className={`px-4 py-2 rounded-md ${
                expandedSection === 'experience'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Learning Experience
            </button>
            <button
              onClick={() => setExpandedSection('certification')}
              className={`px-4 py-2 rounded-md ${
                expandedSection === 'certification'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Certification
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
                <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
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