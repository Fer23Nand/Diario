import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importa los estilos base
import App from './App'; // Importa nuestro componente principal

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);