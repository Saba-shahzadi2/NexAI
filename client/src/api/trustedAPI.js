import api from "./axios";

export const getTrustedCompanies = async () => {
  const response = await api.get("/trusted");
  return response.data;
};
