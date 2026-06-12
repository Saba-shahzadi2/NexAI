import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | NexAI</title>
        <meta
          name="description"
          content="Read NexAI Privacy Policy to understand how we collect, use, and protect your data."
        />
      </Helmet>

      <section className="bg-gray-50 dark:bg-gray-900 py-20 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-3">
              Your privacy is important to us. This policy explains how NexAI
              handles your data.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/50">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We may collect personal information such as name, email address,
                and usage data to improve our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                2. How We Use Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We use collected data to provide, maintain, and improve NexAI
                services and user experience.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">3. Data Protection</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We implement security measures to protect your data from
                unauthorized access or misuse.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">4. Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300">
                NexAI may use cookies to enhance user experience and analyze
                website traffic.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                5. Third-Party Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We may use third-party tools that help us operate and improve
                our platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about this Privacy Policy, contact us
                at support@nexai.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
