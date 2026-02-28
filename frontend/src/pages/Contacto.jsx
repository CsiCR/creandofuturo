import { useState, useEffect } from 'react';
import { client } from '../utils/sanityClient';
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { useSEO } from '../utils/seo';
import { getWhatsAppLink } from '../utils/whatsapp';

const Contacto = () => {
    useSEO("Contacto", "Comunicate con la Escuela Psicosocial CPSA Sede Pico Truncado. Ubicación, horarios y canales oficiales.");

    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const query = `*[_type == "ajustes"][0] {
            telefono,
            email,
            direccion,
            horarios,
            googleMapsUrl
        }`;

        client.fetch(query)
            .then((data) => {
                setSettings(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    // Default values if settings not yet loaded or configured
    const contactData = {
        phone: settings?.telefono || "5492974277686",
        email: settings?.email || "info@cpsapicotruncado.com",
        address: settings?.direccion || "CIC Centro de Integración y Enseñanza – Urquiza y Saavedra, Pico Truncado.",
        hours: settings?.horarios || "Lunes a Viernes 18:00 a 20:00 hs.",
        mapUrl: settings?.googleMapsUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2685.253684210352!2d-67.965225!3d-46.79383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbc4e5b9f7a9f7a9f%3A0x7a9f7a9f7a9f7a9f!2sUrquiza%20%26%20Saavedra%2C%20Pico%20Truncado%2C%20Santa%20Cruz!5e0!3m2!1ses!2sar!4v1700000000000"
    };

    if (loading) {
        return (
            <div className="py-40 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ps-green"></div>
            </div>
        );
    }

    return (
        <div className="py-20 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                <div className="text-center space-y-4">
                    <Badge variant="green">Estamos para ayudarte</Badge>
                    <h1 className="text-4xl font-black italic italic leading-none">Canales de Contacto</h1>
                    <p className="text-ps-gray max-w-xl mx-auto">
                        ¿Tenés dudas sobre las carreras o el proceso de inscripción? Escribinos por cualquiera de nuestros medios oficiales.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Info Side */}
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-white rounded-2xl shadow-sm space-y-3">
                                <MapPin className="text-ps-green" size={24} />
                                <h3 className="font-black italic italic leading-none uppercase text-xs tracking-widest">Nuestra Sede</h3>
                                <p className="text-sm text-ps-gray leading-none">{contactData.address}</p>
                            </div>
                            <div className="p-6 bg-white rounded-2xl shadow-sm space-y-3">
                                <MessageCircle className="text-[#25D366]" size={24} />
                                <h3 className="font-black italic italic leading-none uppercase text-xs tracking-widest">WhatsApp</h3>
                                <p className="text-sm text-ps-gray leading-none">+{contactData.phone}</p>
                                <a
                                    href={getWhatsAppLink(contactData.phone, "Hola! Quiero realizar una consulta general.")}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs font-bold text-ps-green underline"
                                >
                                    Escribir ahora
                                </a>
                            </div>
                            <div className="p-6 bg-white rounded-2xl shadow-sm space-y-3">
                                <Mail className="text-ps-green" size={24} />
                                <h3 className="font-black italic italic leading-none uppercase text-xs tracking-widest">Email Oficial</h3>
                                <p className="text-sm text-ps-gray leading-none">{contactData.email}</p>
                            </div>
                            <div className="p-6 bg-white rounded-2xl shadow-sm space-y-3 border-l-4 border-ps-yellow">
                                <Clock className="text-ps-yellow" size={24} />
                                <h3 className="font-black italic italic leading-none uppercase text-xs tracking-widest text-ps-black">Horarios</h3>
                                <p className="text-sm text-ps-gray leading-none">{contactData.hours}</p>
                            </div>
                        </div>

                        <div className="p-8 bg-ps-black rounded-3xl text-ps-white space-y-6 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-ps-green/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                            <h3 className="text-2xl font-black italic italic leading-none">Consultas de Inscripción</h3>
                            <p className="text-gray-400 text-sm">Si ya completaste el formulario y necesitás la info de pago, hacé click debajo:</p>
                            <Button
                                to={getWhatsAppLink(contactData.phone, "Hola! Ya completé el formulario y quisiera recibir los datos de pago.")}
                                variant="primary"
                                className="w-full"
                            >
                                Pedir datos de matrícula <MessageCircle size={18} className="ml-2" />
                            </Button>
                        </div>
                    </div>

                    {/* Map Side */}
                    <div className="bg-white p-4 rounded-3xl shadow-lg border border-gray-100 flex flex-col">
                        <div className="p-4 border-b border-gray-100 mb-4 flex justify-between items-center">
                            <span className="font-black italic italic leading-none uppercase text-xs">Mapa de Ubicación</span>
                            <Badge>Pico Truncado</Badge>
                        </div>
                        <div className="flex-grow rounded-2xl overflow-hidden min-h-[400px]">
                            <iframe
                                title="Ubicación CPSA Pico Truncado"
                                src={contactData.mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
