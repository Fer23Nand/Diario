import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('--- FRONTEND (1/4): Formulario enviado ---');
    console.log('--- FRONTEND (2/4): Datos a enviar:', formData);

    if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    try {
        console.log('--- FRONTEND (3/4): Enviando petición a http://localhost:4000/api/auth/register...');
        const res = await axios.post('http://localhost:4000/api/auth/register', formData);
        
        console.log('--- FRONTEND (4/4): ¡ÉXITO! Respuesta del servidor recibida: ---');
        console.log(res.data);

        localStorage.setItem('token', res.data.token);
        window.location.href = '/dashboard'; 

    } catch (err) {
        console.error('--- FRONTEND (ERROR): La petición falló y entró al bloque catch. ---');
        console.error('Este es el objeto de error completo:', err);
        if (err.response) {
            console.error('Datos de la respuesta de error:', err.response.data);
            console.error('Status de la respuesta de error:', err.response.status);
        } else {
            console.error('El error no tuvo una respuesta del servidor. Podría ser un error de red o CORS.');
        }
        alert('Error al registrar el usuario. Revisa la consola para más detalles.');
    }
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{ textAlign: 'center' }}>Crear una Cuenta</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
            minLength="6"
            required
          />
        </div>
        <input type="submit" className="btn" value="Registrarse" />
      </form>
    </div>
  );
};

export default Register;