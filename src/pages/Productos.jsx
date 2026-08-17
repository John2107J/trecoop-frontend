import { useState, useEffect } from "react";
import { obtenerProductos } from "../services/productService";
import ProductCard from "../components/ProductCard";
import "./Productos.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true);
        setError(null);
        const data = await obtenerProductos(
          busqueda ? { buscar: busqueda } : {},
        );

        if (!Array.isArray(data)) {
          throw new Error(
            "La API no devolvió un array de productos. Verificá VITE_API_URL en el .env del frontend.",
          );
        }

        setProductos(data);
      } catch (err) {
        setError(
          "No se pudieron cargar los productos. Verificá que el backend esté corriendo y que VITE_API_URL esté bien configurada.",
        );
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    const timeoutId = setTimeout(() => {
      cargarProductos();
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [busqueda]);

  return (
    <div className="productos-page container">
      <h1>Productos</h1>
      <input
        type="text"
        className="productos-buscador"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      {cargando && <p>Cargando productos...</p>}
      {error && <p>{error}</p>}
      {!cargando && !error && productos.length === 0 && (
        <p>No se encontraron productos.</p>
      )}
      {!cargando && !error && productos.length > 0 && (
        <div className="productos-grid">
          {productos.map((producto) => (
            <ProductCard key={producto._id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Productos;
