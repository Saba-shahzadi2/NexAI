import api from "./axios";

// Get public pricing plans
export const getPricingPlans = async () => {
  const response = await api.get("/pricing");
  return response.data;
};
