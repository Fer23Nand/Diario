import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes y Páginas
import Navbar from './components/layout/Navbar';
import Welcome from './pages/Welcome';
import Register from './components/auth/Register';
import Login from './components/auth/Login'; // <-- DESCOMENTA ESTA LÍNEA
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> {/* <-- Y DESCOMENTA ESTA OTRA */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;