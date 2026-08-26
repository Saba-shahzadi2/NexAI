import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { FiUsers, FiTrash2, FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import { getAllUsers, deleteUser } from "../api/adminAPI";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllUsers();

      if (data.success) {
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error("Fetch Users Error:", error);

      const message = error.response?.data?.message || "Unable to load users.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) return;

    try {
      setDeleting(id);

      const data = await deleteUser(id);

      if (data.success) {
        setUsers((prev) => prev.filter((user) => user._id !== id));

        toast.success("User deleted successfully.");
      }
    } catch (error) {
      console.error("Delete User Error:", error);

      toast.error(error.response?.data?.message || "Unable to delete user.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Users | NexAI Admin</title>
      </Helmet>

      <section className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FiUsers size={22} />
                </div>

                <div>
                  <h1 className="text-3xl font-extrabold">Users</h1>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage registered NexAI users
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={fetchUsers}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-60"
            >
              <FiRefreshCw className={loading ? "animate-spin" : ""} />

              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Error */}

          {error && !loading && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40 rounded-2xl p-5 flex items-center gap-3 text-red-600 dark:text-red-400">
              <FiAlertCircle size={22} />
              <span>{error}</span>
            </div>
          )}

          {/* Loading */}

          {loading ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-800">
              <FiRefreshCw
                size={32}
                className="mx-auto animate-spin text-blue-600"
              />

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Loading users...
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
              {/* Table Header */}

              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-bold">Registered Users</h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Total users: {users.length}
                </p>
              </div>

              {users.length === 0 ? (
                <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                  No users found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[750px]">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50 text-left">
                        <th className="px-6 py-4 text-sm font-semibold">
                          Name
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold">
                          Email
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold">
                          Role
                        </th>

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
                          className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30"
                        >
                          <td className="px-6 py-4 font-semibold">
                            {user.name}
                          </td>

                          <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                            {user.email}
                          </td>

                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800">
                              {user.role || "user"}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString(
                                  "en-GB",
                                )
                              : "-"}
                          </td>

                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDelete(user._id)}
                              disabled={deleting === user._id}
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 font-semibold text-sm disabled:opacity-50"
                            >
                              {deleting === user._id ? (
                                <FiRefreshCw className="animate-spin" />
                              ) : (
                                <FiTrash2 />
                              )}

                              {deleting === user._id ? "Deleting..." : "Delete"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AdminUsers;
