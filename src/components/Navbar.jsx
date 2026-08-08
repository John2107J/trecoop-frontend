import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Trecoop</Link>
      <div>
        <Link to="/productos">Producto</Link>
        <Link to="/carrito"> Carrito</Link>
        <Link to="/login"> Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
