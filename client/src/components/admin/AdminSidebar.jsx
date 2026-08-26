import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  FiGrid,
  FiDollarSign,
  FiUsers,
  FiMail,
  FiLogOut,
  FiX,
  FiShield,
  FiStar,
  FiHelpCircle,
  FiList,
  FiMessageSquare,
} from "react-icons/fi";

const AdminSidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FiGrid,
    },
    {
      name: "Pricing",
      path: "/dashboard/pricing",
      icon: FiDollarSign,
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: FiUsers,
    },
    {
      name: "Contacts",
      path: "/dashboard/contacts",
      icon: FiMail,
    },
    {
      name: "FAQ",
      path: "/dashboard/faq",
      icon: FiHelpCircle,
    },
    {
      name: "Features",
      path: "/dashboard/features",
      icon: FiStar,
    },
    {
      name: "Testimonials",
      path: "/dashboard/testimonials",
      icon: FiMessageSquare,
    },
    {
      name: "How It Works",
      path: "/dashboard/how-it-works",
      icon: FiList,
    },
  ];

  const handleLogout = () => {
    logout();
    onClose();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          flex h-screen w-72 flex-col
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-800
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="h-20 flex-shrink-0 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <FiShield size={21} />
            </div>

            <div className="text-left">
              <h1 className="font-extrabold text-lg text-gray-900 dark:text-white">
                NexAI
              </h1>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Admin Panel
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close admin menu"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 pb-6">
          <p className="px-3 py-2 mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            Management
          </p>

          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  <Icon size={20} className="flex-shrink-0" />

                  <span className="truncate">{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            <FiLogOut size={20} className="flex-shrink-0" />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
