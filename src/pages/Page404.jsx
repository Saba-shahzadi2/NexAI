import { NavLink } from "react-router-dom";

const Page404 = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 px-6">
      <div className="text-center max-w-xl">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083089/404.gif"
            alt="404 Not Found"
            className="w-full max-w-md"
          />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold mt-6">Oops! Page Not Found</h1>

        {/* Description */}
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        <p className="mt-2 text-gray-500 dark:text-gray-500">
          Let’s get you back to a safe place.
        </p>

        {/* Button */}
        <NavLink
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Back to Home
        </NavLink>
      </div>
    </section>
  );
};

export default Page404;
