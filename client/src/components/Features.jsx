import { useEffect, useState } from "react";
import { FiZap, FiBarChart2, FiShield, FiStar } from "react-icons/fi";
import { getFeatures } from "../api/featureAPI";

const ICONS = {
  FiZap,
  FiBarChart2,
  FiShield,
};

const Features = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFeatures = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getFeatures();

      if (data.success) {
        setFeatures(data.features || []);
      } else {
        setError("Unable to load features.");
      }
    } catch (err) {
      console.error("Features Fetch Error:", err);

      setError(err.response?.data?.message || "Unable to load features.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
            Powerful Features
          </h2>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Everything you need to streamline your workflow, increase
            productivity, and grow your business with AI.
          </p>
        </div>

        {/* Loading */}

        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="text-center py-16">
            <p className="text-red-500 font-medium">{error}</p>

            <button
              type="button"
              onClick={fetchFeatures}
              className="mt-5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}

        {!loading && !error && features.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">
              No features available.
            </p>
          </div>
        )}

        {/* Features */}

        {!loading && !error && features.length > 0 && (
          <div
            data-aos="zoom-in"
            data-aos-delay="100"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature) => {
              const Icon = ICONS[feature.icon] || FiStar;

              return (
                <div
                  key={feature._id}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Icon */}

                  <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mb-6 inline-flex">
                    <Icon size={32} />
                  </div>

                  {/* Title */}

                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                    {feature.title.replace(/^Title:\s*/i, "")}
                  </h3>

                  {/* Description */}

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description.replace(/^Description:\s*/i, "")}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Features;
