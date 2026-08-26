import { useState } from "react";
import { FiMenu } from "react-icons/fi";

import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-4">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Open admin menu"
        >
          <FiMenu size={24} />
        </button>

        <div className="ml-3">
          <p className="font-bold text-gray-900 dark:text-white">NexAI Admin</p>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Administration Panel
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen pt-16 lg:pt-0">{children}</main>
    </div>
  );
};

export default AdminLayout;
