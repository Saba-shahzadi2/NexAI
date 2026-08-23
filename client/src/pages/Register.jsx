import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
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

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (name.length < 2) {
      toast.error("Name must be at least 2 characters");
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

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Registration failed");
      }

      // Save authentication data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("authChange"));

      toast.success(data.message || "Registration successful");

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      // User is already authenticated
      navigate("/");
    } catch (error) {
      console.error("Register Error:", error);

      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | NexAI</title>

        <meta
          name="description"
          content="Create an account with NexAI to access our AI-powered solutions and automate your workflows."
        />
      </Helmet>

      <section className="bg-gray-50 dark:bg-gray-900 py-20 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight mb-3">
              Register an Account
            </h2>

            <p className="text-gray-600 dark:text-gray-400">
              Join NexAI today and start automating your workflows with our
              powerful AI solutions. Create your account now to unlock the full
              potential of NexAI and boost your productivity.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-xl"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                Your Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                minLength={2}
                autoComplete="name"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                Your Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                autoComplete="email"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                Your Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  minLength={8}
                  autoComplete="new-password"
                  required
                  onChange={handleChange}
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
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600 dark:text-gray-400">
              Already have an account?
              <NavLink
                to="/login"
                className="text-blue-600 hover:underline ml-1"
              >
                Sign In
              </NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
