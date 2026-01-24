import api from "./axios";

export const getProductsApi = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const addProductApi = async (product) => {
  const res = await api.post("/products", product);
  return res.data;
};
