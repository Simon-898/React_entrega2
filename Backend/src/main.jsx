import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/global.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { CartProvider } from './context/CartContext.jsx'; 

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>       
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
