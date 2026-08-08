import { useSelector, useDispatch } from "react-redux";
import { eliminarProducto, vaciarCarrito } from "../redux/slices/cartSlice";

const Carrito = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );

  if (items.length === 0) {
    return (
      <div>
        <h1>Carrito</h1>
        <p>Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Carrito</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.nombre} - Cantidad: {item.cantidad} - $
            {item.precio * item.cantidad}
            <button onClick={() => dispatch(eliminarProducto(item._id))}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <p>Total: ${total}</p>
      <button onClick={() => dispatch(vaciarCarrito())}>Vaciar carrito</button>
    </div>
  );
};

export default Carrito;
