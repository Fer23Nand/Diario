import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:4000/api/entries', {
        headers: { 'x-auth-token': token }
      });
      setEntries(res.data);
    } catch (err) {
      console.error('Error al cargar las entradas', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchEntries();
  }, []);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    if (content === '') return;
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:4000/api/entries', { content }, {
        headers: { 'x-auth-token': token }
      });
      // Añadir la nueva entrada a la lista sin recargar la página
      setEntries([res.data, ...entries]);
      setContent(''); // Limpiar el área de texto
    } catch (err) {
      console.error('Error al guardar la entrada', err);
    }
  };

  if (loading) {
    return <p>Cargando diario...</p>
  }

  return (
    <div>
      <h2>Tu Diario</h2>
      <form onSubmit={onSubmit} className="entry-form">
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="¿Qué pasó hoy?"
          required
        ></textarea>
        <button type="submit" className="btn">Guardar Entrada</button>
      </form>

      <div className="entries-list" style={{marginTop: '2rem'}}>
        <h3>Tus Entradas Anteriores</h3>
        {entries.length > 0 ? entries.map(entry => (
          <div key={entry._id} className="entry">
            <p className="entry-date">{new Date(entry.date).toLocaleString('es-MX')}</p>
            <p>{entry.content}</p>
          </div>
        )) : <p>Aún no has escrito ninguna entrada.</p>}
      </div>
    </div>
  );
};

export default Dashboard;