import api from "./api";

export const login = async (email, password) => {
  const { data } = await api.post("/api/auth/login", { email, password });
  return data;
};

export const registrarUsuario = async (nombre, email, password) => {
  const { data } = await api.post("/api/users", {
    nombre,
    email,
    password,
    role: "comprador",
  });
  return data;
};
