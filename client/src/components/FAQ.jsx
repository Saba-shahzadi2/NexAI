import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { getFAQs } from "../api/faqAPI";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getFAQs();

      if (data.success) {
        setFaqs(data.faqs || []);
      } else {
        setError("Unable to load frequently asked questions.");
      }
    } catch (err) {
      console.error("FAQ Fetch Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load frequently asked questions.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div data-aos="fade-up" className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            Got questions? We've got answers. Everything you need to know about
            NexAI.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800 rounded-2xl p-10 text-center">
            <div className="w-10 h-10 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Loading FAQs...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-white dark:bg-slate-900/60 border border-red-200 dark:border-red-900/40 rounded-2xl p-8 text-center">
            <p className="text-red-500 font-medium">{error}</p>

            <button
              type="button"
              onClick={fetchFAQs}
              className="mt-5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && faqs.length === 0 && (
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800 rounded-2xl p-10 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No FAQs available at the moment.
            </p>
          </div>
        )}

        {/* FAQ List */}
        {!loading && !error && faqs.length > 0 && (
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = open === index;

              return (
                <div
                  key={faq._id}
                  className={`bg-white dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${
                    isOpen
                      ? "border-blue-500/30 dark:border-blue-500/30 shadow-md shadow-blue-500/[0.01]"
                      : "border-gray-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700/60"
                  }`}
                >
                  {/* Question */}
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="w-full flex justify-between items-center p-6 text-left font-bold text-lg gap-4 hover:bg-gray-50/50 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    <span
                      className={`transition-colors duration-200 ${
                        isOpen
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-800 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white"
                      }`}
                    >
                      {faq.question}
                    </span>

                    <FaChevronDown
                      className={`transition-transform duration-300 flex-shrink-0 ${
                        isOpen
                          ? "rotate-180 text-blue-600 dark:text-blue-400"
                          : "text-gray-400 dark:text-slate-500 group-hover:text-gray-500 dark:group-hover:text-slate-400"
                      }`}
                      size={16}
                    />
                  </button>

                  {/* Answer */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQ;
