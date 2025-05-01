import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, Globe, BookOpen, Building, GraduationCap, Target, Lightbulb, Heart, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl transform -skew-y-2"></div>
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              About NBTA
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Inspire, Equip, Connect and Empower People through vocational education and training.
            </p>
          </div>
        </div>

        {/* Facts Section */}
        <div className="max-w-4xl mx-auto mb-20 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              FACTS
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              The future you've dreamed of is within reach at NBTA! With hundreds of programs across 21 career fields, we cater to your interests. Our supportive learning environment is committed to your success, offering a skill learning experience that can transform your life.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Developing entrepreneurial skills through vocational education and training can lead to sustainable social enterprises that benefit society as a whole. These enterprises often address social, human, and environmental issues more effectively.
            </p>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="max-w-4xl mx-auto mb-20 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              WELCOME TO NBTA!
            </h2>
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                Knowledge is Nigeria's primary resource, and education is essential for acquiring it. The constantly evolving demands for skills in Nigeria and everywhere ongoing development and competency enhancement remains crucial.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                NBTA understands the importance of high-quality training to meet the ever-changing labor market demands. By engaging with policymakers, interest groups, and businesses, NBTA stays informed on societal developments to offer pertinent training for Nigeria's future.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                As a proactive collaborator, NBTA provides a wide array of vocational, technical, and business training opportunities. Our goal is to offer attractive, dynamic training opportunities for everyone seeking new skills and knowledge.
              </p>
            </div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
            <Target size={48} className="text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To be acknowledged and valued as an exhilarating and stimulating training hub, serving as a strategic asset for local businesses. Additionally, we aspire to create an appealing and engaging workplace environment for all involved.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
            <Lightbulb size={48} className="text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We are dedicated to promoting inclusive and sustainable economic growth, social equity, and environmental sustainability. Our mission is to empower individuals, organizations, enterprises, and communities to achieve their full potential through sustainable development, decent work, and lifelong learning opportunities.
            </p>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Our Objectives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
              <ol className="space-y-6 text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mr-4">1</span>
                  <span>To provide capacity building in hands-on, customer oriented and skills-based practices in business and technical services in line with the dynamic requirements and expectations of users.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mr-4">2</span>
                  <span>To cultivate resources, skills, practices, and collaborative environment that connects academic achievements to work readiness, productivity, and adaptation to challenging life experiences.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mr-4">3</span>
                  <span>To continuously promote workforce development, standards and ethics, to meet international industry standards.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mr-4">4</span>
                  <span>To develop newer green talents, prepare current workforce with green skills, and support green transition into green jobs.</span>
                </li>
              </ol>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Training Modes
              </h3>
              <ul className="space-y-6 text-gray-600">
                <li className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <BookOpen size={24} className="text-primary" />
                  </div>
                  <span>Instructor-Led Training (ILT): 20% classroom training</span>
                </li>
                <li className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Users size={24} className="text-primary" />
                  </div>
                  <span>Hands-On Workshops and Labs: 30% practical sessions</span>
                </li>
                <li className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <GraduationCap size={24} className="text-primary" />
                  </div>
                  <span>Mentorship and Peer Learning: 20% guided learning</span>
                </li>
                <li className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Building size={24} className="text-primary" />
                  </div>
                  <span>Project-Based Learning: 30% real-world application</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Why Our Work Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">To Individuals</h3>
              <p className="text-gray-600">Career advancement and personal growth through upskilling and reskilling.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">To Families</h3>
              <p className="text-gray-600">Supporting sustainable employment and improved livelihoods.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">To Communities</h3>
              <p className="text-gray-600">Promoting equitable access to education and skills training.</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            What People Say About Us
          </h2>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star size={32} className="text-primary" />
              </div>
              <blockquote className="text-gray-600 text-lg italic mb-6 leading-relaxed">
                "I enrolled in the Electrical course at NBTA and it has been a transformative experience. The instructors are industry veterans who provided practical knowledge and hands-on training that directly applies to real-world scenarios. The state-of-the-art labs and equipment allowed me to practice what I learned in class, making me feel confident in my skills. Thanks to NBTA, I secured a job as an electrician within two months of completing the course. I highly recommend NBTA to everyone looking to advance their technical skills."
              </blockquote>
              <p className="text-right font-semibold text-primary">— Electrician/Electric Technician</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl transform -skew-y-2"></div>
          <div className="relative py-12">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Join Our Community
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Become part of our growing community of professionals. Attend our training sessions and connect with industry experts.
            </p>
            <div className="flex justify-center gap-6">
              <Link 
                to="/courses" 
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                View Training Programs
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transform hover:scale-105 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 