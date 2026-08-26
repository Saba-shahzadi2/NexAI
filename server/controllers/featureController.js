import Feature from "../models/Feature.js";

// ==========================================
// PUBLIC - GET ACTIVE FEATURES
// ==========================================

export const getFeatures = async (req, res, next) => {
  try {
    const features = await Feature.find({
      isActive: true,
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      features,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// ADMIN - GET ALL FEATURES
// ==========================================

export const getAllFeatures = async (req, res, next) => {
  try {
    const features = await Feature.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      features,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// ADMIN - CREATE FEATURE
// ==========================================

export const createFeature = async (req, res, next) => {
  try {
    const { title, description, icon, order, isActive } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    const feature = await Feature.create({
      title,
      description,
      icon: icon || "FiZap",
      order: order || 0,
      isActive: isActive ?? true,
    });

    res.status(201).json({
      success: true,
      message: "Feature created successfully.",
      feature,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// ADMIN - UPDATE FEATURE
// ==========================================

export const updateFeature = async (req, res, next) => {
  try {
    const { id } = req.params;

    const feature = await Feature.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Feature not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feature updated successfully.",
      feature,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// ADMIN - DELETE FEATURE
// ==========================================

export const deleteFeature = async (req, res, next) => {
  try {
    const { id } = req.params;

    const feature = await Feature.findByIdAndDelete(id);

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Feature not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feature deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
