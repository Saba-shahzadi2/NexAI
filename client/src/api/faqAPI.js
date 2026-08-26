import api from "./axios";

// Get public FAQs
export const getFAQs = async () => {
  const response = await api.get("/faq");
  return response.data;
};
