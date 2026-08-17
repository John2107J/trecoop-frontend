import api from "./api";

export const obtenerProductos = async (params = {}) => {
  const { data } = await api.get("/api/products", { params });
  return data;
};

export const obtenerProductoPorId = async (id) => {
  const { data } = await api.get(`/api/products/${id}`);
  return data;
};

export const finalizarCompra = async (items) => {
  const { data } = await api.post("/api/products/comprar", { items });
  return data;
};

export const crearProducto = async (producto) => {
  const { data } = await api.post("/api/products", producto);
  return data;
};

export const actualizarProducto = async (id, producto) => {
  const { data } = await api.put(`/api/products/${id}`, producto);
  return data;
};

export const eliminarProducto = async (id) => {
  const { data } = await api.delete(`/api/products/${id}`);
  return data;
};
