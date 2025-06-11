import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard'; // Redirigir al dashboard al iniciar sesión
    } catch (err) {
      console.error(err.response.data);
      alert('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{ textAlign: 'center' }}>Iniciar Sesión</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" className="btn" value="Iniciar Sesión" />
      </form>
    </div>
  );
};

export default Login;