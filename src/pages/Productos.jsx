import { useState, useEffect } from "react";
import { obtenerProductos } from "../services/productService";
import ProductCard from "../components/ProductCard";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
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
        <div>
          {productos.map((producto) => (
            <ProductCard key={producto._id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Productos;
