import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { agregarProducto } from "../redux/slices/cartSlice";
import "./ProductCard.css";

const ProductCard = ({ producto }) => {
  const dispatch = useDispatch();

  const handleAgregarAlCarrito = () => {
    dispatch(agregarProducto(producto));
  };

  return (
    <div className="product-card">
      <Link to={`/producto/${producto._id}`} className="product-card-title">
        <h3>{producto.nombre}</h3>
      </Link>
      <p className="product-card-desc">{producto.descripcion}</p>
      {producto.categoria && (
        <p className="product-card-meta">
          {producto.categoria.nombre} · Stock: {producto.stock}
        </p>
      )}
      <div className="product-card-footer">
        <span className="price-tag">${producto.precio}</span>
        <button
          className="btn btn-primary"
          onClick={handleAgregarAlCarrito}
          disabled={producto.stock === 0}
        >
          {producto.stock === 0 ? "Sin stock" : "Agregar"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
