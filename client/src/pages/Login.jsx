import { useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const Login = () => {
  const navigate = useNavigate();

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
      toast.error("Please enter a valid email");
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

      // Save authentication data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(data.message || "Login successful");

      // Clear form
      setFormData({
        email: "",
        password: "",
      });

      // Redirect to home
      navigate("/");
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
          content="Login to your NexAI account to access AI-powered solutions and automate your workflows."
        />
      </Helmet>

      <section className="bg-gray-50 dark:bg-gray-900 py-20 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight mb-3">
              Login to Your Account
            </h2>

            <p className="text-gray-600 dark:text-gray-400">
              Welcome back to NexAI. Enter your credentials to continue using
              our AI-powered platform.
            </p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-xl"
          >
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
                placeholder="john@example.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                Password
              </label>

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
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition pr-20"
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="mt-2 text-right">
                <NavLink
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </NavLink>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* Register Link */}
            <p className="text-center text-gray-600 dark:text-gray-400">
              Don't have an account?
              <NavLink
                to="/register"
                className="text-blue-600 hover:underline ml-1"
              >
                Register
              </NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
