import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

// Pro Tip: Arrays ko component body se bahar rakhein taaki render cycle memory free rahe
const FAQ_DATA = [
  {
    q: "Is there a free trial?",
    a: "Yes, we offer a 14-day free trial with access to all core features. No credit card required.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. You can cancel your subscription at any time from your dashboard settings without any hidden charges or long-term contracts.",
  },
  {
    q: "Do you offer support?",
    a: "Yes, we provide 24/7 dedicated email and priority live chat support to help you scale your business smoothly.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    // Fixed: Standardized global background matching to slate-950 for seamless screen loop
    <section className="py-24 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Background radial glow shape for high-end SaaS tone */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-3xl pointer-events-none"></div>

      <div data-aos="fade-up" className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            Got questions? We've got answers. Everything you need to know about
            NexAI.
          </p>
        </div>

        {/* Accordion Cards Container */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div
                key={`faq-${index}`}
                className={`bg-white dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${
                  isOpen
                    ? "border-blue-500/30 dark:border-blue-500/30 shadow-md shadow-blue-500/[0.01]"
                    : "border-gray-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700/60"
                }`}
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left font-bold text-lg gap-4 hover:bg-gray-50/50 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Title text hover effect */}
                  <span
                    className={`transition-colors duration-200 ${isOpen ? "text-blue-600 dark:text-blue-400" : "text-gray-800 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white"}`}
                  >
                    {faq.q}
                  </span>

                  {/* Icon rotation animation with active glowing state */}
                  <FaChevronDown
                    className={`transition-transform duration-300 flex-shrink-0 ${
                      isOpen
                        ? "rotate-180 text-blue-600 dark:text-blue-400"
                        : "text-gray-400 dark:text-slate-500 group-hover:text-gray-500 dark:group-hover:text-slate-400"
                    }`}
                    size={16}
                  />
                </button>

                {/* Smooth Animated Dynamic Height Panel */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
