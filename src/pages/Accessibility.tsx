import React from 'react';
const Accessibility = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Accessibility</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are committed to making our website and services accessible to everyone.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="prose max-w-none">
              <h2>Our Commitment</h2>
              <p>
                NBTA is committed to ensuring digital accessibility for people of all abilities. We strive to continually improve the user experience for everyone and apply relevant accessibility standards.
              </p>

              <h2>Accessibility Features</h2>
              <p>
                Our website includes the following accessibility features:
              </p>
              <ul>
                <li>Keyboard navigation support</li>
                <li>Screen reader compatibility</li>
                <li>High contrast mode</li>
                <li>Text size adjustment</li>
                <li>Alt text for images</li>
                <li>ARIA labels for interactive elements</li>
              </ul>

              <h2>Standards Compliance</h2>
              <p>
                We aim to conform to the following accessibility standards:
              </p>
              <ul>
                <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
                <li>Americans with Disabilities Act (ADA) requirements</li>
                <li>Section 508 of the Rehabilitation Act</li>
              </ul>

              <h2>Assistive Technologies</h2>
              <p>
                Our website is designed to work with various assistive technologies, including:
              </p>
              <ul>
                <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
                <li>Screen magnifiers</li>
                <li>Speech recognition software</li>
                <li>Keyboard-only navigation</li>
              </ul>

              <h2>Continuous Improvement</h2>
              <p>
                We regularly review and update our website to ensure it remains accessible. This includes:
              </p>
              <ul>
                <li>Regular accessibility audits</li>
                <li>User testing with people with disabilities</li>
                <li>Staff training on accessibility best practices</li>
                <li>Implementation of user feedback</li>
              </ul>

              <h2>Reporting Issues</h2>
              <p>
                If you encounter any accessibility barriers on our website, please contact us:
              </p>
              <p>
                Email: accessibility@nbta.com<br />
                Phone: +234 123 456 7890<br />
                Address: NBTA Headquarters, 123 Trade Avenue, Lagos, Nigeria
              </p>

              <h2>Alternative Formats</h2>
              <p>
                We can provide information in alternative formats upon request, including:
              </p>
              <ul>
                <li>Large print</li>
                <li>Braille</li>
                <li>Audio format</li>
                <li>Electronic text</li>
              </ul>

              <h2>Accessibility Statement Updates</h2>
              <p>
                This accessibility statement was last updated on March 15, 2024. We will review and update it regularly to reflect our ongoing commitment to accessibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessibility; 