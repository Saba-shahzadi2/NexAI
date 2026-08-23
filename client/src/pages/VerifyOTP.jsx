import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const VerifyOTP = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please request a new OTP");
      navigate("/forgot-password");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        email,
        otp,
      });

      if (response.data.success) {
        localStorage.setItem("resetOTP", otp);

        toast.success("OTP verified successfully");

        navigate("/reset-password");
      }
    } catch (error) {
      console.error("Verify OTP Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to verify OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Verify OTP | NexAI</title>

        <meta
          name="description"
          content="Verify your NexAI password reset OTP."
        />
      </Helmet>

      <section className="bg-gray-50 dark:bg-gray-900 py-20 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight">
              Verify OTP
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mt-3">
              Enter the 6-digit OTP sent to your email.
            </p>

            {email && (
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                {email}
              </p>
            )}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-xl"
          >
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                OTP
              </label>

              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full px-4 py-3 text-center text-2xl tracking-[0.5em] rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </button>

            <p className="text-center text-gray-600 dark:text-gray-400">
              Wrong email?
              <NavLink
                to="/forgot-password"
                className="text-blue-600 hover:underline ml-1"
              >
                Try again
              </NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default VerifyOTP;
