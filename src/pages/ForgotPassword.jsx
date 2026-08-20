import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      const normalizedEmail = email.trim().toLowerCase();

      const response = await axios.post(`${API_URL}/auth/forgot-password`, {
        email: normalizedEmail,
      });

      if (response.data.success) {
        localStorage.setItem("resetEmail", normalizedEmail);
        localStorage.removeItem("resetOTP");

        toast.success("OTP sent to your email");

        setEmail("");

        navigate("/verify-otp");
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to send OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | NexAI</title>
        <meta
          name="description"
          content="Reset your NexAI account password securely."
        />
      </Helmet>

      <section className="bg-gray-50 dark:bg-gray-900 py-20 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight mb-3">
              Forgot Your Password?
            </h2>

            <p className="text-gray-600 dark:text-gray-400">
              Enter your email and we'll send you a password reset OTP.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-xl"
          >
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

            <p className="text-center text-gray-600 dark:text-gray-400">
              Remember your password?
              <NavLink
                to="/login"
                className="text-blue-600 hover:underline ml-1"
              >
                Login
              </NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
