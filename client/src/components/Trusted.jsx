import { useEffect, useState } from "react";
import { getTrustedCompanies } from "../api/trustedAPI";

const Trusted = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getTrustedCompanies();

        if (data?.success) {
          setCompanies(data.companies || []);
        }
      } catch (error) {
        console.error("Trusted Companies Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-24 text-gray-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center" data-aos="fade-up">
          <span className="inline-block rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 dark:border-blue-500/10 dark:bg-blue-950/40 dark:text-blue-400">
            Modern AI Ecosystem
          </span>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Built for Modern Teams
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
            NexAI is designed to fit naturally into modern productivity,
            collaboration, and AI-powered workflows.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-2xl border border-gray-200 bg-gray-50 dark:border-slate-800 dark:bg-slate-900"
              />
            ))}
          </div>
        ) : companies.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-10 text-center text-gray-500 dark:border-slate-800 dark:bg-slate-900 dark:text-gray-400">
            No companies available.
          </div>
        ) : (
          <div
            className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {companies.map((company) => (
              <div
                key={company._id}
                className="group flex min-h-32 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-blue-500/30 dark:hover:bg-slate-900"
              >
                {/* Logo */}
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-9 w-auto max-w-[110px] object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    {company.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}

                {/* Name */}
                <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Trusted;
