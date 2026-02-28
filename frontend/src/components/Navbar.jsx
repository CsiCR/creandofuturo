import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { client } from '../utils/sanityClient';

import logo from '../assets/logo.jpg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inscripEtiqueta, setInscripEtiqueta] = useState('2026');
    const location = useLocation();

    useEffect(() => {
        const query = '*[_type == "ajustes"][0] { inscripcionesEtiqueta }';
        client.fetch(query)
            .then(data => {
                if (data?.inscripcionesEtiqueta) setInscripEtiqueta(data.inscripcionesEtiqueta);
            })
            .catch(console.error);
    }, []);

    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Quiénes Somos', path: '/quienes-somos' },
        { name: 'Oferta Académica', path: '/oferta-academica' },
        { name: `Inscripciones ${inscripEtiqueta}`, path: '/inscripciones', highlight: true },
        { name: 'Blog', path: '/blog' },
        { name: 'Contacto', path: '/contacto' },
    ];

    return (
        <nav className="bg-ps-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm">
                                <img src={logo} alt="Logo CPSA" className="w-full h-full object-contain" />
                            </div>
                            <div className="hidden md:block leading-tight">
                                <span className="block text-ps-black font-bold text-lg">CPSA - Sede Pico Truncado</span>
                                <span className="block text-ps-gray text-xs uppercase tracking-widest">Creando Futuro</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={clsx(
                                    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                                    location.pathname === link.path
                                        ? "text-ps-green font-bold"
                                        : link.highlight
                                            ? "bg-ps-red text-white hover:bg-red-600 animate-pulse-subtle"
                                            : "text-ps-gray hover:text-ps-green"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-ps-gray hover:text-ps-green hover:bg-gray-100"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-ps-white border-b border-gray-100 absolute w-full shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={clsx(
                                    "block px-3 py-4 rounded-md text-base font-semibold",
                                    location.pathname === link.path
                                        ? "text-ps-green bg-gray-50"
                                        : link.highlight
                                            ? "text-ps-red border-l-4 border-ps-red"
                                            : "text-ps-gray hover:text-ps-green hover:bg-gray-50"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
