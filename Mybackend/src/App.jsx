import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container-xxl py-4">
        <Home />
      </div>
      <Footer />
    </>
  );
}
