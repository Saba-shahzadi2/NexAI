import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
  FiZap,
  FiBarChart2,
  FiShield,
  FiX,
} from "react-icons/fi";

import {
  getAllFeatures,
  createFeature,
  updateFeature,
  deleteFeature,
} from "../api/adminAPI";

const ICONS = {
  FiZap,
  FiBarChart2,
  FiShield,
};

const emptyForm = {
  title: "",
  description: "",
  icon: "FiZap",
  order: 1,
  isActive: true,
};

const AdminFeatures = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  // =====================================================
  // FETCH FEATURES
  // =====================================================

  const fetchFeatures = async () => {
    try {
      setLoading(true);

      const data = await getAllFeatures();

      if (data.success) {
        setFeatures(data.features || []);
      } else {
        throw new Error(data.message || "Unable to load features.");
      }
    } catch (error) {
      console.error("Fetch Features Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to load features.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  // =====================================================
  // FORM
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =====================================================
  // ADD MODAL
  // =====================================================

  const openAddModal = () => {
    setEditingId(null);

    setFormData({
      ...emptyForm,
      order: features.length + 1,
    });

    setShowModal(true);
  };

  // =====================================================
  // EDIT MODAL
  // =====================================================

  const openEditModal = (feature) => {
    setEditingId(feature._id);

    setFormData({
      title: feature.title.replace(/^Title:\s*/i, ""),
      description: feature.description.replace(/^Description:\s*/i, ""),
      icon: feature.icon || "FiZap",
      order: feature.order || 1,
      isActive: feature.isActive !== false,
    });

    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingId(null);
    setFormData({ ...emptyForm });
  };

  // =====================================================
  // SAVE FEATURE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Feature title is required.");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Feature description is required.");
      return;
    }

    const orderNumber = Number(formData.order);

    if (!Number.isInteger(orderNumber) || orderNumber < 1) {
      toast.error("Order must be a valid number greater than 0.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        icon: formData.icon,
        order: orderNumber,
        isActive: formData.isActive,
      };

      let data;

      if (editingId) {
        data = await updateFeature(editingId, payload);
      } else {
        data = await createFeature(payload);
      }

      if (!data.success) {
        throw new Error(data.message || "Unable to save feature.");
      }

      toast.success(
        editingId
          ? "Feature updated successfully."
          : "Feature created successfully.",
      );

      setShowModal(false);
      setEditingId(null);
      setFormData({ ...emptyForm });

      await fetchFeatures();
    } catch (error) {
      console.error("Save Feature Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to save feature.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feature?",
    );

    if (!confirmed) return;

    try {
      const data = await deleteFeature(id);

      if (!data.success) {
        throw new Error(data.message || "Unable to delete feature.");
      }

      toast.success("Feature deleted successfully.");

      setFeatures((prev) => prev.filter((feature) => feature._id !== id));
    } catch (error) {
      console.error("Delete Feature Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to delete feature.",
      );
    }
  };

  // =====================================================
  // ICON
  // =====================================================

  const getIcon = (iconName) => {
    return ICONS[iconName] || FiZap;
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 sm:px-6 lg:px-8 py-10 pt-24 lg:pt-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">Features</h1>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Manage the features displayed on the NexAI website.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={fetchFeatures}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold transition disabled:opacity-60"
            >
              <FiRefreshCw className={loading ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-sm"
            >
              <FiPlus size={20} />
              Add Feature
            </button>
          </div>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : features.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No features found.
            </p>
          </div>
        ) : (
          /* TABLE */

          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 text-left">
                    <th className="px-6 py-4 text-sm font-semibold">Feature</th>

                    <th className="px-6 py-4 text-sm font-semibold">Icon</th>

                    <th className="px-6 py-4 text-sm font-semibold">Order</th>

                    <th className="px-6 py-4 text-sm font-semibold">Status</th>

                    <th className="px-6 py-4 text-sm font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {features.map((feature) => {
                    const Icon = getIcon(feature.icon);

                    return (
                      <tr
                        key={feature._id}
                        className="border-t border-gray-100 dark:border-gray-800"
                      >
                        <td className="px-6 py-5">
                          <div className="font-bold">
                            {feature.title.replace(/^Title:\s*/i, "")}
                          </div>

                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-xl">
                            {feature.description.replace(
                              /^Description:\s*/i,
                              "",
                            )}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                            <Icon size={22} />
                          </div>

                          <span className="text-xs text-gray-400 mt-1 block">
                            {feature.icon}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span className="font-semibold">{feature.order}</span>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                              feature.isActive
                                ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                            }`}
                          >
                            {feature.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => openEditModal(feature)}
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 transition"
                            >
                              <FiEdit2 />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(feature._id)}
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 transition"
                            >
                              <FiTrash2 />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 max-h-[90vh] overflow-y-auto">
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  {editingId ? "Edit Feature" : "Add Feature"}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Manage feature information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="AI Automation"
                  disabled={saving}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
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
                  rows={4}
                  placeholder="Automate repetitive workflows..."
                  disabled={saving}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-60"
                />
              </div>

              {/* ICON */}

              <div>
                <label className="block text-sm font-semibold mb-2">Icon</label>

                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  disabled={saving}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                >
                  <option value="FiZap">FiZap</option>
                  <option value="FiBarChart2">FiBarChart2</option>
                  <option value="FiShield">FiShield</option>
                </select>
              </div>

              {/* ORDER */}

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Order
                </label>

                <input
                  type="number"
                  name="order"
                  min="1"
                  value={formData.order}
                  onChange={handleChange}
                  disabled={saving}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                />
              </div>

              {/* ACTIVE */}

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  disabled={saving}
                  className="w-5 h-5 accent-blue-600"
                />

                <span className="font-semibold">Active feature</span>
              </label>

              {/* BUTTONS */}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="flex-1 px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50"
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
                      {editingId ? <FiEdit2 /> : <FiPlus />}

                      {editingId ? "Update" : "Create"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminFeatures;
