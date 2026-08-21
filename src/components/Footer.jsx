import { SiNotion } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-12 bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:opacity-90 transition-opacity"
          >
            <SiNotion size={28} />
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              NexAI
            </span>
          </NavLink>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <NavLink
              to="/features"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Features
            </NavLink>

            <NavLink
              to="/pricing"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Pricing
            </NavLink>

            <NavLink
              to="/contact"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Contact
            </NavLink>

            <NavLink
              to="/privacy-policy"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </NavLink>

            <NavLink
              to="/terms-conditions"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Terms & Conditions
            </NavLink>
          </div>

          {/* Social Links */}
          <div className="flex gap-5 text-gray-400 dark:text-gray-500">
            <a
              href="https://github.com/Saba-shahzadi2/NexAI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FaGithub size={22} />
            </a>

            <a
              href="https://www.linkedin.com/in/sabashahzadi-mern/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FaLinkedin size={22} />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 dark:border-gray-800 mt-8 pt-6 text-center text-xs text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} NexAI. All rights reserved.
          <br />
          Crafted with ❤️ by Saba Shahzadi.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
