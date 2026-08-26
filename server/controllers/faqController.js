import FAQ from "../models/FAQ.js";

// ==========================================
// PUBLIC - GET ACTIVE FAQs
// ==========================================

export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ isActive: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      faqs,
    });
  } catch (error) {
    console.error("Get FAQs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch FAQs.",
    });
  }
};

// ==========================================
// ADMIN - GET ALL FAQs
// ==========================================

export const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: 1 }).lean();

    return res.status(200).json({
      success: true,
      faqs,
    });
  } catch (error) {
    console.error("Get All FAQs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch FAQs.",
    });
  }
};

// ==========================================
// ADMIN - CREATE FAQ
// ==========================================

export const createFAQ = async (req, res) => {
  try {
    const { question, answer, order, isActive } = req.body;

    if (!question?.trim() || !answer?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question and answer are required.",
      });
    }

    const faq = await FAQ.create({
      question: question.trim(),
      answer: answer.trim(),
      order: Number(order) || 0,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    return res.status(201).json({
      success: true,
      message: "FAQ created successfully.",
      faq,
    });
  } catch (error) {
    console.error("Create FAQ Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create FAQ.",
    });
  }
};

// ==========================================
// ADMIN - UPDATE FAQ
// ==========================================

export const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, order, isActive } = req.body;

    const faq = await FAQ.findById(id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found.",
      });
    }

    if (question !== undefined) {
      faq.question = question.trim();
    }

    if (answer !== undefined) {
      faq.answer = answer.trim();
    }

    if (order !== undefined) {
      faq.order = Number(order) || 0;
    }

    if (isActive !== undefined) {
      faq.isActive = Boolean(isActive);
    }

    await faq.save();

    return res.status(200).json({
      success: true,
      message: "FAQ updated successfully.",
      faq,
    });
  } catch (error) {
    console.error("Update FAQ Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update FAQ.",
    });
  }
};

// ==========================================
// ADMIN - DELETE FAQ
// ==========================================

export const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    const faq = await FAQ.findByIdAndDelete(id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "FAQ deleted successfully.",
    });
  } catch (error) {
    console.error("Delete FAQ Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete FAQ.",
    });
  }
};
