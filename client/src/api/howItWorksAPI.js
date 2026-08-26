import api from "./axios";

// Get public How It Works data.
export const getHowItWorks = async () => {
  const response = await api.get("/how-it-works");
  return response.data;
};
