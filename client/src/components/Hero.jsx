import heroImage from "../assets/photo-1551288049-bebda4e38f71.avif";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* Left Content */}
        <div data-aos="fade-right" className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
            AI-Powered Solutions for{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Modern Businesses
            </span>
          </h1>

          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Streamline workflows, automate repetitive tasks, and boost
            productivity with the power of artificial intelligence.
          </p>

          <div
            className="flex flex-wrap gap-4"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/10 transition-all duration-300"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/pricing")}
              className="border border-gray-300 dark:border-gray-700 px-7 py-3 rounded-xl font-semibold text-gray-800 dark:text-white hover:border-blue-500 transition"
            >
              View Pricing
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div
          data-aos="fade-left"
          data-aos-delay="200"
          className="relative flex justify-center"
        >
          {/* Glow Effect */}
          <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>

          <img
            src={heroImage}
            alt="NexAI Dashboard"
            className="relative z-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 object-cover hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
