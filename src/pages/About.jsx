import { FaBullseye, FaRocket, FaUsers } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>About Us | NexAI</title>

        <meta
          name="description"
          content="Learn about NexAI, our mission, vision, and AI-powered solutions that help businesses automate workflows and improve productivity."
        />
      </Helmet>
      <section className="bg-gray-50 dark:bg-gray-900 py-20 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16" data-aos="fade-up">
            <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
              About{" "}
              <span className="text-blue-600 dark:text-blue-400">NexAI</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              NexAI helps businesses automate workflows, improve productivity,
              and unlock the power of Artificial Intelligence through simple,
              powerful, and scalable solutions.
            </p>
          </div>

          {/* Our Story Card */}
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm p-10 mb-16"
            data-aos="fade-up"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Our Story
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Founded with a vision to simplify technology, NexAI empowers
              startups, teams, and enterprises to work smarter. Our platform
              combines modern automation, intelligent analytics, and AI-driven
              solutions to help organizations achieve more in less time.
            </p>
          </div>

          {/* Mission Cards Grid */}
          <div
            className="grid md:grid-cols-3 gap-8 mb-20"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {/* Mission */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-start">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mb-5">
                <FaBullseye size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Make AI accessible, practical, and highly useful for modern
                businesses of every size.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-start">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mb-5">
                <FaRocket size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Build the decentralized future where intelligent automation
                seamlessly powers every corporate workflow.
              </p>
            </div>

            {/* Team */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-start">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mb-5">
                <FaUsers size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                Our Team
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                A highly passionate group of core developers, UI/UX designers,
                and deep AI research experts.
              </p>
            </div>
          </div>

          {/* Professional Call To Action (CTA) Block */}
          <div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center shadow-xl shadow-blue-600/10"
            data-aos="zoom-in"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Join Thousands of Growing Businesses
            </h2>
            <p className="text-blue-100 max-w-xl mx-auto mb-8 text-lg">
              Start your AI-powered journey today and completely transform the
              way your team works.
            </p>
            <button
              onClick={() => navigate("/pricing")}
              className="bg-white text-blue-600 hover:bg-gray-50 active:scale-95 px-8 py-3.5 rounded-xl font-bold transition shadow-md"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
