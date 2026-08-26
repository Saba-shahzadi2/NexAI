import Testimonial from "../models/Testimonial.js";

// GET public testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    console.error("Get Testimonials Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch testimonials.",
    });
  }
};

// GET all testimonials - admin
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    console.error("Get All Testimonials Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch testimonials.",
    });
  }
};

// CREATE testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { name, role, review, avatar, rating, order, isActive } = req.body;

    if (!name || !role || !review || !avatar) {
      return res.status(400).json({
        success: false,
        message: "Name, role, review and avatar are required.",
      });
    }

    const testimonial = await Testimonial.create({
      name,
      role,
      review,
      avatar,
      rating: rating ?? 5,
      order: order ?? 0,
      isActive: isActive ?? true,
    });

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully.",
      testimonial,
    });
  } catch (error) {
    console.error("Create Testimonial Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create testimonial.",
    });
  }
};

// UPDATE testimonial
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully.",
      testimonial,
    });
  } catch (error) {
    console.error("Update Testimonial Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update testimonial.",
    });
  }
};

// DELETE testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Testimonial Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete testimonial.",
    });
  }
};
