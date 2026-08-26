import api from "./axios";

// Submit contact form
export const submitContact = async (contactData) => {
  const response = await api.post("/contact", contactData);
  return response.data;
};
