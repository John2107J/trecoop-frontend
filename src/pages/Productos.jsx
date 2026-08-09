import { useState, useEffect } from "react";
import { obtenerProductos } from "../services/productService";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true);
        const data = await obtenerProductos();
        setProductos(data);
      } catch (err) {
        setError(
          "No se pudieron cargar los productos. Intentá de nuevo más tarde.",
        );
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Productos</h1>
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul>
          {productos.map((producto) => (
            <li key={producto._id}>
              {producto.nombre} - ${producto.precio} - Stock: {producto.stock}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Productos;
