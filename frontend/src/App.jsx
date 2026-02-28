import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';

// Real Pages
import Home from './pages/Home';
import QuienesSomos from './pages/QuienesSomos';
import OfertaAcademica from './pages/OfertaAcademica';
import Inscripciones from './pages/Inscripciones';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contacto from './pages/Contacto';

const NotFound = () => (
  <div className="py-40 text-center space-y-6">
    <h1 className="text-6xl font-black italic italic leading-none text-ps-green">404</h1>
    <h2 className="text-2xl font-bold">Página no encontrada</h2>
    <p className="text-ps-gray max-w-sm mx-auto italic italic leading-none">Parece que el camino que buscás no existe o fue movido.</p>
    <div className="pt-4">
      <Link to="/" className="bg-ps-black text-white px-6 py-3 rounded-lg font-bold">Volver al inicio</Link>
    </div>
  </div>
);

// Necesito importar Link para NotFound
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/oferta-academica" element={<OfertaAcademica />} />
          <Route path="/inscripciones" element={<Inscripciones />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
