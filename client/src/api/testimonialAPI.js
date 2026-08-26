import api from "./axios";

// Get public testimonials
export const getTestimonials = async () => {
  const response = await api.get("/testimonials");
  return response.data;
};
