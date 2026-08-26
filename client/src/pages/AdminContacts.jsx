import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { FiMail, FiEye, FiTrash2, FiRefreshCw, FiX } from "react-icons/fi";
import { getAllContacts, deleteContact } from "../api/adminAPI";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);

      const data = await getAllContacts();

      if (data.success) {
        setContacts(data.contacts || []);
      }
    } catch (error) {
      console.error("Fetch Contacts Error:", error);

      toast.error(
        error.response?.data?.message || "Unable to load contact messages.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact message?",
    );

    if (!confirmed) return;

    try {
      setDeleting(id);

      const data = await deleteContact(id);

      if (data.success) {
        setContacts((prev) => prev.filter((contact) => contact._id !== id));

        toast.success("Contact message deleted successfully.");
      }
    } catch (error) {
      console.error("Delete Contact Error:", error);

      toast.error(
        error.response?.data?.message || "Unable to delete contact message.",
      );
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Messages | NexAI Admin</title>
      </Helmet>

      <section className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <FiMail size={22} />
              </div>

              <div>
                <h1 className="text-3xl font-extrabold">Contact Messages</h1>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Messages submitted through NexAI
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={fetchContacts}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-60"
            >
              <FiRefreshCw className={loading ? "animate-spin" : ""} />

              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Content */}

          {loading ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-800">
              <FiRefreshCw
                size={32}
                className="mx-auto animate-spin text-blue-600"
              />

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Loading messages...
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-bold">Messages</h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Total messages: {contacts.length}
                </p>
              </div>

              {contacts.length === 0 ? (
                <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                  No contact messages found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px]">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50 text-left">
                        <th className="px-6 py-4 text-sm font-semibold">
                          Name
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold">
                          Email
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold">
                          Message
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold">
                          Date
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold text-right">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {contacts.map((contact) => (
                        <tr
                          key={contact._id}
                          className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30"
                        >
                          <td className="px-6 py-4 font-semibold">
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
                            {contact.createdAt
                              ? new Date(contact.createdAt).toLocaleDateString(
                                  "en-GB",
                                )
                              : "-"}
                          </td>

                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setSelectedMessage(contact)}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-semibold text-sm"
                              >
                                <FiEye />
                                View
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDelete(contact._id)}
                                disabled={deleting === contact._id}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 font-semibold text-sm disabled:opacity-50"
                              >
                                {deleting === contact._id ? (
                                  <FiRefreshCw className="animate-spin" />
                                ) : (
                                  <FiTrash2 />
                                )}
                                Delete
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
          )}
        </div>
      </section>

      {/* Message Modal */}

      {selectedMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedMessage(null)}
          />

          <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Contact Message</h2>

                <p className="text-sm text-gray-500 mt-1">
                  {selectedMessage.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Name</p>

                <p className="font-semibold mt-1">{selectedMessage.name}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">Email</p>

                <p className="font-semibold mt-1 break-all">
                  {selectedMessage.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">Message</p>

                <div className="mt-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedMessage(null)}
              className="w-full mt-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminContacts;
