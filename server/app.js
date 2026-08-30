import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import adminRouter from "./routes/adminRoutes.js";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import contactRouter from "./routes/contactRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import pricingRouter from "./routes/pricingRoutes.js";
import faqRouter from "./routes/faqRoutes.js";
import featureRouter from "./routes/featureRoutes.js";
import howItWorksRouter from "./routes/howItWorksRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import statsRouter from "./routes/statsRoutes.js";
import trustedRoutes from "./routes/trustedRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS: Origin not allowed"));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NexAI API is running...",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NexAI API is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);
app.use("/api/features", featureRouter);
app.use("/api/pricing", pricingRouter);
app.use("/api/faq", faqRouter);
app.use("/api/how-it-works", howItWorksRouter);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/stats", statsRouter);
app.use("/api/trusted", trustedRoutes);
app.use("/api/admin", adminRouter);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
