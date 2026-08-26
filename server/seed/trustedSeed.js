import dotenv from "dotenv";
import mongoose from "mongoose";
import TrustedCompany from "../models/TrustedCompany.js";
import connectDB from "../config/db.js";

dotenv.config();

const trustedCompanies = [
  {
    name: "Google",
    logo: "https://cdn.simpleicons.org/google",
    website: "https://www.google.com",
    isActive: true,
    order: 1,
  },
  {
    name: "Microsoft",
    logo: "https://cdn.simpleicons.org/microsoft",
    website: "https://www.microsoft.com",
    isActive: true,
    order: 2,
  },
  {
    name: "Stripe",
    logo: "https://cdn.simpleicons.org/stripe",
    website: "https://stripe.com",
    isActive: true,
    order: 3,
  },
  {
    name: "Notion",
    logo: "https://cdn.simpleicons.org/notion",
    website: "https://www.notion.so",
    isActive: true,
    order: 4,
  },
  {
    name: "Slack",
    logo: "https://cdn.simpleicons.org/slack",
    website: "https://slack.com",
    isActive: true,
    order: 5,
  },
  {
    name: "Spotify",
    logo: "https://cdn.simpleicons.org/spotify",
    website: "https://www.spotify.com",
    isActive: true,
    order: 6,
  },
];

const seedTrustedCompanies = async () => {
  try {
    await connectDB();

    await TrustedCompany.deleteMany({});

    await TrustedCompany.insertMany(trustedCompanies);

    console.log("Trusted companies seeded successfully");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Trusted companies seed error:", error);

    await mongoose.connection.close();
    process.exit(1);
  }
};

seedTrustedCompanies();
