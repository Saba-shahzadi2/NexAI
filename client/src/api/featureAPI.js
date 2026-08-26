import api from "./axios";

// Get all active features for the public website.
export const getFeatures = async () => {
  const response = await api.get("/features");
  return response.data;
};
