import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError("");

      // // Dummy API call Simulation
      // await fetch("https://jsonplaceholder.typicode.com/posts");

      setPlans([
        {
          name: "Starter",
          price: "$9",
          desc: "Perfect for freelancers and small teams starting their AI journey.",
          features: [
            "1 Project Workspace",
            "Standard Email Support",
            "Basic Workflow Analytics",
          ],
          isPopular: false,
        },
        {
          name: "Pro",
          price: "$29",
          desc: "The ultimate choice for growing businesses and power users.",
          features: [
            "Unlimited Active Projects",
            "24/7 Priority Chat Support",
            "Advanced Real-time Analytics",
          ],
          isPopular: true, // Card spotlight control flag
        },
        {
          name: "Enterprise",
          price: "$99",
          desc: "Tailored infrastructure and custom controls for large teams.",
          features: [
            "Custom Customizations",
            "Dedicated Support Manager",
            "Enterprise SLA Guarantee",
          ],
          isPopular: false,
        },
      ]);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to load pricing plans.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <section className="py-24 bg-gray-50 dark:bg-slate-950 text-center transition-colors">
        <div className="text-red-500 font-medium text-xl mb-4">{error}</div>
        <button
          onClick={fetchPlans}
          className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/10"
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Decorative corporate blur bubble behind cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Heading Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Flexible Pricing Plans
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            Choose the perfect plan to streamline your workflow and unlock the
            true power of AI.
          </p>
        </div>

        {/* Loading Pulse State */}
        {loading ? (
          <div className="animate-pulse h-80 bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800 rounded-3xl flex items-center justify-center text-gray-400 text-lg font-medium">
            Loading subscription models...
          </div>
        ) : (
          /* Cards Layout Grid Container */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {plans.map((plan) => (
              <div
                key={plan.name}
                data-aos="fade-up"
                className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between h-full ${
                  plan.isPopular
                    ? "bg-gradient-to-b from-slate-900 to-slate-950 dark:from-slate-900 dark:to-slate-900 border-2 border-blue-600 shadow-2xl md:scale-105 md:-translate-y-2 z-20 text-white"
                    : "bg-white dark:bg-slate-900/60 backdrop-blur-md border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 z-10"
                }`}
              >
                {/* Popular Spotlight Badge Ribbon on Header */}
                {plan.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                )}

                <div>
                  {/* Plan Identification Metadata */}
                  <h3
                    className={`text-2xl font-black tracking-tight mb-2 ${!plan.isPopular && "text-gray-900 dark:text-white"}`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-6 ${plan.isPopular ? "text-slate-300" : "text-gray-500 dark:text-gray-400"}`}
                  >
                    {plan.desc}
                  </p>

                  {/* Core Interactive Price Value Tag */}
                  <div className="flex items-baseline gap-1 mb-8">
                    <span
                      className={`text-5xl font-black tracking-tight ${plan.isPopular ? "text-white" : "text-blue-600 dark:text-blue-400"}`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm font-semibold ${plan.isPopular ? "text-slate-400" : "text-gray-400 dark:text-gray-500"}`}
                    >
                      / month
                    </span>
                  </div>

                  {/* Premium Bullet Features list item components */}
                  <ul className="space-y-4 mb-8 border-t pt-6 border-gray-100 dark:border-slate-800/60">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm font-medium"
                      >
                        <FaCheckCircle
                          className={`flex-shrink-0 ${plan.isPopular ? "text-blue-400" : "text-blue-600 dark:text-blue-400"}`}
                          size={16}
                        />
                        <span
                          className={
                            plan.isPopular
                              ? "text-slate-200"
                              : "text-gray-600 dark:text-gray-300"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highly Responsive Dynamic Action Call to Button */}
                <button
                  className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 shadow-md ${
                    plan.isPopular
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20 hover:shadow-xl"
                      : "bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
