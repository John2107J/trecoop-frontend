import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Panel Admin</h3>
      <nav>
        <NavLink to="/admin">Productos</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
