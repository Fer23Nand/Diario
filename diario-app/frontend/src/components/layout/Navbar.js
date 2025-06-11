import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Más adelante, esta lógica será más robusta
  const token = localStorage.getItem('token');

  const onLogout = () => {
    localStorage.removeItem('token');
    // Forzar la recarga de la página para que se actualice el estado
    window.location.reload();
  };

  const authLinks = (
    <ul>
      <li>
        <button onClick={onLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Registrarse</Link>
      </li>
      <li>
        <Link to="/login">Iniciar Sesión</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <h1>
        <Link to="/">Diario Personal</Link>
      </h1>
      <>{token ? authLinks : guestLinks}</>
    </nav>
  );
};

export default Navbar;