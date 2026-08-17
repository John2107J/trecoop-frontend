import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { eliminarProducto, vaciarCarrito } from "../redux/slices/cartSlice";
import { finalizarCompra } from "../services/productService";
import "./Carrito.css";

const Carrito = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState(null);

  const total = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );

  const handleFinalizarCompra = async () => {
    setError(null);
    setProcesando(true);

    try {
      const itemsParaComprar = items.map((item) => ({
        productoId: item._id,
        cantidad: item.cantidad,
      }));

      await finalizarCompra(itemsParaComprar);

      dispatch(vaciarCarrito());
      alert("¡Compra realizada con éxito!");
      navigate("/productos");
    } catch (err) {
      const mensaje =
        err.response?.data?.mensaje || "Error al procesar la compra";
      setError(mensaje);
    } finally {
      setProcesando(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="carrito-page container">
        <h1>Carrito</h1>
        <p className="carrito-vacio">Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="carrito-page container">
      <h1>Carrito</h1>
      <ul className="carrito-lista">
        {items.map((item) => (
          <li key={item._id} className="carrito-item">
            <div className="carrito-item-info">
              <span className="carrito-item-nombre">{item.nombre}</span>
              <span className="carrito-item-detalle">
                Cantidad: {item.cantidad} · ${item.precio * item.cantidad}
              </span>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => dispatch(eliminarProducto(item._id))}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="carrito-total">
        <span>Total</span>
        <span>${total}</span>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="carrito-acciones">
        <button
          className="btn btn-secondary"
          onClick={() => dispatch(vaciarCarrito())}
        >
          Vaciar carrito
        </button>
        <button
          className="btn btn-primary"
          onClick={handleFinalizarCompra}
          disabled={procesando}
        >
          {procesando ? "Procesando..." : "Finalizar compra"}
        </button>
      </div>
    </div>
  );
};

export default Carrito;
