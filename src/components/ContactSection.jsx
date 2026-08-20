import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${API_URL}/contact`, {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        message: formData.message.trim(),
      });

      if (response.data.success) {
        toast.success(response.data.message || "Message sent successfully");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Contact Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to send message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-xl mx-auto px-6" data-aos="fade-up">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold tracking-tight mb-3">
            Contact Us
          </h2>

          <p className="text-gray-600 dark:text-gray-400">
            Have questions? We'd love to hear from you. Drop us a message below.
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-xl"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="contact-name"
              className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
            >
              Your Name
            </label>

            <input
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="contact-email"
              className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>

            <input
              id="contact-email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="contact-message"
              className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
            >
              Message
            </label>

            <textarea
              id="contact-message"
              rows="4"
              placeholder="Type your message here..."
              name="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value,
                })
              }
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition resize-none"
            ></textarea>
          </div>

          {/* Submit */}
          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
