import React from 'react';

const Cookies = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how we use cookies and how you can control them.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="prose max-w-none">
              <h2>What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience and enable certain features to function properly.
              </p>

              <h2>Types of Cookies We Use</h2>
              <p>
                We use the following types of cookies:
              </p>
              <ul>
                <li>
                  <strong>Essential Cookies:</strong> Required for the website to function properly. They enable basic features like page navigation and access to secure areas.
                </li>
                <li>
                  <strong>Functional Cookies:</strong> Remember your preferences and settings to provide a more personalized experience.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used to track visitors across websites to display relevant advertisements.
                </li>
              </ul>

              <h2>How We Use Cookies</h2>
              <p>
                We use cookies for the following purposes:
              </p>
              <ul>
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Improve our website's performance and functionality</li>
                <li>Provide personalized content and recommendations</li>
                <li>Enable social media features</li>
              </ul>

              <h2>Third-Party Cookies</h2>
              <p>
                Some cookies are placed by third-party services that appear on our pages. These third parties may use cookies to:
              </p>
              <ul>
                <li>Track your browsing habits</li>
                <li>Show you relevant advertisements</li>
                <li>Analyze website performance</li>
                <li>Provide social media features</li>
              </ul>

              <h2>Managing Cookie Preferences</h2>
              <p>
                You can control and manage cookies in several ways:
              </p>
              <ul>
                <li>Browser settings: Most web browsers allow you to control cookies through their settings</li>
                <li>Cookie consent tool: Use our cookie consent tool to manage your preferences</li>
                <li>Third-party opt-out: Use the opt-out tools provided by third-party services</li>
              </ul>

              <h2>Cookie Duration</h2>
              <p>
                Cookies can remain on your device for different periods:
              </p>
              <ul>
                <li>
                  <strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser
                </li>
                <li>
                  <strong>Persistent Cookies:</strong> Remain on your device for a set period or until you delete them
                </li>
              </ul>

              <h2>Updates to Cookie Policy</h2>
              <p>
                We may update this cookie policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about our use of cookies, please contact us:
              </p>
              <p>
                Email: privacy@nbta.com<br />
                Phone: +234 123 456 7890<br />
                Address: NBTA Headquarters, 123 Trade Avenue, Lagos, Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;