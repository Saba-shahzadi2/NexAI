import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { getTestimonials } from "../api/testimonialAPI";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();

        if (data.success) {
          setTestimonials(data.testimonials || []);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Loved by Teams Worldwide
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Thousands of businesses trust NexAI to automate workflows, increase
            productivity, and scale faster.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && testimonials.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No testimonials available.
          </div>
        )}

        {/* Testimonials */}
        {!loading && testimonials.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const rating = testimonial.rating || 5;

              return (
                <div
                  key={testimonial._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="bg-white dark:bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex gap-1 text-amber-400 dark:text-yellow-500 mb-6 group-hover:scale-105 transition-transform duration-300 origin-left">
                      {[...Array(rating)].map((_, starIndex) => (
                        <FaStar
                          key={`${testimonial._id}-star-${starIndex}`}
                          size={18}
                        />
                      ))}
                    </div>

                    {/* Review */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic mb-8">
                      "{testimonial.review}"
                    </p>
                  </div>

                  {/* User */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-50 dark:border-slate-800/60">
                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-md flex-shrink-0 group-hover:rotate-6 transition-transform duration-300">
                      {testimonial.avatar ||
                        testimonial.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h4 className="font-bold text-base text-gray-900 dark:text-gray-100">
                        {testimonial.name}
                      </h4>

                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
