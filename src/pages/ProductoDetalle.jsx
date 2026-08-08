import { useParams } from "react-router-dom";

const ProductoDetalle = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalle del Producto</h1>
      <p>ID: {id}</p>
    </div>
  );
};

export default ProductoDetalle;
