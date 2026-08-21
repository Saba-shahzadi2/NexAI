import { FaBolt, FaShieldAlt, FaRobot } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaBolt size={32} />,
      title: "Lightning Fast",
      description:
        "Experience blazing-fast performance with optimized workflows and instant responses.",
    },
    {
      icon: <FaShieldAlt size={32} />,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security keeps your data protected 24/7 with maximum reliability.",
    },
    {
      icon: <FaRobot size={32} />,
      title: "AI Automation",
      description:
        "Automate repetitive tasks and boost productivity using advanced AI technology.",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Powerful Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-300 text-lg">
            Everything you need to streamline your workflow, increase
            productivity, and grow your business with AI.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          data-aos="zoom-in"
          data-aos-delay="100"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left"
            >
              {/* Modern Icon Wrapper with subtle background tint */}
              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mb-6 flex items-center justify-center">
                {feature.icon}
              </div>

              {/* Fixed: Added specific text colors for light/dark mode */}
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
