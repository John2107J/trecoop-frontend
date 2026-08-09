import { createSlice } from "@reduxjs/toolkit";

const cargarUsuarioInicial = () => {
  try {
    const data = localStorage.getItem("usuario");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error al leer el usuario de localStorage:", error);
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    usuario: cargarUsuarioInicial(),
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    setCredenciales: (state, action) => {
      const { usuario, token } = action.payload;
      state.usuario = usuario;
      state.token = token;

      localStorage.setItem("usuario", JSON.stringify(usuario));
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.usuario = null;
      state.token = null;

      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredenciales, logout } = authSlice.actions;
export default authSlice.reducer;
