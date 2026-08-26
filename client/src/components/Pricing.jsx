import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import api from "../api/axios";

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/pricing");

      if (response.data.success) {
        setPlans(response.data.plans || []);
      } else {
        setError("Unable to load pricing plans.");
      }
    } catch (error) {
      console.error("Pricing Fetch Error:", error);

      setError(
        error.response?.data?.message || "Failed to load pricing plans.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (error) {
    return (
      <section className="py-24 bg-gray-50 dark:bg-slate-950 text-center transition-colors">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-red-500 font-medium text-xl mb-4">{error}</div>

          <button
            type="button"
            onClick={fetchPlans}
            className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-lg"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Flexible Pricing Plans
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            Choose the perfect plan to streamline your workflow and unlock the
            true power of AI.
          </p>
        </div>

        {loading ? (
          <div className="animate-pulse h-80 bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800 rounded-3xl flex items-center justify-center">
            <div className="text-gray-400 text-lg font-medium">
              Loading subscription plans...
            </div>
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No pricing plans available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {plans.map((plan) => (
              <div
                key={plan._id}
                data-aos="fade-up"
                className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between h-full ${
                  plan.isPopular
                    ? "bg-gradient-to-b from-slate-900 to-slate-950 dark:from-slate-900 dark:to-slate-900 border-2 border-blue-600 shadow-2xl md:scale-105 md:-translate-y-2 z-20 text-white"
                    : "bg-white dark:bg-slate-900/60 backdrop-blur-md border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 z-10"
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3
                    className={`text-2xl font-black tracking-tight mb-2 ${
                      !plan.isPopular ? "text-gray-900 dark:text-white" : ""
                    }`}
                  >
                    {plan.name}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      plan.isPopular
                        ? "text-slate-300"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span
                      className={`text-5xl font-black tracking-tight ${
                        plan.isPopular
                          ? "text-white"
                          : "text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      {plan.currency}
                      {plan.price}
                    </span>

                    <span
                      className={`text-sm font-semibold ${
                        plan.isPopular
                          ? "text-slate-400"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      / month
                    </span>
                  </div>

                  <ul className="space-y-4 mb-8 border-t pt-6 border-gray-100 dark:border-slate-800/60">
                    {Array.isArray(plan.features) &&
                      plan.features.map((feature, index) => (
                        <li
                          key={`${plan._id}-${index}`}
                          className="flex items-center gap-3 text-sm font-medium"
                        >
                          <FaCheckCircle
                            className={`flex-shrink-0 ${
                              plan.isPopular
                                ? "text-blue-400"
                                : "text-blue-600 dark:text-blue-400"
                            }`}
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

                <button
                  type="button"
                  className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 shadow-md ${
                    plan.isPopular
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20 hover:shadow-xl"
                      : "bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600"
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
