import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const { usuario } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav>
      <Link to="/">Trecoop</Link>
      <div>
        <Link to="/productos">Productos</Link>
        <Link to="/carrito">Carrito</Link>

        {usuario ? (
          <>
            <span>Hola, {usuario.nombre}</span>
            {usuario.role === "administrador" && <Link to="/admin">Admin</Link>}
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
