import React from 'react';

const Accessibility = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Accessibility Policy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Effective Date: 29th April 2025
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="prose max-w-none">
              <p className="mb-6">
                At NetZero Business and Technical Academy (NBTA), we are committed to creating a welcoming, inclusive, and accessible learning environment for all students, instructors, and stakeholders — regardless of ability, background, or means of access.
              </p>

              <h2>1. Our Commitment to Accessibility</h2>
              <p>NBTA is dedicated to:</p>
              <ul>
                <li>Ensuring equal access to all programs, services, and facilities.</li>
                <li>Removing barriers to participation for individuals with disabilities.</li>
                <li>Providing learning accommodations and assistive tools for those who need them.</li>
                <li>Designing inclusive physical, virtual, and hybrid learning platforms.</li>
              </ul>

              <h2>2. Inclusive Learning Platforms</h2>
              <p>We provide multiple options to support diverse learning needs:</p>
              <ul>
                <li>Physical platform: Accessible classrooms and training environments with reasonable accommodations for mobility, hearing, or visual impairments.</li>
                <li>Online/Virtual platform: Content is delivered via accessible digital systems, compatible with screen readers and other assistive technologies.</li>
                <li>Hybrid platform: Flexible scheduling and modality adjustments to suit learners' specific accessibility needs.</li>
              </ul>

              <h2>3. Reasonable Accommodations</h2>
              <p>NBTA will provide reasonable accommodations to qualified individuals with disabilities. These may include:</p>
              <ul>
                <li>Adjusted class materials (e.g., large print, audio formats, or captions)</li>
                <li>Extra time for assessments or assignments</li>
                <li>Modified equipment or learning tools</li>
                <li>Support from accessibility-trained mentors or facilitators</li>
              </ul>
              <p>Requests for accommodation should be made during registration or communicated to the NBTA support team as early as possible.</p>

              <h2>4. Facilities and Infrastructure</h2>
              <p>NBTA works to ensure that all partner facilities, training centers, and workshops:</p>
              <ul>
                <li>Are physically accessible (including ramps, restrooms, and seating)</li>
                <li>Offer safe and inclusive environments</li>
                <li>Comply with relevant accessibility standards and laws of the Federal Republic of Nigeria.</li>
              </ul>

              <h2>5. Instructor and Staff Training</h2>
              <p>All NBTA facilitators, mentors, and administrative staff receive orientation on:</p>
              <ul>
                <li>Accessibility best practices</li>
                <li>Inclusive teaching methods</li>
                <li>Sensitivity and non-discrimination toward learners with diverse needs</li>
              </ul>

              <h2>6. Feedback and Continuous Improvement</h2>
              <p>We encourage ongoing feedback from learners, staff, and partners to help improve accessibility. If you encounter a barrier or need support, please let us know. Your input helps us grow.</p>

              <h2>7. Contact Us</h2>
              <p>If you have questions about accessibility or need assistance:</p>
              <p>
                📧 Email: accessibility@nbta.com.ng<br />
                📞 Phone: +234 901 956 6437<br />
                📍 Address: Plot 51, Block 5/6, Cadastral Zone C01, Karmo, Abuja, FCT, Nigeria
              </p>

              <p className="mt-8 italic">
                We believe that inclusive access is not an add-on — it's a right. At NBTA, we are committed to ensuring that every learner has the opportunity to thrive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessibility; 