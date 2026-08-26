import { useEffect, useState } from "react";
import { getPublicStats } from "../api/statsAPI";

const Stats = () => {
  const [stats, setStats] = useState({
    users: 0,
    uptime: 99.9,
    countries: 0,
    tasks: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const data = await getPublicStats();

        if (isMounted && data?.success && data?.stats) {
          setStats({
            users: Number(data.stats.users) || 0,
            uptime: Number(data.stats.uptime) || 99.9,
            countries: Number(data.stats.countries) || 0,
            tasks: Number(data.stats.tasks) || 0,
          });
        }
      } catch (error) {
        console.error("Failed to fetch public stats:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const statItems = [
    {
      value: stats.users,
      label: "Active Users",
      suffix: "+",
      icon: "👥",
    },
    {
      value: stats.uptime.toFixed(1),
      label: "Uptime",
      suffix: "%",
      icon: "⚡",
    },
    {
      value: stats.countries,
      label: "Countries",
      suffix: "+",
      icon: "🌎",
    },
    {
      value: stats.tasks,
      label: "Tasks Completed",
      suffix: "+",
      icon: "✓",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 dark:bg-gray-950">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            NexAI by the numbers
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Trusted by users around the world
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Powerful AI tools built for performance, reliability, and scale.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statItems.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >
              {/* Icon */}
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl transition-transform duration-300 group-hover:scale-110 dark:bg-blue-500/10">
                {stat.icon}
              </div>

              {/* Value */}
              {loading ? (
                <div className="mx-auto h-10 w-28 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
              ) : (
                <p className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  {Number(stat.value).toLocaleString()}
                  <span className="text-blue-600 dark:text-blue-400">
                    {stat.suffix}
                  </span>
                </p>
              )}

              {/* Label */}
              <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
