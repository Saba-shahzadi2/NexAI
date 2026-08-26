import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
  FiX,
  FiStar,
  FiMessageSquare,
  FiAlertCircle,
} from "react-icons/fi";
import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../api/adminAPI";

const EMPTY_FORM = {
  name: "",
  role: "",
  review: "",
  avatar: "",
  rating: 5,
  order: 1,
  isActive: true,
};

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(EMPTY_FORM);

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    id: null,
    name: "",
  });

  const [deletingId, setDeletingId] = useState(null);

  // =========================================================
  // TOKEN
  // =========================================================

  // =========================================================
  // FETCH TESTIMONIALS
  // =========================================================

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllTestimonials();

      if (data.success) {
        setTestimonials(data.testimonials || []);
      }
    } catch (err) {
      console.error("Fetch Testimonials Error:", err);

      const status = err.response?.status;
      const message = err.response?.data?.message;

      if (status === 401) {
        setError("Your session has expired. Please login again.");
        toast.error("Session expired. Please login again.");
      } else if (status === 403) {
        setError("You do not have permission to manage testimonials.");
        toast.error("Admin access required.");
      } else {
        setError(message || "Unable to load testimonials.");
        toast.error(message || "Unable to load testimonials.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // =========================================================
  // FORM HANDLERS
  // =========================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openCreateForm = () => {
    setEditingId(null);

    setFormData({
      ...EMPTY_FORM,
      order: testimonials.length + 1,
    });

    setFormOpen(true);
  };

  const openEditForm = (testimonial) => {
    setEditingId(testimonial._id);

    setFormData({
      name: testimonial.name || "",
      role: testimonial.role || "",
      review: testimonial.review || "",
      avatar: testimonial.avatar || "",
      rating: testimonial.rating || 5,
      order: testimonial.order || 1,
      isActive: testimonial.isActive ?? true,
    });

    setFormOpen(true);
  };

  const closeForm = () => {
    if (saving) return;

    setFormOpen(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
  };

  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter testimonial name.");
      return;
    }

    if (!formData.role.trim()) {
      toast.error("Please enter role.");
      return;
    }

    if (!formData.review.trim()) {
      toast.error("Please enter review.");
      return;
    }

    if (!formData.avatar.trim()) {
      toast.error("Please enter avatar initials.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: formData.name.trim(),
        role: formData.role.trim(),
        review: formData.review.trim(),
        avatar: formData.avatar.trim().toUpperCase(),
        rating: Number(formData.rating),
        order: Number(formData.order),
        isActive: formData.isActive,
      };

      const data = editingId
        ? await updateTestimonial(editingId, payload)
        : await createTestimonial(payload);

      if (data.success) {
        toast.success(
          editingId
            ? "Testimonial updated successfully."
            : "Testimonial created successfully.",
        );

        closeForm();
        await fetchTestimonials();
      }
    } catch (err) {
      console.error("Save Testimonial Error:", err);

      toast.error(err.response?.data?.message || "Unable to save testimonial.");
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE
  // =========================================================

  const openDeleteModal = (testimonial) => {
    setDeleteModal({
      open: true,
      id: testimonial._id,
      name: testimonial.name,
    });
  };

  const closeDeleteModal = () => {
    if (deletingId) return;

    setDeleteModal({
      open: false,
      id: null,
      name: "",
    });
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;

    try {
      setDeletingId(deleteModal.id);

      const data = await deleteTestimonial(deleteModal.id);

      if (data.success) {
        toast.success("Testimonial deleted successfully.");

        setTestimonials((prev) =>
          prev.filter((item) => item._id !== deleteModal.id),
        );
      }
    } catch (err) {
      console.error("Delete Testimonial Error:", err);

      toast.error(
        err.response?.data?.message || "Unable to delete testimonial.",
      );
    } finally {
      setDeletingId(null);
      closeDeleteModal();
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Testimonials | NexAI Admin</title>
        </Helmet>

        <section className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading testimonials...
            </p>
          </div>
        </section>
      </>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error && testimonials.length === 0) {
    return (
      <>
        <Helmet>
          <title>Testimonials | NexAI Admin</title>
        </Helmet>

        <section className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center">
              <FiAlertCircle size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Unable to load testimonials
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchTestimonials}
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
        <title>Testimonials | NexAI Admin</title>

        <meta name="description" content="Manage NexAI testimonials." />
      </Helmet>

      <section className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FiMessageSquare size={22} />
                </div>

                <div>
                  <h1 className="text-3xl font-extrabold">Testimonials</h1>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Manage customer testimonials.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={fetchTestimonials}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <FiRefreshCw className={loading ? "animate-spin" : ""} />
                Refresh
              </button>

              <button
                type="button"
                onClick={openCreateForm}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm transition"
              >
                <FiPlus />
                Add Testimonial
              </button>
            </div>
          </div>

          {/* EMPTY */}

          {testimonials.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center">
              <FiMessageSquare size={42} className="mx-auto text-gray-400" />

              <h2 className="mt-4 text-xl font-bold">No testimonials yet</h2>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Add your first customer testimonial.
              </p>

              <button
                type="button"
                onClick={openCreateForm}
                className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                <FiPlus />
                Add Testimonial
              </button>
            </div>
          ) : (
            /* TABLE */

            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-xl font-bold">Customer Testimonials</h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {testimonials.length} testimonial
                  {testimonials.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50 text-left">
                      <th className="px-6 py-4 text-sm font-semibold">Order</th>

                      <th className="px-6 py-4 text-sm font-semibold">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold">Role</th>

                      <th className="px-6 py-4 text-sm font-semibold">
                        Review
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold">
                        Rating
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold">
                        Status
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {testimonials.map((testimonial) => (
                      <tr
                        key={testimonial._id}
                        className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/70 dark:hover:bg-gray-800/30 transition"
                      >
                        {/* ORDER */}

                        <td className="px-6 py-5">
                          <span className="font-bold">{testimonial.order}</span>
                        </td>

                        {/* CUSTOMER */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                              {testimonial.avatar}
                            </div>

                            <div>
                              <p className="font-bold">{testimonial.name}</p>

                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {testimonial.email || ""}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* ROLE */}

                        <td className="px-6 py-5 text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </td>

                        {/* REVIEW */}

                        <td className="px-6 py-5 max-w-md">
                          <p className="line-clamp-2 text-gray-600 dark:text-gray-300">
                            {testimonial.review}
                          </p>
                        </td>

                        {/* RATING */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FiStar
                                key={star}
                                size={16}
                                className={
                                  star <= testimonial.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 dark:text-gray-700"
                                }
                              />
                            ))}
                          </div>
                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              testimonial.isActive
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                            }`}
                          >
                            {testimonial.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>

                        {/* ACTIONS */}

                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => openEditForm(testimonial)}
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition"
                            >
                              <FiEdit2 />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => openDeleteModal(testimonial)}
                              disabled={deletingId === testimonial._id}
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition disabled:opacity-50"
                            >
                              {deletingId === testimonial._id ? (
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
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          CREATE / EDIT MODAL
      ===================================================== */}

      {formOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeForm}
          />

          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800">
            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 p-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <div>
                <h2 className="text-xl font-bold">
                  {editingId ? "Edit Testimonial" : "Create Testimonial"}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Add customer feedback to your website.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* NAME */}

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Customer Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ali Khan"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* ROLE */}

              <div>
                <label className="block text-sm font-semibold mb-2">Role</label>

                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="CEO, TechFlow"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* REVIEW */}

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Review
                </label>

                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write customer testimonial..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* AVATAR + ORDER */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Avatar Initials
                  </label>

                  <input
                    type="text"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    maxLength={10}
                    placeholder="AK"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

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
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* RATING */}

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Rating
                </label>

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          rating: star,
                        }))
                      }
                      className="p-1"
                    >
                      <FiStar
                        size={28}
                        className={
                          star <= formData.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-700"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* ACTIVE */}

              <label className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 accent-blue-600"
                />

                <div>
                  <p className="font-semibold">Active Testimonial</p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Show this testimonial on the public website.
                  </p>
                </div>
              </label>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <FiRefreshCw className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiPlus />
                      {editingId ? "Update Testimonial" : "Create Testimonial"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deleteModal.open && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
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
                disabled={Boolean(deletingId)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiX size={20} />
              </button>
            </div>

            <p className="mt-6 text-gray-600 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <strong className="text-gray-900 dark:text-white">
                {deleteModal.name}
              </strong>
              's testimonial?
            </p>

            <div className="mt-7 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={Boolean(deletingId)}
                className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={Boolean(deletingId)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold disabled:opacity-60"
              >
                {deletingId ? (
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
    </>
  );
};

export default AdminTestimonials;
