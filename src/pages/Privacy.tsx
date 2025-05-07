import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Effective Date: 29th April 2025
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="prose max-w-none">
              <p className="mb-6">
                At NetZero Business and Technical Academy (NBTA), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and share your personal information when you use our services — whether through our physical campuses, virtual platforms, or website.
              </p>

              <h2>1. Information We Collect</h2>
              <p>We collect personal information that you provide directly to us when you register or interact with our services. This may include:</p>
              <ul>
                <li>Full name and contact information (e.g., phone number, email, address)</li>
                <li>Academic history and qualifications</li>
                <li>Account credentials (username, password)</li>
                <li>Payment and billing information</li>
                <li>Educational interests, preferences, and program choices</li>
                <li>Communications and feedback</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the collected data to:</p>
              <ul>
                <li>Process applications and manage enrollments</li>
                <li>Maintain academic records and facilitate training progress</li>
                <li>Communicate updates, class schedules, and program information</li>
                <li>Personalize your learning journey and support services</li>
                <li>Monitor, evaluate, and improve our educational offerings</li>
                <li>Fulfill legal and regulatory obligations</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>Your data may be shared under the following circumstances:</p>
              <ul>
                <li>With service providers: We work with trusted third parties who help deliver our services (e.g., payment processors, IT support, cloud services).</li>
                <li>With partners: In some cases, we may share data with our affiliated training centers, industry mentors, or partner institutions — only with your consent.</li>
                <li>With authorities: We may disclose your information if legally required or to protect the rights, safety, or property of NBTA and its users.</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>We implement industry-standard safeguards to protect your information from unauthorized access, alteration, disclosure, or destruction. These include encryption, access control, and secure storage practices.</p>

              <h2>5. Your Rights</h2>
              <p>You have rights regarding your personal data, including the right to:</p>
              <ul>
                <li>Access and review your personal information</li>
                <li>Correct or update inaccurate information</li>
                <li>Request deletion of your data, where applicable</li>
                <li>Object to the processing of your data</li>
                <li>Opt out of non-essential communications</li>
              </ul>
              <p>To exercise these rights, please contact us via the details provided below.</p>

              <h2>6. Cookies and Tracking Technologies</h2>
              <p>We use cookies and similar technologies to enhance user experience and analyze website traffic. You can adjust your browser settings to accept or reject cookies. Note that disabling cookies may affect website functionality.</p>

              <h2>7. International Data Transfers</h2>
              <p>If you access our services from outside Nigeria, please note that your data may be transferred to and processed in Nigeria or other countries with appropriate data protection safeguards.</p>

              <h2>8. Children's Privacy</h2>
              <p>NBTA does not knowingly collect data from children under the age of 13. If we become aware that we have inadvertently gathered such information, we will take steps to delete it promptly.</p>

              <h2>9. Changes to This Policy</h2>
              <p>We may revise this Privacy Policy periodically. Any significant updates will be posted on this page with an updated effective date. We encourage users to review the policy regularly.</p>

              <h2>10. Contact Us</h2>
              <p>If you have any questions, concerns, or requests regarding this policy or our data practices, please contact:</p>
              <p>
                📧 Email: wecanhelp@nbta.com.ng<br />
                📞 Phone: +234 901 956 6437<br />
                📍 Address: Plot 51, Block 5/6, Cadastral Zone C01, Karmo, Abuja, FCT, Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;