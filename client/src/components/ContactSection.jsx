import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";
import { submitContact } from "../api/contactAPI";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

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
    const message = formData.message.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation
    if (!name || !email || !message) {
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

    if (message.length < 10) {
      toast.error("Message must be at least 10 characters");
      return;
    }

    if (message.length > 5000) {
      toast.error("Message cannot exceed 5000 characters");
      return;
    }

    try {
      setLoading(true);

      const data = await submitContact({
        name,
        email,
        message,
      });

      if (data.success) {
        toast.success(data.message || "Message sent successfully");

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
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold tracking-tight mb-3">
            Contact Us
          </h2>

          <p className="text-gray-600 dark:text-gray-400">
            Have questions? We'd love to hear from you. Drop us a message below.
          </p>
        </div>

        {/* Form */}
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
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              minLength={2}
              maxLength={100}
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
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
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
              name="message"
              rows={5}
              placeholder="Type your message here..."
              value={formData.message}
              onChange={handleChange}
              minLength={10}
              maxLength={5000}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition resize-none"
            />

            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 text-right">
              {formData.message.length}/5000
            </p>
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
