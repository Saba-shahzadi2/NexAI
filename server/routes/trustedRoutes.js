import express from "express";
import { getTrustedCompanies } from "../controllers/trustedController.js";

const router = express.Router();

router.get("/", getTrustedCompanies);

export default router;
