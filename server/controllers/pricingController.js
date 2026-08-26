import PricingPlan from "../models/PricingPlan.js";

// ===============================
// PUBLIC: Get active pricing plans
// ===============================
export const getPricingPlans = async (req, res) => {
  try {
    const plans = await PricingPlan.find({ isActive: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      plans,
    });
  } catch (error) {
    console.error("Get Pricing Plans Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load pricing plans",
    });
  }
};

// ===============================
// ADMIN: Get all pricing plans
// ===============================
export const getAllPricingPlans = async (req, res) => {
  try {
    const plans = await PricingPlan.find()
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      plans,
    });
  } catch (error) {
    console.error("Get All Pricing Plans Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load pricing plans",
    });
  }
};

// ===============================
// ADMIN: Create pricing plan
// ===============================
export const createPricingPlan = async (req, res) => {
  try {
    const {
      name,
      price,
      currency,
      description,
      features,
      isPopular,
      isActive,
      order,
    } = req.body;

    if (!name || price === undefined || !description) {
      return res.status(400).json({
        success: false,
        message: "Name, price and description are required",
      });
    }

    if (!Array.isArray(features) || features.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one feature is required",
      });
    }

    const existingPlan = await PricingPlan.findOne({
      name: name.trim(),
    });

    if (existingPlan) {
      return res.status(409).json({
        success: false,
        message: "A pricing plan with this name already exists",
      });
    }

    const plan = await PricingPlan.create({
      name: name.trim(),
      price,
      currency: currency || "$",
      description: description.trim(),
      features: features
        .map((feature) => String(feature).trim())
        .filter(Boolean),
      isPopular: Boolean(isPopular),
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      order: order ?? 0,
    });

    return res.status(201).json({
      success: true,
      message: "Pricing plan created successfully",
      plan,
    });
  } catch (error) {
    console.error("Create Pricing Plan Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create pricing plan",
    });
  }
};

// ===============================
// ADMIN: Update pricing plan
// ===============================
export const updatePricingPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      price,
      currency,
      description,
      features,
      isPopular,
      isActive,
      order,
    } = req.body;

    const plan = await PricingPlan.findById(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Pricing plan not found",
      });
    }

    if (name !== undefined) {
      const trimmedName = name.trim();

      const duplicatePlan = await PricingPlan.findOne({
        name: trimmedName,
        _id: { $ne: id },
      });

      if (duplicatePlan) {
        return res.status(409).json({
          success: false,
          message: "A pricing plan with this name already exists",
        });
      }

      plan.name = trimmedName;
    }

    if (price !== undefined) {
      plan.price = price;
    }

    if (currency !== undefined) {
      plan.currency = currency.trim();
    }

    if (description !== undefined) {
      plan.description = description.trim();
    }

    if (features !== undefined) {
      if (!Array.isArray(features) || features.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one feature is required",
        });
      }

      plan.features = features
        .map((feature) => String(feature).trim())
        .filter(Boolean);

      if (plan.features.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one valid feature is required",
        });
      }
    }

    if (isPopular !== undefined) {
      plan.isPopular = Boolean(isPopular);
    }

    if (isActive !== undefined) {
      plan.isActive = Boolean(isActive);
    }

    if (order !== undefined) {
      plan.order = order;
    }

    await plan.save();

    return res.status(200).json({
      success: true,
      message: "Pricing plan updated successfully",
      plan,
    });
  } catch (error) {
    console.error("Update Pricing Plan Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update pricing plan",
    });
  }
};

// ===============================
// ADMIN: Delete pricing plan
// ===============================
export const deletePricingPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await PricingPlan.findById(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Pricing plan not found",
      });
    }

    await plan.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Pricing plan deleted successfully",
    });
  } catch (error) {
    console.error("Delete Pricing Plan Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete pricing plan",
    });
  }
};
