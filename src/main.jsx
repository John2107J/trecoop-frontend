import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./styles/variables.css";
import "./styles/global.css";

import Registro from "./pages/Registro";
import { store } from "./redux/store";
import MainLayout from "./layouts/MainLayout";
import RutaPrivada from "./components/RutaPrivada";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "productos", element: <Productos /> },
      { path: "producto/:id", element: <ProductoDetalle /> },
      { path: "carrito", element: <Carrito /> },
      { path: "login", element: <Login /> },
      { path: "registro", element: <Registro /> },
      {
        path: "admin",
        element: (
          <RutaPrivada rolesPermitidos={["administrador"]}>
            <Admin />
          </RutaPrivada>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
