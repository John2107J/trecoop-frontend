import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RutaPrivada = ({ children, rolesPermitidos }) => {
  const { usuario } = useSelector((state) => state.auth);

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaPrivada;
