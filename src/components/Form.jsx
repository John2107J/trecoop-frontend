import { useState } from "react";
import "./Form.css";

const Form = ({ productoInicial, categorias, onSubmit, onCancelar }) => {
  const [formData, setFormData] = useState(() => ({
    nombre: productoInicial?.nombre || "",
    precio: productoInicial?.precio || "",
    descripcion: productoInicial?.descripcion || "",
    stock: productoInicial?.stock || "",
    categoria: productoInicial?.categoria?._id || "",
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      precio: Number(formData.precio),
      stock: Number(formData.stock),
    });
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Precio</label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label>Categoría</label>
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          required
        >
          <option value="">Seleccioná una categoría</option>
          {categorias.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-primary">
          {productoInicial ? "Actualizar" : "Crear"} Producto
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancelar}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default Form;
