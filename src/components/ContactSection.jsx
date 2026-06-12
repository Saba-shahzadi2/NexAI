import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Message sent successfully");

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
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

      {/* Professional Styled Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-xl"
      >
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Your Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            type="email"
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Message
          </label>
          <textarea
            rows="4"
            placeholder="Type your message here..."
            name="message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition resize-none"
            required
          ></textarea>
        </div>

        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
};

export default ContactSection;
