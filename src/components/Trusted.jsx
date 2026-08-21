import {
  FaGoogle,
  FaMicrosoft,
  FaStripe,
  FaSlack,
  FaSpotify,
} from "react-icons/fa";
import { SiNotion } from "react-icons/si";

const Trusted = () => {
  const COMPANIES = [
    {
      name: "Google",
      icon: <FaGoogle size={36} />,
      hoverColor: "group-hover:text-red-500",
    },
    {
      name: "Microsoft",
      icon: <FaMicrosoft size={36} />,
      hoverColor: "group-hover:text-blue-500",
    },
    {
      name: "Stripe",
      icon: <FaStripe size={36} />,
      hoverColor: "group-hover:text-indigo-500",
    },
    {
      name: "Notion",
      icon: <SiNotion size={36} />,
      hoverColor: "group-hover:text-black dark:group-hover:text-white",
    },
    {
      name: "Slack",
      icon: <FaSlack size={36} />,
      hoverColor: "group-hover:text-purple-500",
    },
    {
      name: "Spotify",
      icon: <FaSpotify size={36} />,
      hoverColor: "group-hover:text-green-500",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-xs bg-blue-50 dark:bg-blue-950/40 px-4 py-1.5 rounded-full border border-blue-100/30 dark:border-blue-500/10">
            Trusted Worldwide
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-6 mb-4 tracking-tight">
            Trusted by Industry Leaders
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Thousands of teams and organizations rely on NexAI to streamline
            operations, improve collaboration, and accelerate growth.
          </p>
        </div>

        {/* Logos Responsive Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {COMPANIES.map((company) => (
            <div
              key={company.name}
              className="group bg-gray-50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-100 dark:border-slate-800/80 hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/[0.02] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Dynamic Brand Color Change on Hover */}
              <div
                className={`text-gray-400 dark:text-gray-500 transition-colors duration-300 ${company.hoverColor}`}
              >
                {company.icon}
              </div>

              {/* Company Name */}
              <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trusted;
