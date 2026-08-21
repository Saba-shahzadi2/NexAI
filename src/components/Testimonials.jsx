import { FaStar } from "react-icons/fa";

// Pro Tip: Static data ko component scope se bahar rakhein taaki unnecessary rerenders par memory allocate na ho
const REVIEWS_DATA = [
  {
    name: "Ali Khan",
    role: "CEO, TechFlow",
    review:
      "NexAI transformed our workflow and saved countless hours every week. The automation setups are incredibly intuitive.",
    avatar: "AK",
    delay: "100",
  },
  {
    name: "Sarah Ahmed",
    role: "Product Manager",
    review:
      "The best AI productivity platform I've used so far. Highly recommended for teams looking to scale fast.",
    avatar: "SA",
    delay: "200",
  },
  {
    name: "John Smith",
    role: "Startup Founder",
    review:
      "Simple, powerful, and incredibly effective. Our core operations and team productivity have spiked drastically.",
    avatar: "JS",
    delay: "300",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Subtle brand glow behind cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Loved by Teams Worldwide
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-400 text-lg">
            Thousands of businesses trust NexAI to automate workflows, increase
            productivity, and scale faster.
          </p>
        </div>

        {/* Testimonials Grid Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((review) => (
            <div
              key={review.name}
              data-aos="fade-up"
              data-aos-delay={review.delay}
              className="bg-white dark:bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Fixed Star Ratings Color, Alignment & Unique Keys */}
                <div className="flex gap-1 text-amber-400 dark:text-yellow-500 mb-6 group-hover:scale-105 transition-transform duration-300 origin-left">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={`${review.name}-star-${index}`} size={18} />
                  ))}
                </div>

                {/* Readable Review Paragraph */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic mb-8">
                  "{review.review}"
                </p>
              </div>

              {/* User Bio Section */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-50 dark:border-slate-800/60">
                {/* Modernized Avatar with subtle slate/blue gradient */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-md flex-shrink-0 group-hover:rotate-6 transition-transform duration-300">
                  {review.avatar}
                </div>

                <div>
                  <h4 className="font-bold text-base text-gray-900 dark:text-gray-100">
                    {review.name}
                  </h4>
                  {/* Fixed role contrast for Dark Mode */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
