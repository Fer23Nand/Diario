import React from 'react';
import { Link } from 'react-router-dom';

// Estilos básicos para los botones, usando el CSS que ya tenemos
const buttonStyles = {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#333',
    padding: '0.7rem 1.5rem',
    margin: '0 0.5rem',
    borderRadius: '5px'
};

const Welcome = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h2>Bienvenido a tu Diario Personal Digital</h2>
      <p>Un lugar seguro para tus pensamientos.</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/register" className="btn">
  Registrarse
</Link>
<Link to="/login" className="btn" style={{marginLeft: '1rem'}}>
  Iniciar Sesión
</Link>
      </div>
    </div>
  );
};

export default Welcome;