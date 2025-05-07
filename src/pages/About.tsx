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
        
        {/* Welcome Section */}
        <div className="max-w-4xl mx-auto mb-20 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              About NBTA
            </h2>
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                NetZero Business and Technical Academy (NBTA) is a registered institution under the Corporate Affairs Commission (CAC) of Nigeria, with RC 7471717. We are committed to delivering world-class vocational and technical education that aligns with Nigeria's development priorities and the evolving global workforce needs.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                NBTA is maintaining a strong relationship with National Board for Technical Education (NBTE) to deliver trainings in total compliance with the National Skills Qualification Framework (NSQF). This ensures that our programs meet nationally and globally recognized standards of quality and relevance.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our mission is to Inspire, Equip, Connect, and Empower individuals and communities through inclusive, hands-on learning that fosters sustainable economic development, social equity, and lifelong employability.
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
              {/* Training Philosophy Section */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-4 text-[#22325d]">Our Training Philosophy</h3>
                <p className="mb-4 text-lg text-gray-800">
                  NBTA blends academic rigor with real-world application to ensure our students are career-ready and future-proof. We partner with private workshops, industries, and public institutions to create a hands-on, work-integrated training ecosystem.
                </p>
                <p className="mb-6 text-lg text-gray-800">Our flexible learning modes include:</p>
                <ul className="list-disc pl-6 space-y-3 text-black text-base">
                  <li><strong>20%</strong> classroom-based learning — <span className="font-semibold">Instructor-Led Training (ILT)</span></li>
                  <li><strong>30%</strong> real-practice in technical environments — <span className="font-semibold">Hands-On Workshops and Labs</span></li>
                  <li><strong>20%</strong> guided support from industry experts — <span className="font-semibold">Mentorship and Peer Learning</span></li>
                  <li><strong>30%</strong> contextual, team-based applications — <span className="font-semibold">Project-Based Learning</span></li>
                </ul>
              </div>
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