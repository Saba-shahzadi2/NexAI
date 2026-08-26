import express from "express";

import {
  getAdminStats,
  getAllUsers,
  getAllContacts,
  deleteUser,
  deleteContact,
} from "../controllers/adminController.js";

import {
  getAllPricingPlans,
  createPricingPlan,
  updatePricingPlan,
  deletePricingPlan,
} from "../controllers/pricingController.js";

import {
  getAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from "../controllers/faqController.js";

import {
  getAllFeatures,
  createFeature,
  updateFeature,
  deleteFeature,
} from "../controllers/featureController.js";

import {
  getAllHowItWorks,
  createHowItWorks,
  updateHowItWorks,
  deleteHowItWorks,
} from "../controllers/howItWorksController.js";

import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(adminMiddleware);

// ==========================================
// DASHBOARD
// ==========================================

router.get("/stats", getAdminStats);

// ==========================================
// USERS
// ==========================================

router.get("/users", getAllUsers);

router.delete("/users/:id", deleteUser);

// ==========================================
// CONTACTS
// ==========================================

router.get("/contacts", getAllContacts);

router.delete("/contacts/:id", deleteContact);

// ==========================================
// PRICING
// ==========================================

router.get("/pricing", getAllPricingPlans);

router.post("/pricing", createPricingPlan);

router.put("/pricing/:id", updatePricingPlan);

router.delete("/pricing/:id", deletePricingPlan);

// ==========================================
// FAQ
// ==========================================

router.get("/faq", getAllFAQs);

router.post("/faq", createFAQ);

router.put("/faq/:id", updateFAQ);

router.delete("/faq/:id", deleteFAQ);

//Fatures
router.get("/features", getAllFeatures);

router.post("/features", createFeature);

router.put("/features/:id", updateFeature);

router.delete("/features/:id", deleteFeature);

// Testimonials management
router.get("/testimonials", getAllTestimonials);
router.post("/testimonials", createTestimonial);
router.put("/testimonials/:id", updateTestimonial);
router.delete("/testimonials/:id", deleteTestimonial);

// How-it-work
router.get("/how-it-works", getAllHowItWorks);

router.post("/how-it-works", createHowItWorks);

router.put("/how-it-works/:id", updateHowItWorks);

router.delete("/how-it-works/:id", deleteHowItWorks);
export default router;
