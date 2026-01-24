import api from "./axios";

export const loginApi = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerApi = async (data) => {
  await api.post("/auth/register", data);
};
