import HowItWorks from "../models/HowItWorks.js";

// Public
export const getHowItWorks = async (req, res) => {
  try {
    const steps = await HowItWorks.find({
      isActive: true,
    }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      steps,
    });
  } catch (error) {
    console.error("Get How It Works Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load how it works steps.",
    });
  }
};

// Admin
export const getAllHowItWorks = async (req, res) => {
  try {
    const steps = await HowItWorks.find().sort({
      order: 1,
    });

    res.status(200).json({
      success: true,
      steps,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load steps.",
    });
  }
};

export const createHowItWorks = async (req, res) => {
  try {
    const { number, title, description, order, isActive } = req.body;

    const step = await HowItWorks.create({
      number,
      title,
      description,
      order,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "How it works step created successfully.",
      step,
    });
  } catch (error) {
    console.error("Create How It Works Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create step.",
    });
  }
};

export const updateHowItWorks = async (req, res) => {
  try {
    const step = await HowItWorks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!step) {
      return res.status(404).json({
        success: false,
        message: "Step not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "How it works step updated successfully.",
      step,
    });
  } catch (error) {
    console.error("Update How It Works Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update step.",
    });
  }
};

export const deleteHowItWorks = async (req, res) => {
  try {
    const step = await HowItWorks.findByIdAndDelete(req.params.id);

    if (!step) {
      return res.status(404).json({
        success: false,
        message: "Step not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "How it works step deleted successfully.",
    });
  } catch (error) {
    console.error("Delete How It Works Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete step.",
    });
  }
};
