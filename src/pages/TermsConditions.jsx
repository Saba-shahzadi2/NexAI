import { Helmet } from "react-helmet-async";

const TermsConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | NexAI</title>
        <meta
          name="description"
          content="Read the Terms and Conditions of NexAI to understand our policies, usage rules, and legal agreements."
        />
      </Helmet>

      <section className="bg-gray-50 dark:bg-gray-900 py-20 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-3">
              Please read these terms carefully before using NexAI services.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/50">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                By accessing and using NexAI, you agree to be bound by these
                Terms and Conditions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">2. Use of Service</h2>
              <p className="text-gray-600 dark:text-gray-300">
                You agree to use NexAI only for lawful purposes and in
                accordance with applicable laws.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">3. User Accounts</h2>
              <p className="text-gray-600 dark:text-gray-300">
                You are responsible for maintaining the confidentiality of your
                account credentials.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                4. Service Modifications
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We reserve the right to modify or discontinue services at any
                time without notice.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                5. Limitation of Liability
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                NexAI is not responsible for any damages resulting from the use
                of our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about these Terms, contact us at
                support@nexai.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsConditions;
