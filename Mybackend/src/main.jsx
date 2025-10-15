import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Estilos globales
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/global.css';

// JS de Bootstrap (para dropdowns, carruseles, etc.)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
