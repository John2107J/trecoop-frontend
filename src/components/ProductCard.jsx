import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { agregarProducto } from "../redux/slices/cartSlice";

const ProductCard = ({ producto }) => {
  const dispatch = useDispatch();

  const handleAgregarAlCarrito = () => {
    dispatch(agregarProducto(producto));
  };

  return (
    <div>
      <Link to={`/producto/${producto._id}`}>
        <h3>{producto.nombre}</h3>
      </Link>
      <p>{producto.descripcion}</p>
      <p>${producto.precio}</p>
      <p>Stock: {producto.stock}</p>
      {producto.categoria && <p>Categoría: {producto.categoria.nombre}</p>}
      <button onClick={handleAgregarAlCarrito} disabled={producto.stock === 0}>
        {producto.stock === 0 ? "Sin stock" : "Agregar al carrito"}
      </button>
    </div>
  );
};

export default ProductCard;
