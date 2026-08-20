import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("resetEmail");

  const handleSubmit = (e) => {
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

    localStorage.setItem("resetOTP", otp);

    toast.success("OTP accepted");

    navigate("/reset-password");
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
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold">Verify OTP</h2>

            <p className="text-gray-600 dark:text-gray-400 mt-3">
              Enter the 6-digit OTP sent to your email.
            </p>

            {email && <p className="text-sm text-blue-600 mt-2">{email}</p>}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-xl"
          >
            <div>
              <label htmlFor="otp" className="block text-sm font-semibold mb-2">
                OTP
              </label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full px-4 py-3 text-center text-2xl tracking-[0.5em] rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify OTP"}
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
