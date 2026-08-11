import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-hero">
      <img
        src="/logo-trecoop.png"
        alt="Trecoop - Cooperativa de Trabajo"
        className="home-logo"
      />
      <p className="home-tagline">
        Materiales y soluciones para la construcción de tu obra.
      </p>
      <Link to="/productos" className="btn btn-primary home-cta">
        Ver productos
      </Link>
    </div>
  );
};

export default Home;
