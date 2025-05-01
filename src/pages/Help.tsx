import React from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqCategories = [
    {
      title: "About NBTA",
      faqs: [
        {
          id: 1,
          question: "What is NBTA?",
          answer: "NBTA (NetZero Business and Technical Academy) is a dynamic skills development platform offering dual apprenticeship, hands-on training, simulation-based learning, and expert mentorship across multiple trades and professions — both in-person and online."
        },
        {
          id: 2,
          question: "Who can join NBTA?",
          answer: "NBTA is open to women, youth, school leavers, early-career professionals, and anyone seeking to gain or upgrade technical and business skills aligned with global standards."
        },
        {
          id: 3,
          question: "What trades or skills does NBTA offer training in?",
          answer: "NBTA offers training in sectors including construction, technology, business, agriculture, hospitality, health, and more. For a full list, visit our Programs page."
        }
      ]
    },
    {
      title: "Training Platforms and Enrollment",
      faqs: [
        {
          id: 4,
          question: "What are the different platforms I can choose from?",
          answer: "• Physical (On-site) Platform: Face-to-face, on-the-job training with mentorship.\n• Online/Virtual Platform: Flexible, internet-based learning with remote mentor support.\n• Blended Platform: A mix of physical and virtual learning guided by assigned mentors."
        },
        {
          id: 5,
          question: "Can I switch from online to physical training later?",
          answer: "Yes, learners on the blended or virtual platform may request to transition to physical training, subject to availability and evaluation."
        },
        {
          id: 6,
          question: "How do I enroll in NBTA programs?",
          answer: "Simply visit our website and go to the Join NBTA or Apply Now page. Complete the registration form and select your preferred program and platform."
        },
        {
          id: 7,
          question: "Is there an age limit to join NBTA programs?",
          answer: "NBTA welcomes learners aged 14 and above. Some programs may have additional eligibility criteria based on trade or certification requirements."
        },
        {
          id: 8,
          question: "Are there any fees involved?",
          answer: "Yes, a modest training and resource fee may apply depending on the program. However, free programs and scholarships are available in partnership with selected institutions."
        }
      ]
    },
    {
      title: "Learning Experience and Support",
      faqs: [
        {
          id: 9,
          question: "Will I have a mentor assigned to me?",
          answer: "Absolutely. Every learner is paired with a dedicated mentor who offers personal guidance, motivation, and career support throughout the program."
        },
        {
          id: 10,
          question: "What kind of support will I receive as a student?",
          answer: "Learners receive mentorship, access to expert facilitators, practical assignments, assessments, career development support, and entry into the NBTA alumni network."
        }
      ]
    },
    {
      title: "How We Train: Weekly Structure",
      faqs: [
        {
          id: 11,
          question: "How is the NBTA training program structured?",
          answer: "NBTA follows a unique 6-day/week blended apprenticeship model:\n• 2 Days/Week: Classroom learning with certified instructors (theory).\n• 3 Days/Week: Real-world, hands-on training under a master craftsman (practice).\n• 1 Day/Week: Team-based contextual project, jointly assessed by instructors and mentors."
        },
        {
          id: 12,
          question: "Who delivers the training at NBTA?",
          answer: "NBTA combines the expertise of certified instructors for classroom sessions and skilled master craftsmen for practical workplace learning."
        },
        {
          id: 13,
          question: "Where does the training take place?",
          answer: "NBTA partners with government institutions, private sector workshops, and accredited training centers. Learners are placed in vetted environments that support real-world skill application."
        },
        {
          id: 14,
          question: "What is the purpose of the weekly project work?",
          answer: "The Contextual Project Day reinforces weekly learning. Students work in teams to develop or build solutions based on what they've learned — enhancing both technical and teamwork skills."
        }
      ]
    },
    {
      title: "Certification and Career Support",
      faqs: [
        {
          id: 15,
          question: "Will I receive a certificate after completing the training?",
          answer: "Yes. Upon successful completion, learners receive a nationally and globally recognized NBTA Certificate of Competency."
        },
        {
          id: 16,
          question: "Can NBTA help me find a job after training?",
          answer: "NBTA actively collaborates with partner industries and employers to connect learners to apprenticeship, internship, and job placement opportunities."
        }
      ]
    },
    {
      title: "Opportunities for Partners and Professionals",
      faqs: [
        {
          id: 17,
          question: "Can I partner with NBTA as an employer or training center/workshop?",
          answer: "Yes! NBTA welcomes collaborations with businesses, schools, training institutions, and government agencies. Visit the Partnerships page to get started."
        },
        {
          id: 18,
          question: "How can I join the NBTA team as an instructor, mentor, or master craftsman?",
          answer: "We're always looking for passionate educators and skilled professionals. Check our Careers or Join Our Team page for open roles."
        }
      ]
    },
    {
      title: "NSQF & NBTE Compliance",
      faqs: [
        {
          id: 19,
          question: "Is NBTA aligned with the National Skills Qualifications Framework (NSQF)?",
          answer: "Yes. NBTA operates in full compliance with the NSQF as outlined by the National Board for Technical Education (NBTE). Our programs meet recognized national competency standards."
        },
        {
          id: 20,
          question: "How does NBTA ensure its programs meet NBTE and NSQF standards?",
          answer: "NBTA designs its curriculum, training, and certification systems based on NBTE guidelines and NSQF levels, using certified instructors, standardized training modules, and accredited facilities."
        }
      ]
    }
  ];

  const supportResources = [
    {
      title: 'Program Guide',
      description: 'Detailed information about our training programs and platforms',
      link: '#'
    },
    {
      title: 'Enrollment Process',
      description: 'Step-by-step guide to joining NBTA',
      link: '#'
    },
    {
      title: 'Training Schedule',
      description: 'View our training calendar and program timelines',
      link: '#'
    },
    {
      title: 'Partner Resources',
      description: 'Information for potential partners and collaborators',
      link: '#'
    }
  ];

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const filteredFaqs = faqCategories.flatMap(category => 
    category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to your questions about NBTA's training programs and support services.
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
            <h2 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              {faqCategories.map((category, index) => (
                <div key={index} className="mb-12">
                  <h3 className="text-xl font-semibold mb-4 text-primary">{category.title}</h3>
                  <div className="space-y-4">
                    {category.faqs.map(faq => (
                      <div key={faq.id} className="bg-white rounded-lg shadow-sm transform hover:scale-[1.02] transition-transform duration-300">
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
                          <div className="px-6 pb-4 text-gray-600 whitespace-pre-line">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Resources */}
          <div>
            <h2 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Support Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportResources.map((resource, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm transform hover:scale-[1.02] transition-transform duration-300">
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