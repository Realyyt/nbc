const Terms = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="prose max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using the National Business Travel Association (NBTA) website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>

              <h2>2. Use of Services</h2>
              <p>
                Our services are intended for business travel professionals and organizations. You agree to use our services only for lawful purposes and in accordance with these terms.
              </p>

              <h2>3. User Accounts</h2>
              <p>
                To access certain features of our services, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
              </p>

              <h2>4. Intellectual Property</h2>
              <p>
                All content, features, and functionality of our services are owned by NBTA and are protected by international copyright, trademark, and other intellectual property laws.
              </p>

              <h2>5. User Content</h2>
              <p>
                You retain ownership of any content you submit to our services. By submitting content, you grant NBTA a worldwide, non-exclusive license to use, reproduce, and distribute your content.
              </p>

              <h2>6. Prohibited Activities</h2>
              <p>
                You agree not to:
              </p>
              <ul>
                <li>Use our services for any illegal purpose</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Interfere with the proper functioning of our services</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>

              <h2>7. Limitation of Liability</h2>
              <p>
                NBTA shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
              </p>

              <h2>8. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on our website.
              </p>

              <h2>9. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.
              </p>

              <h2>10. Contact Information</h2>
              <p>
                If you have any questions about these terms, please contact us at:
              </p>
              <p>
                Email: legal@nbta.com<br />
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

export default Terms;