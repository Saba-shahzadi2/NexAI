import { useEffect, useState } from "react";
import { getHowItWorks } from "../api/howItWorksAPI";

const HowItWorks = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const data = await getHowItWorks();

        if (data?.success) {
          setSteps(data.steps || []);
        }
      } catch (error) {
        console.error("How It Works Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gray-50 py-24 text-gray-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center" data-aos="fade-up">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            Simple process
          </span>

          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            How It Works
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
            Get started with NexAI in three simple steps and transform the way
            you work with AI.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-3xl border border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              />
            ))}
          </div>
        ) : steps.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-gray-400">
            No steps available.
          </div>
        ) : (
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Connector */}
            <div className="pointer-events-none absolute left-[16%] right-[16%] top-[52px] hidden h-px bg-gradient-to-r from-blue-500/20 via-indigo-500/60 to-blue-500/20 md:block" />

            {steps.map((step, index) => (
              <div
                key={step._id || index}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="group relative z-10 flex flex-col items-center rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-blue-500/30"
              >
                {/* Step badge */}
                <div className="absolute right-5 top-5 rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:bg-slate-800 dark:text-gray-400">
                  Step {String(step.number).padStart(2, "0")}
                </div>

                {/* Number */}
                <div className="relative mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-110">
                  <div className="absolute inset-1 rounded-full bg-white dark:bg-slate-900" />

                  <span className="relative text-2xl font-black text-blue-600 dark:text-blue-400">
                    {String(step.number).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
                  {step.description}
                </p>

                {/* Bottom accent */}
                <div className="mt-7 h-1 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-300 group-hover:w-20" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;
