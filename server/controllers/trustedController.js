import TrustedCompany from "../models/TrustedCompany.js";

// =========================================================
// GET PUBLIC TRUSTED COMPANIES
// =========================================================

export const getTrustedCompanies = async (req, res) => {
  try {
    const companies = await TrustedCompany.find({
      isActive: true,
    })
      .sort({ order: 1, createdAt: 1 })
      .select("name logo website order");

    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.error("Get Trusted Companies Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch trusted companies",
    });
  }
};
