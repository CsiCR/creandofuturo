import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { client } from '../utils/sanityClient';

const Footer = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const query = '*[_type == "ajustes"][0] { telefono, email, direccion, inscripcionesEtiqueta, instagramUrl, facebookUrl }';
        client.fetch(query)
            .then(data => setSettings(data))
            .catch(console.error);
    }, []);

    const contactData = {
        phone: settings?.telefono || "+54 9 297 427-7686",
        email: settings?.email || "info@cpsapicotruncado.com",
        address: settings?.direccion || "CIC Centro de Integración y Enseñanza – Urquiza y Saavedra, Pico Truncado, Santa Cruz.",
        inscripEtiqueta: settings?.inscripcionesEtiqueta || "2026",
        instagram: settings?.instagramUrl,
        facebook: settings?.facebookUrl
    };

    return (
        <footer className="bg-ps-black text-ps-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Col */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-black italic text-ps-green">CPSA</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Escuela de Psicología Social - Sede Pico Truncado.
                            Formamos agentes de cambio para transformar la realidad social en la Patagonia.
                        </p>
                        <div className="flex space-x-4">
                            {contactData.instagram && (
                                <a href={contactData.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ps-green transition-colors">
                                    <Instagram size={20} />
                                </a>
                            )}
                            {contactData.facebook && (
                                <a href={contactData.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-ps-green transition-colors">
                                    <Facebook size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Nav Col */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Navegación</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="/quienes-somos" className="hover:text-ps-white transition-colors">Quiénes Somos</Link></li>
                            <li><Link to="/oferta-academica" className="hover:text-ps-white transition-colors">Oferta Académica</Link></li>
                            <li><Link to="/inscripciones" className="hover:text-ps-white transition-colors">Inscripciones {contactData.inscripEtiqueta}</Link></li>
                            <li><Link to="/blog" className="hover:text-ps-white transition-colors">Blog de Salud Mental</Link></li>
                        </ul>
                    </div>

                    {/* Contact Col */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Contacto</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start space-x-3">
                                <MapPin size={18} className="text-ps-green shrink-0" />
                                <span>{contactData.address}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={18} className="text-ps-green shrink-0" />
                                <span>{contactData.phone.startsWith('+') ? contactData.phone : `+${contactData.phone}`}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-ps-green shrink-0" />
                                <span>{contactData.email}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Credits Col */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Certificaciones</h4>
                        <p className="text-xs text-gray-400 mb-4">
                            Carrera certificada por el Centro Psicosocial Argentino y Fundación Construyendo Alternativas.
                        </p>
                    </div>
                </div>

                <div className="border-t border-ps-gray pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                    <p>© {new Date().getFullYear()} CPSA Sede Pico Truncado. Todos los derechos reservados.</p>
                    <div className="flex space-x-4">
                        <span className="italic">Lema: "Creando Futuro"</span>
                        <span>Versión 1.0.0</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
