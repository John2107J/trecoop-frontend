import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside>
      <h3>Panel Admin</h3>
      <nav>
        <NavLink to="/admin">Productos</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
