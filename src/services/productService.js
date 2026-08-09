import api from "./api";

export const obtenerProductos = async (params = {}) => {
  const { data } = await api.get("/api/products", { params });
  return data;
};

export const obtenerProductoPorId = async (id) => {
  const { data } = await api.get(`/api/products/${id}`);
  return data;
};
