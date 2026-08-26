import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
  FiX,
  FiHelpCircle,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { getAllFAQs, createFAQ, updateFAQ, deleteFAQ } from "../api/adminAPI";

const AdminFAQ = () => {
  const [faqs, setFaqs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    order: 0,
    isActive: true,
  });

  // ==========================================
  // TOKEN
  // ==========================================

  // ==========================================
  // FETCH FAQS
  // ==========================================

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllFAQs();

      if (data.success) {
        setFaqs(data.faqs || []);
      }
    } catch (err) {
      console.error("Fetch FAQ Error:", err);

      const message = err.response?.data?.message || "Unable to load FAQs.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  // ==========================================
  // FORM
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==========================================
  // OPEN CREATE
  // ==========================================

  const openCreateModal = () => {
    setEditingId(null);

    setFormData({
      question: "",
      answer: "",
      order: faqs.length + 1,
      isActive: true,
    });

    setModalOpen(true);
  };

  // ==========================================
  // OPEN EDIT
  // ==========================================

  const openEditModal = (faq) => {
    setEditingId(faq._id);

    setFormData({
      question: faq.question || "",
      answer: faq.answer || "",
      order: faq.order || 0,
      isActive: faq.isActive,
    });

    setModalOpen(true);
  };

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingId(null);
  };

  // ==========================================
  // SAVE FAQ
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.question.trim()) {
      toast.error("Question is required.");
      return;
    }

    if (!formData.answer.trim()) {
      toast.error("Answer is required.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        order: Number(formData.order) || 0,
        isActive: formData.isActive,
      };

      const data = editingId
        ? await updateFAQ(editingId, payload)
        : await createFAQ(payload);

      if (data.success) {
        toast.success(
          editingId ? "FAQ updated successfully." : "FAQ created successfully.",
        );

        closeModal();

        fetchFAQs();
      }
    } catch (err) {
      console.error("Save FAQ Error:", err);

      toast.error(err.response?.data?.message || "Unable to save FAQ.");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE FAQ
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this FAQ?",
    );

    if (!confirmed) return;

    try {
      setDeleteId(id);

      const data = await deleteFAQ(id);

      if (data.success) {
        toast.success("FAQ deleted successfully.");

        setFaqs((prev) => prev.filter((faq) => faq._id !== id));
      }
    } catch (err) {
      console.error("Delete FAQ Error:", err);

      toast.error(err.response?.data?.message || "Unable to delete FAQ.");
    } finally {
      setDeleteId(null);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <>
        <Helmet>
          <title>FAQ Management | NexAI</title>
        </Helmet>

        <section className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Loading FAQs...
            </p>
          </div>
        </section>
      </>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error && faqs.length === 0) {
    return (
      <>
        <Helmet>
          <title>FAQ Management | NexAI</title>
        </Helmet>

        <section className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl p-8 text-center shadow-lg">
            <FiAlertCircle size={40} className="mx-auto text-red-500" />

            <h2 className="mt-4 text-xl font-bold">Unable to load FAQs</h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">{error}</p>

            <button
              onClick={fetchFAQs}
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold"
            >
              <FiRefreshCw />
              Try Again
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>FAQ Management | NexAI</title>
      </Helmet>

      <section className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24 lg:pt-10">
          {/* HEADER */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FiHelpCircle size={23} />
                </div>

                <div>
                  <h1 className="text-3xl font-extrabold">FAQ Management</h1>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Manage frequently asked questions.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={fetchFAQs}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <FiRefreshCw />
                Refresh
              </button>

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm transition"
              >
                <FiPlus />
                Add FAQ
              </button>
            </div>
          </div>

          {/* FAQ LIST */}

          {faqs.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center">
              <FiHelpCircle size={45} className="mx-auto text-gray-400" />

              <h2 className="mt-4 text-xl font-bold">No FAQs yet</h2>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Create your first FAQ to display it on the website.
              </p>

              <button
                onClick={openCreateModal}
                className="mt-6 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
              >
                Add First FAQ
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq._id}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                        {faq.order || index + 1}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold">{faq.question}</h3>

                        <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>

                        <div className="mt-4">
                          {faq.isActive ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                              <FiCheckCircle />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-500">
                              Inactive
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 lg:flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditModal(faq)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                      >
                        <FiEdit2 />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(faq._id)}
                        disabled={deleteId === faq._id}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 disabled:opacity-50"
                      >
                        {deleteId === faq._id ? (
                          <FiRefreshCw className="animate-spin" />
                        ) : (
                          <FiTrash2 />
                        )}
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==========================================
          CREATE / EDIT MODAL
      ========================================== */}

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  {editingId ? "Edit FAQ" : "Create FAQ"}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {editingId
                    ? "Update this frequently asked question."
                    : "Add a new frequently asked question."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiX size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* QUESTION */}

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Question
                </label>

                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  placeholder="Is there a free trial?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* ANSWER */}

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Answer
                </label>

                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write the answer..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* ORDER + ACTIVE */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Display Order
                  </label>

                  <input
                    type="number"
                    name="order"
                    min="0"
                    value={formData.order}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer sm:mt-7">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-5 h-5 accent-blue-600"
                  />

                  <span className="font-semibold">Active FAQ</span>
                </label>
              </div>

              {/* ACTIONS */}

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-60"
                >
                  {saving && <FiRefreshCw className="animate-spin" />}

                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update FAQ"
                      : "Create FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminFAQ;
