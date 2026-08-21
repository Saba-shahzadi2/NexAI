import { useState, useEffect } from "react";
import { FaUsers, FaGlobe, FaTasks, FaChartLine } from "react-icons/fa";

const Stats = () => {
  const [stats, setStats] = useState({
    users: 0,
    uptime: 90.0, // Clean start for percentage
    countries: 0,
    tasks: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        if (
          prev.users >= 50000 &&
          prev.uptime >= 99.9 &&
          prev.countries >= 120 &&
          prev.tasks >= 1000000
        ) {
          clearInterval(interval);
          return prev;
        }

        return {
          users: Math.min(prev.users + 2000, 50000),
          uptime: Math.min(prev.uptime + 0.4, 99.9), // Smooth transition to 99.9%
          countries: Math.min(prev.countries + 5, 120),
          tasks: Math.min(prev.tasks + 40000, 1000000),
        };
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const data = [
    {
      icon: <FaUsers size={28} />,
      value: `${stats.users.toLocaleString()}+`,
      label: "Active Users",
    },
    {
      icon: <FaChartLine size={28} />,
      value: `${stats.uptime.toFixed(1)}%`,
      label: "Uptime Guarantee",
    },
    {
      icon: <FaGlobe size={28} />,
      value: `${stats.countries}+`,
      label: "Countries Supported",
    },
    {
      icon: <FaTasks size={28} />,
      value: `${stats.tasks.toLocaleString()}+`,
      label: "Tasks Automated",
    },
  ];

  return (
    // Fixed: Premium Indigo to Blue corporate gradient background
    <section className="py-24 bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 relative overflow-hidden text-white">
      {/* Decorative background glow shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-blue-300 uppercase tracking-widest text-xs font-bold bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-400/20">
            Trusted Worldwide
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight mt-4">
            Trusted Results at Scale
          </h2>
          <p className="text-blue-100/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Businesses around the world rely on NexAI to improve efficiency,
            automate workflows, and accelerate growth.
          </p>
        </div>

        {/* Stats Glassmorphism Grid */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {data.map((item) => (
            <div
              key={item.label}
              className="bg-white/[0.06] backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10 hover:border-white/20 hover:bg-white/[0.1] hover:-translate-y-1.5 transition-all duration-300 shadow-xl flex flex-col items-center justify-center"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-blue-300 mb-4 shadow-inner">
                {item.icon}
              </div>

              {/* Counter Value */}
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                {item.value}
              </h3>

              {/* Label */}
              <p className="text-blue-200/80 text-sm font-medium tracking-wide">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
