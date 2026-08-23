import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || "Login failed");
      }

      // Save JWT
      localStorage.setItem("token", data.token);

      // Save user
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update Navbar immediately
      window.dispatchEvent(new Event("authChange"));

      toast.success(data.message || "Login successful");

      // Clear form
      setFormData({
        email: "",
        password: "",
      });

      /*
        If user was redirected to login from a protected page,
        return them there.

        Otherwise go to Home.
      */
      const from = location.state?.from?.pathname || "/";

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        toast.error(
          error.response.data?.message || "Invalid email or password",
        );
      } else if (error.request) {
        toast.error(
          "Unable to connect to server. Please make sure the backend is running.",
        );
      } else {
        toast.error(error.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | NexAI</title>

        <meta
          name="description"
          content="Login to your NexAI account and access powerful AI-powered solutions."
        />
      </Helmet>

      <section className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 pt-28 pb-16">
        <div className="max-w-md mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-8" data-aos="fade-up">
            <h1 className="text-4xl font-extrabold tracking-tight mb-3">
              Welcome Back
            </h1>

            <p className="text-gray-600 dark:text-gray-400">
              Login to your NexAI account and continue your journey.
            </p>
          </div>

          {/* Login Card */}
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700/50"
            data-aos="fade-up"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>

                  <NavLink
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline"
                  >
                    Forgot Password?
                  </NavLink>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    minLength={8}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <FaArrowRight className="text-sm" />
                  </>
                )}
              </button>
            </form>

            {/* Register */}
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?
                <NavLink
                  to="/register"
                  className="ml-1 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Create Account
                </NavLink>
              </p>
            </div>
          </div>

          {/* Security Text */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
            Your account information is securely protected.
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;
