import api from "./api";

export const obtenerCategorias = async () => {
  const { data } = await api.get("/api/categories");
  return data;
};
