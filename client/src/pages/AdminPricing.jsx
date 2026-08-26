import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import {
  FiDollarSign,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiRefreshCw,
  FiCheckCircle,
} from "react-icons/fi";
import {
  getAllPricingPlans,
  createPricingPlan,
  updatePricingPlan,
  deletePricingPlan,
} from "../api/adminAPI";

const emptyForm = {
  name: "",
  price: "",
  currency: "$",
  description: "",
  features: [""],
  isPopular: false,
};

const AdminPricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  // =========================================================
  // FETCH PLANS
  // =========================================================

  const fetchPlans = async () => {
    try {
      setLoading(true);

      const data = await getAllPricingPlans();

      if (data.success) {
        setPlans(data.plans || []);
      }
    } catch (error) {
      console.error("Fetch Pricing Error:", error);

      toast.error(
        error.response?.data?.message || "Unable to load pricing plans.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // =========================================================
  // FORM
  // =========================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFeatureChange = (index, value) => {
    setFormData((prev) => {
      const features = [...prev.features];
      features[index] = value;

      return {
        ...prev,
        features,
      };
    });
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index) => {
    setFormData((prev) => {
      const features = prev.features.filter(
        (_, featureIndex) => featureIndex !== index,
      );

      return {
        ...prev,
        features: features.length ? features : [""],
      };
    });
  };

  // =========================================================
  // OPEN CREATE
  // =========================================================

  const openCreateModal = () => {
    setEditingPlan(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  // =========================================================
  // OPEN EDIT
  // =========================================================

  const openEditModal = (plan) => {
    setEditingPlan(plan);

    setFormData({
      name: plan.name || "",
      price: plan.price ?? "",
      currency: plan.currency || "$",
      description: plan.description || "",
      features: plan.features?.length > 0 ? [...plan.features] : [""],
      isPopular: Boolean(plan.isPopular),
    });

    setModalOpen(true);
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingPlan(null);
    setFormData(emptyForm);
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedFeatures = formData.features
      .map((feature) => feature.trim())
      .filter(Boolean);

    if (!formData.name.trim()) {
      toast.error("Plan name is required.");
      return;
    }

    if (formData.price === "" || Number(formData.price) < 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required.");
      return;
    }

    if (cleanedFeatures.length === 0) {
      toast.error("Add at least one feature.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: formData.name.trim(),
        price: Number(formData.price),
        currency: formData.currency.trim() || "$",
        description: formData.description.trim(),
        features: cleanedFeatures,
        isPopular: formData.isPopular,
      };

      const data = editingPlan
        ? await updatePricingPlan(editingPlan._id, payload)
        : await createPricingPlan(payload);

      if (data.success) {
        toast.success(
          editingPlan
            ? "Pricing plan updated successfully."
            : "Pricing plan created successfully.",
        );

        closeModal();
        fetchPlans();
      }
    } catch (error) {
      console.error("Save Pricing Error:", error);

      toast.error(
        error.response?.data?.message || "Unable to save pricing plan.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`,
    );

    if (!confirmed) return;

    try {
      setDeleting(id);

      const data = await deletePricingPlan(id);

      if (data.success) {
        setPlans((prev) => prev.filter((plan) => plan._id !== id));

        toast.success("Pricing plan deleted successfully.");
      }
    } catch (error) {
      console.error("Delete Pricing Error:", error);

      toast.error(
        error.response?.data?.message || "Unable to delete pricing plan.",
      );
    } finally {
      setDeleting(null);
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      <Helmet>
        <title>Pricing Management | NexAI Admin</title>

        <meta name="description" content="Manage NexAI pricing plans." />
      </Helmet>

      <section className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <FiDollarSign size={23} />
              </div>

              <div>
                <h1 className="text-3xl font-extrabold">Pricing Management</h1>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Manage your public pricing plans
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={fetchPlans}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50"
              >
                <FiRefreshCw className={loading ? "animate-spin" : ""} />
                Refresh
              </button>

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-sm"
              >
                <FiPlus size={19} />
                Add Plan
              </button>
            </div>
          </div>

          {/* LOADING */}

          {loading ? (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-14 text-center">
              <FiRefreshCw
                size={34}
                className="mx-auto animate-spin text-blue-600"
              />

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Loading pricing plans...
              </p>
            </div>
          ) : plans.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-14 text-center">
              <FiDollarSign size={40} className="mx-auto text-gray-400" />

              <h2 className="mt-4 text-xl font-bold">No pricing plans</h2>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Create your first pricing plan.
              </p>

              <button
                type="button"
                onClick={openCreateModal}
                className="mt-6 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                Add First Plan
              </button>
            </div>
          ) : (
            /* PLANS */

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  className={`relative bg-white dark:bg-gray-900 border rounded-2xl p-6 shadow-sm transition hover:shadow-lg ${
                    plan.isPopular
                      ? "border-blue-500 ring-1 ring-blue-500"
                      : "border-gray-200 dark:border-gray-800"
                  }`}
                >
                  {/* Popular */}

                  {plan.isPopular && (
                    <span className="absolute -top-3 right-5 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
                      Most Popular
                    </span>
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-black">{plan.name}</h2>

                      <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  {/* PRICE */}

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-blue-600 dark:text-blue-400">
                      {plan.currency}
                      {plan.price}
                    </span>

                    <span className="text-sm text-gray-500">/ month</span>
                  </div>

                  {/* FEATURES */}

                  <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm font-bold mb-3">Features</p>

                    <ul className="space-y-3">
                      {plan.features?.map((feature, index) => (
                        <li
                          key={`${plan._id}-${index}`}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <FiCheckCircle className="mt-0.5 flex-shrink-0 text-blue-600" />

                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ACTIONS */}

                  <div className="mt-7 flex gap-3">
                    <button
                      type="button"
                      onClick={() => openEditModal(plan)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white font-semibold transition"
                    >
                      <FiEdit2 />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(plan._id, plan.name)}
                      disabled={deleting === plan._id}
                      className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 transition disabled:opacity-50"
                    >
                      {deleting === plan._id ? (
                        <FiRefreshCw className="animate-spin" />
                      ) : (
                        <FiTrash2 />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          CREATE / EDIT MODAL
      ===================================================== */}

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800">
            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {editingPlan ? "Edit Pricing Plan" : "Create Pricing Plan"}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Changes will appear on the public pricing page.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50"
              >
                <FiX size={21} />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* NAME */}

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Plan Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Starter"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* PRICE */}

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Currency
                  </label>

                  <input
                    type="text"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    placeholder="$"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold mb-2">
                    Price / Month
                  </label>

                  <input
                    type="number"
                    name="price"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="29"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe this pricing plan..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* FEATURES */}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold">Features</label>

                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    + Add Feature
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                        placeholder={`Feature ${index + 1}`}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* POPULAR */}

              <label className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPopular"
                  checked={formData.isPopular}
                  onChange={handleChange}
                  className="w-5 h-5 accent-blue-600"
                />

                <div>
                  <p className="font-semibold">Mark as Most Popular</p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Highlight this plan on the public pricing page.
                  </p>
                </div>
              </label>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-60"
                >
                  {saving && <FiRefreshCw className="animate-spin" />}

                  {saving
                    ? "Saving..."
                    : editingPlan
                      ? "Update Plan"
                      : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPricing;
