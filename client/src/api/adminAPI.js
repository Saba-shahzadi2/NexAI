import api from "./axios";

// =========================================================
// DASHBOARD
// =========================================================

// Get admin dashboard statistics
export const getAdminStats = async () => {
  const response = await api.get("/admin/stats");
  return response.data;
};

// =========================================================
// USERS
// =========================================================

// Get all users
export const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

// =========================================================
// CONTACTS
// =========================================================

// Get all contacts
export const getAllContacts = async () => {
  const response = await api.get("/admin/contacts");
  return response.data;
};

// Delete contact
export const deleteContact = async (id) => {
  const response = await api.delete(`/admin/contacts/${id}`);
  return response.data;
};

// =========================================================
// PRICING
// =========================================================

// Get all pricing plans for admin
export const getAllPricingPlans = async () => {
  const response = await api.get("/admin/pricing");
  return response.data;
};

// Create pricing plan
export const createPricingPlan = async (planData) => {
  const response = await api.post("/admin/pricing", planData);
  return response.data;
};

// Update pricing plan
export const updatePricingPlan = async (id, planData) => {
  const response = await api.put(`/admin/pricing/${id}`, planData);
  return response.data;
};

// Delete pricing plan
export const deletePricingPlan = async (id) => {
  const response = await api.delete(`/admin/pricing/${id}`);
  return response.data;
};

// =========================================================
// FAQ
// =========================================================

// Get all FAQs for admin
export const getAllFAQs = async () => {
  const response = await api.get("/admin/faq");
  return response.data;
};

// Create FAQ
export const createFAQ = async (faqData) => {
  const response = await api.post("/admin/faq", faqData);
  return response.data;
};

// Update FAQ
export const updateFAQ = async (id, faqData) => {
  const response = await api.put(`/admin/faq/${id}`, faqData);
  return response.data;
};

// Delete FAQ
export const deleteFAQ = async (id) => {
  const response = await api.delete(`/admin/faq/${id}`);
  return response.data;
};

// =========================================================
// FEATURES
// =========================================================

// Get all features for admin
export const getAllFeatures = async () => {
  const response = await api.get("/admin/features");
  return response.data;
};

// Create feature
export const createFeature = async (featureData) => {
  const response = await api.post("/admin/features", featureData);
  return response.data;
};

// Update feature
export const updateFeature = async (id, featureData) => {
  const response = await api.put(`/admin/features/${id}`, featureData);
  return response.data;
};

// Delete feature
export const deleteFeature = async (id) => {
  const response = await api.delete(`/admin/features/${id}`);
  return response.data;
};

// =========================================================
// TESTIMONIALS
// =========================================================

// Get all testimonials for admin
export const getAllTestimonials = async () => {
  const response = await api.get("/admin/testimonials");
  return response.data;
};

// Create testimonial
export const createTestimonial = async (testimonialData) => {
  const response = await api.post("/admin/testimonials", testimonialData);
  return response.data;
};

// Update testimonial
export const updateTestimonial = async (id, testimonialData) => {
  const response = await api.put(`/admin/testimonials/${id}`, testimonialData);
  return response.data;
};

// Delete testimonial
export const deleteTestimonial = async (id) => {
  const response = await api.delete(`/admin/testimonials/${id}`);
  return response.data;
};

// =========================================================
// HOW IT WORKS
// =========================================================

// Get all How It Works steps for admin
export const getAllHowItWorks = async () => {
  const response = await api.get("/admin/how-it-works");
  return response.data;
};

// Create How It Works step
export const createHowItWorks = async (stepData) => {
  const response = await api.post("/admin/how-it-works", stepData);
  return response.data;
};

// Update How It Works step
export const updateHowItWorks = async (id, stepData) => {
  const response = await api.put(`/admin/how-it-works/${id}`, stepData);
  return response.data;
};

// Delete How It Works step
export const deleteHowItWorks = async (id) => {
  const response = await api.delete(`/admin/how-it-works/${id}`);
  return response.data;
};
