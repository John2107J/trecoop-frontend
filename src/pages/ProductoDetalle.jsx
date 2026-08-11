import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { obtenerProductoPorId } from "../services/productService";
import { agregarProducto } from "../redux/slices/cartSlice";

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

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return null;

  return (
    <div>
      <Link to="/productos">← Volver a productos</Link>
      <h1>{producto.nombre}</h1>
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.precio}</p>
      <p>Stock disponible: {producto.stock}</p>
      {producto.categoria && <p>Categoría: {producto.categoria.nombre}</p>}
      {producto.vendedor && <p>Vendido por: {producto.vendedor.nombre}</p>}
      <button onClick={handleAgregarAlCarrito} disabled={producto.stock === 0}>
        {producto.stock === 0 ? "Sin stock" : "Agregar al carrito"}
      </button>
    </div>
  );
};

export default ProductoDetalle;
