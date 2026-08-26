import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import {
  FiList,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiRefreshCw,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import {
  getAllHowItWorks,
  createHowItWorks,
  updateHowItWorks,
  deleteHowItWorks,
} from "../api/adminAPI";

const AdminHowItWorks = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    number: "",
    title: "",
    description: "",
    order: "",
    isActive: true,
  });

  // =========================================================
  // TOKEN
  // =========================================================

  // =========================================================
  // FETCH STEPS
  // =========================================================

  const fetchSteps = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllHowItWorks();

      if (data.success) {
        setSteps(data.steps || []);
      }
    } catch (error) {
      console.error("Fetch How It Works Error:", error);

      setError(
        error.response?.data?.message || "Unable to load How It Works steps.",
      );

      toast.error(
        error.response?.data?.message || "Unable to load How It Works steps.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================================================
  // OPEN ADD MODAL
  // =========================================================

  const openAddModal = () => {
    setEditingStep(null);

    setFormData({
      number: String(steps.length + 1).padStart(2, "0"),
      title: "",
      description: "",
      order: steps.length + 1,
      isActive: true,
    });

    setModalOpen(true);
  };

  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  const openEditModal = (step) => {
    setEditingStep(step);

    setFormData({
      number: step.number || "",
      title: step.title || "",
      description: step.description || "",
      order: step.order || "",
      isActive: step.isActive ?? true,
    });

    setModalOpen(true);
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingStep(null);

    setFormData({
      number: "",
      title: "",
      description: "",
      order: "",
      isActive: true,
    });
  };

  // =========================================================
  // SAVE STEP
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.number.trim()) {
      toast.error("Step number is required.");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Title is required.");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        number: formData.number.trim(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        order: Number(formData.order) || 1,
        isActive: formData.isActive,
      };

      const data = editingStep
        ? await updateHowItWorks(editingStep._id, payload)
        : await createHowItWorks(payload);

      if (data.success) {
        toast.success(
          editingStep
            ? "How It Works step updated successfully."
            : "How It Works step created successfully.",
        );

        closeModal();
        fetchSteps();
      }
    } catch (error) {
      console.error("Save How It Works Error:", error);

      toast.error(
        error.response?.data?.message || "Unable to save How It Works step.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE STEP
  // =========================================================

  const handleDelete = async (id) => {
    if (!id) return;

    try {
      setDeleteId(id);

      const data = await deleteHowItWorks(id);

      if (data.success) {
        toast.success("How It Works step deleted successfully.");

        setSteps((prev) => prev.filter((step) => step._id !== id));
      }
    } catch (error) {
      console.error("Delete How It Works Error:", error);

      toast.error(
        error.response?.data?.message || "Unable to delete How It Works step.",
      );
    } finally {
      setDeleteId(null);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <>
        <Helmet>
          <title>How It Works | NexAI Admin</title>
        </Helmet>

        <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading How It Works...
            </p>
          </div>
        </section>
      </>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <>
        <Helmet>
          <title>How It Works | NexAI Admin</title>
        </Helmet>

        <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center shadow-lg">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center">
              <FiAlertCircle size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold">Unable to load steps</h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchSteps}
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
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
  // MAIN
  // =========================================================

  return (
    <>
      <Helmet>
        <title>How It Works | NexAI Admin</title>

        <meta name="description" content="Manage NexAI How It Works steps." />
      </Helmet>

      <section className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8 pt-12 lg:pt-0">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FiList size={22} />
                </div>

                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    How It Works
                  </h1>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Manage your NexAI workflow steps
                  </p>
                </div>
              </div>

              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Add, update and manage the steps displayed on your website.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm transition"
            >
              <FiPlus size={19} />
              Add Step
            </button>
          </div>

          {/* STEPS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {steps.length === 0 ? (
              <div className="md:col-span-2 xl:col-span-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center">
                <FiList size={40} className="mx-auto text-gray-400" />

                <h2 className="mt-4 text-xl font-bold">No steps found</h2>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Add your first How It Works step.
                </p>

                <button
                  type="button"
                  onClick={openAddModal}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold"
                >
                  <FiPlus />
                  Add Step
                </button>
              </div>
            ) : (
              steps.map((step) => (
                <div
                  key={step._id}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <span className="text-xl font-black">{step.number}</span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        step.isActive
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      <FiCheck size={13} />

                      {step.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <h2 className="mt-6 text-xl font-bold">{step.title}</h2>

                  <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed min-h-[72px]">
                    {step.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Display Order:{" "}
                      <span className="font-semibold">{step.order}</span>
                    </p>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => openEditModal(step)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition"
                    >
                      <FiEdit2 />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(step._id)}
                      disabled={deleteId === step._id}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition disabled:opacity-50"
                    >
                      {deleteId === step._id ? (
                        <FiRefreshCw className="animate-spin" />
                      ) : (
                        <FiTrash2 />
                      )}

                      {deleteId === step._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  {editingStep ? "Edit Step" : "Add Step"}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {editingStep
                    ? "Update this workflow step."
                    : "Create a new workflow step."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NUMBER */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Step Number
                </label>

                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="01"
                  maxLength={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* TITLE */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Create Account"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe this step..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* ORDER */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Display Order
                </label>

                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* ACTIVE */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 accent-blue-600"
                />

                <span className="text-sm font-semibold">Active</span>
              </label>

              {/* BUTTONS */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="flex-1 px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <FiRefreshCw className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {editingStep ? <FiEdit2 /> : <FiPlus />}

                      {editingStep ? "Update Step" : "Create Step"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHowItWorks;
