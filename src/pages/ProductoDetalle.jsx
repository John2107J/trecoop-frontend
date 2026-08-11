import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { obtenerProductoPorId } from "../services/productService";
import { agregarProducto } from "../redux/slices/cartSlice";
import "./ProductoDetalle.css";

const ProductoDetalle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setError(null);
        const data = await obtenerProductoPorId(id);
        setProducto(data);
      } catch (err) {
        setError("No se pudo cargar el producto. Puede que no exista.");
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    cargarProducto();
  }, [id]);

  const handleAgregarAlCarrito = () => {
    dispatch(agregarProducto(producto));
  };

  if (cargando) return <p className="container">Cargando producto...</p>;
  if (error) return <p className="container">{error}</p>;
  if (!producto) return null;

  return (
    <div className="detalle-page container">
      <Link to="/productos" className="detalle-volver">
        ← Volver a productos
      </Link>
      <h1>{producto.nombre}</h1>
      <p className="detalle-desc">{producto.descripcion}</p>
      {producto.categoria && (
        <p className="detalle-meta">Categoría: {producto.categoria.nombre}</p>
      )}
      {producto.vendedor && (
        <p className="detalle-meta">Vendido por: {producto.vendedor.nombre}</p>
      )}
      <p className="detalle-meta">Stock disponible: {producto.stock}</p>

      <div className="detalle-footer">
        <span className="price-tag">${producto.precio}</span>
        <button
          className="btn btn-primary"
          onClick={handleAgregarAlCarrito}
          disabled={producto.stock === 0}
        >
          {producto.stock === 0 ? "Sin stock" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
};

export default ProductoDetalle;
