import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Form from "../components/Form";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../services/productService";
import { obtenerCategorias } from "../services/categoryService";

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  const cargarDatos = async () => {
    try {
      const [dataProductos, dataCategorias] = await Promise.all([
        obtenerProductos(),
        obtenerCategorias(),
      ]);
      setProductos(dataProductos);
      setCategorias(dataCategorias);
    } catch (err) {
      setError("No se pudieron cargar los datos del panel.");
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleNuevoProducto = () => {
    setProductoEditando(null);
    setMostrarForm(true);
  };

  const handleEditarProducto = (producto) => {
    setProductoEditando(producto);
    setMostrarForm(true);
  };

  const handleEliminarProducto = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que querés eliminar este producto?",
    );
    if (!confirmar) return;

    try {
      await eliminarProducto(id);
      setProductos((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Error al eliminar el producto");
      console.error(err);
    }
  };

  const handleSubmitForm = async (datosForm) => {
    try {
      if (productoEditando) {
        const actualizado = await actualizarProducto(
          productoEditando._id,
          datosForm,
        );
        setProductos((prev) =>
          prev.map((p) => (p._id === actualizado._id ? actualizado : p)),
        );
      } else {
        const nuevoProducto = await crearProducto(datosForm);
        setProductos((prev) => [...prev, nuevoProducto]);
      }
      setMostrarForm(false);
      setProductoEditando(null);
    } catch (err) {
      alert("Error al guardar el producto");
      console.error(err);
    }
  };

  const handleCancelar = () => {
    setMostrarForm(false);
    setProductoEditando(null);
  };

  if (cargando) return <p>Cargando panel...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div>
        <h1>Panel de Administración</h1>

        {mostrarForm ? (
          <Form
            key={productoEditando?._id || "nuevo"}
            productoInicial={productoEditando}
            categorias={categorias}
            onSubmit={handleSubmitForm}
            onCancelar={handleCancelar}
          />
        ) : (
          <>
            <button onClick={handleNuevoProducto}>+ Nuevo Producto</button>

            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto._id}>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>{producto.stock}</td>
                    <td>{producto.categoria?.nombre || "—"}</td>
                    <td>
                      <button onClick={() => handleEditarProducto(producto)}>
                        Editar
                      </button>
                      <button
                        onClick={() => handleEliminarProducto(producto._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
