import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import {
  FiUsers,
  FiMail,
  FiTrash2,
  FiRefreshCw,
  FiMessageSquare,
  FiX,
  FiEye,
  FiAlertCircle,
  FiShield,
} from "react-icons/fi";

import {
  getAdminStats,
  getAllUsers,
  getAllContacts,
  deleteUser,
  deleteContact,
} from "../api/adminAPI";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalContacts: 0,
  });

  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deletingUser, setDeletingUser] = useState(null);
  const [deletingContact, setDeletingContact] = useState(null);

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    type: null,
    id: null,
    name: "",
  });

  const [selectedMessage, setSelectedMessage] = useState(null);

  // =========================================================
  // FETCH DASHBOARD DATA
  // =========================================================

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsData, usersData, contactsData] = await Promise.all([
        getAdminStats(),
        getAllUsers(),
        getAllContacts(),
      ]);

      if (statsData.success) {
        setStats(statsData.stats || {});
      }

      if (usersData.success) {
        setUsers(usersData.users || []);
      }

      if (contactsData.success) {
        setContacts(contactsData.contacts || []);
      }
    } catch (err) {
      console.error("Admin Dashboard Error:", err);

      const status = err.response?.status;
      const message = err.response?.data?.message;

      if (status === 401) {
        setError("Your session has expired. Please login again.");
        toast.error("Session expired. Please login again.");
      } else if (status === 403) {
        setError("You do not have permission to access the admin dashboard.");
        toast.error("Admin access required.");
      } else {
        setError(message || "Unable to load dashboard data.");
        toast.error(message || "Unable to load admin dashboard.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // =========================================================
  // DELETE MODAL
  // =========================================================

  const openDeleteModal = (type, id, name) => {
    setDeleteModal({
      open: true,
      type,
      id,
      name,
    });
  };

  const closeDeleteModal = () => {
    if (deletingUser || deletingContact) return;

    setDeleteModal({
      open: false,
      type: null,
      id: null,
      name: "",
    });
  };

  // =========================================================
  // DELETE USER
  // =========================================================

  const handleDeleteUser = async (id) => {
    try {
      setDeletingUser(id);

      const data = await deleteUser(id);

      if (data.success) {
        toast.success("User deleted successfully.");

        setUsers((prev) => prev.filter((user) => user._id !== id));

        setStats((prev) => ({
          ...prev,
          totalUsers: Math.max(0, prev.totalUsers - 1),
        }));
      } else {
        throw new Error(data.message || "Unable to delete user.");
      }
    } catch (err) {
      console.error("Delete User Error:", err);

      toast.error(
        err.response?.data?.message || err.message || "Unable to delete user.",
      );
    } finally {
      setDeletingUser(null);

      setDeleteModal({
        open: false,
        type: null,
        id: null,
        name: "",
      });
    }
  };

  // =========================================================
  // DELETE CONTACT
  // =========================================================

  const handleDeleteContact = async (id) => {
    try {
      setDeletingContact(id);

      const data = await deleteContact(id);

      if (data.success) {
        toast.success("Contact message deleted successfully.");

        setContacts((prev) => prev.filter((contact) => contact._id !== id));

        setStats((prev) => ({
          ...prev,
          totalContacts: Math.max(0, prev.totalContacts - 1),
        }));
      } else {
        throw new Error(data.message || "Unable to delete contact message.");
      }
    } catch (err) {
      console.error("Delete Contact Error:", err);

      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Unable to delete contact message.",
      );
    } finally {
      setDeletingContact(null);

      setDeleteModal({
        open: false,
        type: null,
        id: null,
        name: "",
      });
    }
  };

  // =========================================================
  // CONFIRM DELETE
  // =========================================================

  const confirmDelete = () => {
    if (!deleteModal.id || !deleteModal.type) return;

    if (deleteModal.type === "user") {
      handleDeleteUser(deleteModal.id);
      return;
    }

    if (deleteModal.type === "contact") {
      handleDeleteContact(deleteModal.id);
    }
  };

  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading && users.length === 0 && contacts.length === 0) {
    return (
      <>
        <Helmet>
          <title>Admin Dashboard | NexAI</title>
        </Helmet>

        <section className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-14 h-14 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

            <p className="mt-5 text-gray-600 dark:text-gray-400 font-medium">
              Loading admin dashboard...
            </p>
          </div>
        </section>
      </>
    );
  }

  // =========================================================
  // ERROR STATE
  // =========================================================

  if (error && users.length === 0 && contacts.length === 0) {
    return (
      <>
        <Helmet>
          <title>Admin Dashboard | NexAI</title>

          <meta
            name="description"
            content="NexAI admin dashboard for managing users and contact messages."
          />
        </Helmet>

        <section className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
              <FiAlertCircle size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold">Unable to load dashboard</h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchDashboardData}
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
            >
              <FiRefreshCw />
              Try Again
            </button>
          </div>
        </section>
      </>
    );
  }

  // =========================================================
  // MAIN DASHBOARD
  // =========================================================

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | NexAI</title>

        <meta
          name="description"
          content="NexAI admin dashboard for managing users and contact messages."
        />
      </Helmet>

      <section className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* HEADER */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FiShield size={22} />
                </div>

                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    Admin Dashboard
                  </h1>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    NexAI administration panel
                  </p>
                </div>
              </div>

              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Manage your NexAI users and contact messages.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchDashboardData}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              <FiRefreshCw className={loading ? "animate-spin" : ""} />

              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* STATS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {/* USERS */}

            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Users
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {stats.totalUsers || 0}
                  </h2>

                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    Registered accounts
                  </p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FiUsers size={26} />
                </div>
              </div>
            </div>

            {/* CONTACTS */}

            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Contact Messages
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {stats.totalContacts || 0}
                  </h2>

                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    Submitted messages
                  </p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <FiMail size={26} />
                </div>
              </div>
            </div>
          </div>

          {/* USERS */}

          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden mb-10">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <FiUsers className="text-blue-600" size={22} />

                <div>
                  <h2 className="text-xl font-bold">Users</h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Registered NexAI users
                  </p>
                </div>
              </div>
            </div>

            {users.length === 0 ? (
              <div className="p-10 text-center text-gray-500 dark:text-gray-400">
                No users found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px]">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50 text-left">
                      <th className="px-6 py-4 text-sm font-semibold">Name</th>

                      <th className="px-6 py-4 text-sm font-semibold">Email</th>

                      <th className="px-6 py-4 text-sm font-semibold">Role</th>

                      <th className="px-6 py-4 text-sm font-semibold">
                        Joined
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-right">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/70 dark:hover:bg-gray-800/30 transition"
                      >
                        <td className="px-6 py-4 font-medium">{user.name}</td>

                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                          {user.email}
                        </td>

                        <td className="px-6 py-4">
                          <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800">
                            {user.role || "user"}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                          {formatDate(user.createdAt)}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              openDeleteModal("user", user._id, user.name)
                            }
                            disabled={deletingUser === user._id}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition disabled:opacity-50"
                          >
                            {deletingUser === user._id ? (
                              <>
                                <FiRefreshCw className="animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              <>
                                <FiTrash2 />
                                Delete
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* CONTACTS */}

          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <FiMessageSquare className="text-purple-600" size={22} />

                <div>
                  <h2 className="text-xl font-bold">Contact Messages</h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Messages submitted through the contact form
                  </p>
                </div>
              </div>
            </div>

            {contacts.length === 0 ? (
              <div className="p-10 text-center text-gray-500 dark:text-gray-400">
                No contact messages found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px]">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50 text-left">
                      <th className="px-6 py-4 text-sm font-semibold">Name</th>

                      <th className="px-6 py-4 text-sm font-semibold">Email</th>

                      <th className="px-6 py-4 text-sm font-semibold">
                        Message
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold">Date</th>

                      <th className="px-6 py-4 text-sm font-semibold text-right">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {contacts.map((contact) => (
                      <tr
                        key={contact._id}
                        className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/70 dark:hover:bg-gray-800/30 transition"
                      >
                        <td className="px-6 py-4 font-medium">
                          {contact.name}
                        </td>

                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                          {contact.email}
                        </td>

                        <td className="px-6 py-4 max-w-md">
                          <p className="line-clamp-2 text-gray-600 dark:text-gray-400">
                            {contact.message}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                          {formatDate(contact.createdAt)}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedMessage(contact)}
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition"
                            >
                              <FiEye />
                              View
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openDeleteModal(
                                  "contact",
                                  contact._id,
                                  contact.name,
                                )
                              }
                              disabled={deletingContact === contact._id}
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition disabled:opacity-50"
                            >
                              {deletingContact === contact._id ? (
                                <FiRefreshCw className="animate-spin" />
                              ) : (
                                <FiTrash2 />
                              )}

                              {deletingContact === contact._id
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DELETE MODAL */}

      {deleteModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeDeleteModal}
          />

          <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center">
                  <FiTrash2 size={21} />
                </div>

                <div>
                  <h3 className="text-lg font-bold">Confirm deletion</h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={Boolean(deletingUser || deletingContact)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <FiX size={20} />
              </button>
            </div>

            <p className="mt-6 text-gray-600 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <strong className="text-gray-900 dark:text-white">
                {deleteModal.name}
              </strong>
              {deleteModal.type === "contact" ? "'s contact message?" : "?"}
            </p>

            <div className="mt-7 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={Boolean(deletingUser || deletingContact)}
                className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                disabled={Boolean(deletingUser || deletingContact)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition disabled:opacity-60"
              >
                {deletingUser || deletingContact ? (
                  <>
                    <FiRefreshCw className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <FiTrash2 />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT MESSAGE MODAL */}

      {selectedMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedMessage(null)}
          />

          <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Contact Message</h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {formatDate(selectedMessage.createdAt)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Name
                </p>

                <p className="mt-1 font-semibold">{selectedMessage.name}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Email
                </p>

                <p className="mt-1 font-semibold break-all">
                  {selectedMessage.email}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Message
                </p>

                <div className="mt-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedMessage(null)}
              className="w-full mt-6 px-5 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:opacity-90 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
