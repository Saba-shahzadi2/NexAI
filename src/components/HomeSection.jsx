import Hero from "./Hero";
import Trusted from "./Trusted";
import Features from "./Features";
import Stats from "./Stats";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import Contact from "../pages/Contact";

const HomeSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Hero />
      <Trusted />
      <Features />
      <Stats />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
    </section>
  );
};

export default HomeSection;
