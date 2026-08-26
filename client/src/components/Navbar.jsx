import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { SiNotion } from "react-icons/si";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { darkMode, setDarkMode } = useTheme();

  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const isAdmin = isAuthenticated && user?.role === "admin";

  // ==========================================
  // NAVIGATION ITEMS
  // ==========================================

  const navItems = [
    {
      to: "/",
      label: "Home",
    },
    {
      to: "/features",
      label: "Features",
    },
    {
      to: "/pricing",
      label: "Pricing",
    },
    {
      to: "/about",
      label: "About",
    },
    {
      to: "/contact",
      label: "Contact",
    },
  ];

  // ==========================================
  // SCROLL EFFECT
  // ==========================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ==========================================
  // MOBILE BODY SCROLL LOCK
  // ==========================================

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    logout();

    setIsOpen(false);

    toast.success("Logged out successfully");

    navigate("/", {
      replace: true,
    });
  };

  // ==========================================
  // CLOSE MOBILE MENU
  // ==========================================

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  // ==========================================
  // NAV LINK STYLE
  // ==========================================

  const navLinkClass = ({ isActive }) =>
    `relative font-medium transition-colors duration-200 ${
      isActive
        ? "text-blue-600 dark:text-blue-400"
        : "text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
    }`;

  // ==========================================
  // DASHBOARD NAV LINK STYLE
  // ==========================================

  const dashboardLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition ${
      isActive
        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
        : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-md"
          : "bg-white/90 dark:bg-gray-900/90"
      }`}
    >
      {/* ========================================
          NAVBAR CONTAINER
      ======================================== */}

      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* ======================================
            LOGO
        ====================================== */}

        <NavLink
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2 text-blue-600"
        >
          <SiNotion size={32} />

          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            NexAI
          </span>
        </NavLink>

        {/* ======================================
            DESKTOP NAVIGATION
        ====================================== */}

        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}

          {/* Admin Dashboard */}

          {isAdmin && (
            <NavLink to="/dashboard" className={dashboardLinkClass}>
              <FaTachometerAlt />
              <span>Dashboard</span>
            </NavLink>
          )}
        </div>

        {/* ======================================
            DESKTOP RIGHT CONTROLS
        ====================================== */}

        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}

          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? (
              <FaSun className="text-amber-400 text-lg" />
            ) : (
              <FaMoon className="text-gray-700 dark:text-gray-200 text-lg" />
            )}
          </button>

          {/* ====================================
              LOGGED OUT
          ==================================== */}

          {!isAuthenticated ? (
            <>
              {/* Login */}

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Login
              </button>

              {/* Get Started */}

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-sm"
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              {/* ====================================
                  USER INFORMATION
              ==================================== */}

              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <FaUserCircle className="text-blue-600 text-xl" />

                <div className="flex flex-col">
                  <span className="font-medium max-w-[160px] truncate">
                    {user?.name}
                  </span>

                  {isAdmin && (
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                      Administrator
                    </span>
                  )}
                </div>
              </div>

              {/* Logout */}

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-950/70 transition"
              >
                <FaSignOutAlt />

                <span>Logout</span>
              </button>
            </>
          )}
        </div>

        {/* ======================================
            MOBILE CONTROLS
        ====================================== */}

        <div className="md:hidden flex items-center gap-3">
          {/* Theme */}

          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Toggle dark mode"
            className="p-2"
          >
            {darkMode ? (
              <FaSun className="text-amber-400 text-lg" />
            ) : (
              <FaMoon className="text-gray-700 dark:text-white text-lg" />
            )}
          </button>

          {/* Menu */}

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="p-2"
          >
            <FaBars size={22} className="text-gray-800 dark:text-white" />
          </button>
        </div>
      </div>

      {/* ========================================
          MOBILE MENU
      ======================================== */}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/40 z-40"
            />

            {/* Mobile Drawer */}

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="fixed top-0 right-0 w-72 h-full bg-white dark:bg-gray-900 z-50 shadow-2xl p-6 overflow-y-auto"
            >
              {/* Close Button */}

              <div className="flex justify-end mb-8">
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  className="p-2 text-gray-700 dark:text-white hover:text-blue-600 transition"
                >
                  <FaTimes size={22} />
                </button>
              </div>

              {/* ==================================
                  MOBILE USER INFO
              ================================== */}

              {isAuthenticated && user && (
                <div className="mb-8 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <FaUserCircle className="text-blue-600 text-3xl flex-shrink-0" />

                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">
                        {user.name}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>

                      {isAdmin && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
                          Administrator
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ==================================
                  MOBILE NAVIGATION
              ================================== */}

              <div className="flex flex-col gap-5">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeMobileMenu}
                    className={navLinkClass}
                  >
                    {item.label}
                  </NavLink>
                ))}

                {/* Mobile Admin Dashboard */}

                {isAdmin && (
                  <NavLink
                    to="/dashboard"
                    onClick={closeMobileMenu}
                    className={dashboardLinkClass}
                  >
                    <FaTachometerAlt />

                    <span>Admin Dashboard</span>
                  </NavLink>
                )}
              </div>

              {/* ==================================
                  MOBILE AUTH BUTTONS
              ================================== */}

              <div className="mt-8 flex flex-col gap-3">
                {!isAuthenticated ? (
                  <>
                    {/* Login */}

                    <button
                      type="button"
                      onClick={() => {
                        navigate("/login");
                        closeMobileMenu();
                      }}
                      className="w-full border border-gray-300 dark:border-gray-700 py-2.5 rounded-xl text-gray-800 dark:text-white hover:border-blue-500 hover:text-blue-600 transition"
                    >
                      Login
                    </button>

                    {/* Get Started */}

                    <button
                      type="button"
                      onClick={() => {
                        navigate("/register");
                        closeMobileMenu();
                      }}
                      className="w-full bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition"
                    >
                      Get Started
                    </button>
                  </>
                ) : (
                  /* Logout */

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 py-2.5 rounded-xl hover:bg-red-100 dark:hover:bg-red-950/70 transition"
                  >
                    <FaSignOutAlt />

                    <span>Logout</span>
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
