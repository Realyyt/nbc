const Cookies = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>

          <div className="prose prose-lg">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
              <p className="text-gray-600">
                Cookies are small text files that are placed on your computer or mobile device
                when you visit our website. They help us make the site work better for you
                and provide us with insights about how the site is being used.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
              <p className="text-gray-600">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 mt-4 text-gray-600">
                <li>
                  <strong>Essential Cookies:</strong> Required for the website to function properly
                </li>
                <li>
                  <strong>Functional Cookies:</strong> Remember your preferences and settings
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how visitors use our site
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Track your interests and show relevant ads
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">Session Cookies</h3>
                  <p className="text-gray-600">
                    These cookies are temporary and expire when you close your browser.
                    They help us track your movements from page to page so you don't have
                    to repeatedly enter the same information.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">Persistent Cookies</h3>
                  <p className="text-gray-600">
                    These cookies remain on your device for a set period or until you delete
                    them. They help us remember your preferences and provide a more
                    personalized experience.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">Third-Party Cookies</h3>
                  <p className="text-gray-600">
                    Some cookies are placed by third-party services that appear on our pages.
                    We use these to help us understand how visitors use our site and to
                    provide relevant advertisements.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
              <p className="text-gray-600">
                You can control and/or delete cookies as you wish. You can delete all cookies
                that are already on your computer and you can set most browsers to prevent
                them from being placed. However, if you do this, you may have to manually
                adjust some preferences every time you visit our site and some features may
                not work as intended.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Your Choices</h2>
              <p className="text-gray-600">
                Most web browsers allow you to manage your cookie preferences. You can:
              </p>
              <ul className="list-disc pl-6 mt-4 text-gray-600">
                <li>Delete all cookies from your browser</li>
                <li>Block all cookies from being saved</li>
                <li>Allow only certain types of cookies</li>
                <li>Manage cookie settings for individual websites</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
              <p className="text-gray-600">
                We may update this Cookie Policy from time to time to reflect changes in our
                practices or for operational, legal, or regulatory reasons. We encourage you
                to periodically review this page for the latest information on our cookie practices.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;