import express from "express";
import { getHowItWorks } from "../controllers/howItWorksController.js";

const router = express.Router();

// Public How It Works data
router.get("/", getHowItWorks);

export default router;
