const Privacy = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-lg">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-gray-600">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 mt-4 text-gray-600">
                <li>Name and contact information</li>
                <li>Payment information</li>
                <li>Course registration details</li>
                <li>Communication preferences</li>
                <li>Feedback and survey responses</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mt-4 text-gray-600">
                <li>Process your course registrations</li>
                <li>Communicate with you about courses</li>
                <li>Send important updates and announcements</li>
                <li>Improve our services and course offerings</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="text-gray-600">
                We do not sell, trade, or rent your personal information to third parties.
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 mt-4 text-gray-600">
                <li>Course instructors and administrators</li>
                <li>Payment processing partners</li>
                <li>Service providers who assist in our operations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate technical and organizational measures to protect
                your personal information against unauthorized access, alteration, disclosure,
                or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
              <p className="text-gray-600">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mt-4 text-gray-600">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
              <p className="text-gray-600">
                We use cookies and similar tracking technologies to enhance your experience
                on our website. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Changes to Privacy Policy</h2>
              <p className="text-gray-600">
                We may update this privacy policy from time to time. We will notify you of
                any changes by posting the new policy on this page and updating the effective date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this privacy policy or our practices,
                please contact us at:
              </p>
              <div className="mt-4 text-gray-600">
                <p>Email: privacy@nbtalearn.com</p>
                <p>Phone: +234 123 456 7890</p>
                <p>Address: NBTA Headquarters, 123 Trade Avenue, Lagos, Nigeria</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;