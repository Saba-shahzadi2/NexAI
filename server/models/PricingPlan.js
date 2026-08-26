import mongoose from "mongoose";

const pricingPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "$",
      trim: true,
      maxlength: 5,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    features: {
      type: [String],
      required: true,
      validate: {
        validator: (features) => features.length > 0,
        message: "At least one feature is required",
      },
    },

    isPopular: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const PricingPlan = mongoose.model("PricingPlan", pricingPlanSchema);

export default PricingPlan;
