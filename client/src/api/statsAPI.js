import api from "./axios";

export const getPublicStats = async () => {
  const response = await api.get("/stats");
  return response.data;
};
