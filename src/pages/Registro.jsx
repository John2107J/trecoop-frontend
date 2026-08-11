import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrarUsuario } from "../services/authService";
import "./Registro.css";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      await registrarUsuario(nombre, email, password);
      setExito(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const mensaje = err.response?.data?.mensaje || "Error al registrarse";
      setError(mensaje);
    } finally {
      setCargando(false);
    }
  };

  if (exito) {
    return (
      <div className="login-page">
        <h1>¡Listo!</h1>
        <p>Tu cuenta fue creada. Redirigiendo al login...</p>
      </div>
    );
  }

  return (
    <div className="login-page">
      <h1>Crear cuenta</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <button className="btn btn-primary" type="submit" disabled={cargando}>
          {cargando ? "Creando cuenta..." : "Registrarme"}
        </button>
      </form>
      <p className="registro-link">
        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </div>
  );
};

export default Registro;
