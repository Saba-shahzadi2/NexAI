const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Account",
      desc: "Sign up in minutes and easily set up your personalized AI workspace.",
    },
    {
      number: "02",
      title: "Connect Your Tools",
      desc: "Seamlessly integrate all your favorite business apps and database services.",
    },
    {
      number: "03",
      title: "Automate Work",
      desc: "Sit back and let advanced AI agents handle repetitive operations automatically.",
    },
  ];

  return (
    // Fixed: Standardized global background matching to slate-950 for flawless theme loop
    <section className="py-24 bg-white dark:bg-slate-950 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Subtle design glow background blob */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            Get started with NexAI in three simple steps and supercharge your
            business efficiency.
          </p>
        </div>

        {/* Steps Container Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Pro Feature: Desktop Connector Flow Line */}
          <div className="hidden md:block absolute top-[68px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-transparent border-t-2 border-dashed border-gray-200 dark:border-slate-800 pointer-events-none z-0"></div>

          {/* Map through each steps sequentially */}
          {steps.map((step, index) => (
            <div
              key={step.number}
              data-aos="fade-up"
              data-aos-delay={index * 150} // Smooth staggered rendering speed sequence
              className="relative bg-white dark:bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center group z-10"
            >
              {/* Dynamic Number Badge on Top Corner for extra context */}
              <span className="absolute top-4 right-5 text-xs font-bold text-gray-300 dark:text-slate-700 tracking-widest uppercase">
                Step {step.number}
              </span>

              {/* Modern Gradient Step Counter Badge Container */}
              <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-6 shadow-inner border border-blue-100/40 dark:border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                  {step.number}
                </span>
              </div>

              {/* Title with micro-interaction hover color text */}
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {step.title}
              </h3>

              {/* Description Body Text */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
