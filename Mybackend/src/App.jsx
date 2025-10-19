
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Blogs from "./pages/Blogs.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";
import AdminProductos from "./pages/AdminProductos.jsx";

export default function App() {
  return (
    <>
     
      <div className="container-xxl py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/productos" element={<AdminProductos />} />


        
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
