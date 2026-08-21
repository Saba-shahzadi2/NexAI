import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const email = localStorage.getItem("resetEmail");
  const otp = localStorage.getItem("resetOTP");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      toast.error("Please request a new password reset OTP");
      navigate("/forgot-password");
      return;
    }

    if (!formData.password || !formData.confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        email,
        otp,
        newPassword: formData.password,
      });

      if (response.data.success) {
        toast.success(response.data.message || "Password reset successfully");

        localStorage.removeItem("resetEmail");
        localStorage.removeItem("resetOTP");

        setFormData({
          password: "",
          confirmPassword: "",
        });

        navigate("/login");
      }
    } catch (error) {
      console.error("Reset Password Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to reset password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password | NexAI</title>
        <meta
          name="description"
          content="Reset your NexAI account password securely."
        />
      </Helmet>

      <section className="bg-gray-50 dark:bg-gray-900 py-20 text-gray-900 dark:text-white">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold">Reset Password</h2>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Enter your new password below.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-xl"
          >
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                New Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={formData.password}
                  minLength={8}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                minLength={8}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <p className="text-center text-gray-600 dark:text-gray-400">
              Back to{" "}
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

export default ResetPassword;
