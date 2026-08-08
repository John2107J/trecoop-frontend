import { createSlice } from "@reduxjs/toolkit";

const cargarCarritoInicial = () => {
  try {
    const data = localStorage.getItem("carrito");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error al leer el carrito de localStorage:", error);
    return [];
  }
};

const guardarCarrito = (items) => {
  localStorage.setItem("carrito", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: cargarCarritoInicial(),
  },
  reducers: {
    agregarProducto: (state, action) => {
      const producto = action.payload;
      const existente = state.items.find((item) => item._id === producto._id);

      if (existente) {
        existente.cantidad += 1;
      } else {
        state.items.push({ ...producto, cantidad: 1 });
      }

      guardarCarrito(state.items);
    },
    eliminarProducto: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item._id !== id);
      guardarCarrito(state.items);
    },
    vaciarCarrito: (state) => {
      state.items = [];
      guardarCarrito(state.items);
    },
  },
});

export const { agregarProducto, eliminarProducto, vaciarCarrito } =
  cartSlice.actions;
export default cartSlice.reducer;
