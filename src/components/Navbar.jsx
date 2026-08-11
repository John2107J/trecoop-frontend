import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import "./Navbar.css";

const Navbar = () => {
  const { usuario } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Trecoop
      </Link>
      <div className="navbar-links">
        <Link to="/productos">Productos</Link>
        <Link to="/carrito">Carrito</Link>

        {usuario ? (
          <div className="navbar-user">
            <span className="navbar-greeting">Hola, {usuario.nombre}</span>
            {usuario.role === "administrador" && <Link to="/admin">Admin</Link>}
            <button className="navbar-logout" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
