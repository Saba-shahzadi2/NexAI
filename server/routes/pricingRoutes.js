import express from "express";

import { getPricingPlans } from "../controllers/pricingController.js";

const router = express.Router();

// Public pricing plans
router.get("/", getPricingPlans);

export default router;
