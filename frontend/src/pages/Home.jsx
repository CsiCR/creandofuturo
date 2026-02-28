import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, GraduationCap, Users, ShieldCheck, Calendar } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { useSEO } from '../utils/seo';
import { client } from '../utils/sanityClient';

const Home = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const query = '*[_type == "ajustes"][0] { inscripcionesEtiqueta, inscripcionesPrecio, inscripcionesVencimiento }';
        client.fetch(query)
            .then(data => setSettings(data))
            .catch(console.error);
    }, []);

    const inscripData = {
        etiqueta: settings?.inscripcionesEtiqueta || "2026",
        precio: settings?.inscripcionesPrecio || "30.000",
        vencimiento: (settings?.inscripcionesVencimiento || "28/02/2026").replace(/-/g, '/')
    };

    useSEO(`Inscripciones Abiertas ${inscripData.etiqueta}`, `Escuela de Psicología Social Pico Truncado. Formamos agentes de cambio en la Patagonia. Inscripciones abiertas ${inscripData.etiqueta}.`);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative bg-ps-black py-20 lg:py-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-ps-green/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 animate-fade-in-up">
                            <div className="inline-block animate-bounce">
                                <Badge variant="yellow" className="text-sm md:text-base px-6 py-2 shadow-[0_0_20px_rgba(244,197,66,0.4)]">
                                    🚀 INSCRIPCIONES ABIERTAS - CICLO {inscripData.etiqueta}
                                </Badge>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                                Transformá la realidad con <span className="text-ps-green italic">Psicología Social</span>
                            </h1>
                            <p className="text-xl text-gray-300 max-w-lg">
                                Formamos agentes de cambio en Pico Truncado para intervenir en la salud mental comunitaria y el desarrollo humano.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button to="/inscripciones" variant="primary">Inscribite ahora</Button>
                                <Button to="/oferta-academica" variant="outline" className="text-ps-white hover:text-ps-black">Ver oferta académica</Button>
                            </div>
                        </div>
                        <div className="hidden lg:flex justify-center">
                            <div className="relative">
                                <div className="w-80 h-80 border-4 border-ps-green rounded-2xl rotate-3 absolute -top-4 -left-4"></div>
                                <div className="w-80 h-80 bg-ps-gray rounded-2xl relative z-10 flex items-center justify-center p-8 text-center text-ps-white">
                                    <div>
                                        <span className="block text-5xl font-black text-ps-green mb-2">3 AÑOS</span>
                                        <span className="text-lg opacity-80 italic italic leading-none">de formación profesional</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black mb-4">Certificaciones OFICIALES</h2>
                        <p className="text-ps-gray max-w-2xl mx-auto">Nuestro plan de estudio está diseñado para brindarte herramientas concretas desde el segundo año.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 border-2 border-ps-green rounded-xl bg-ps-green/5 space-y-4">
                            <Badge variant="green">2° Año</Badge>
                            <h3 className="text-2xl font-bold">Operador Preventivo en Salud Mental</h3>
                            <p className="text-ps-gray">Título intermedio con VALIDEZ NACIONAL que te permite insertarte laboralmente de manera temprana.</p>
                            <ul className="space-y-2">
                                <li className="flex items-center space-x-2 text-sm">
                                    <CheckCircle size={16} className="text-ps-green" />
                                    <span>Participación en dispositivos estatales y ONG</span>
                                </li>
                            </ul>
                        </div>
                        <div className="p-8 border-2 border-ps-black rounded-xl bg-ps-white space-y-4 shadow-xl">
                            <Badge variant="black">3° Año</Badge>
                            <h3 className="text-2xl font-bold">Psicólogo Social</h3>
                            <p className="text-ps-gray">Certificación emitida por el Centro Psicosocial Argentino y Fundación Construyendo Alternativas.</p>
                            <ul className="space-y-2">
                                <li className="flex items-center space-x-2 text-sm">
                                    <CheckCircle size={16} className="text-ps-green" />
                                    <span>Especialista en grupos y organizaciones</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-8">
                            <h2 className="text-3xl md:text-4xl font-black">Modalidad Presencial en Pico Truncado</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex space-x-4 p-4 bg-white rounded-lg shadow-sm">
                                    <Users className="text-ps-green shrink-0" />
                                    <div>
                                        <h4 className="font-bold">Encuentros Semanales</h4>
                                        <p className="text-sm text-ps-gray italic italic leading-none">Clases teóricas y prácticas de 2 horas.</p>
                                    </div>
                                </div>
                                <div className="flex space-x-4 p-4 bg-white rounded-lg shadow-sm">
                                    <Calendar className="text-ps-green shrink-0" />
                                    <div>
                                        <h4 className="font-bold">Grupo Operativo</h4>
                                        <p className="text-sm text-ps-gray italic italic leading-none">Segundo sábado de cada mes (obligatorio).</p>
                                    </div>
                                </div>
                                <div className="flex space-x-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-ps-red">
                                    <ShieldCheck className="text-ps-red shrink-0" />
                                    <div>
                                        <h4 className="font-bold">Requisitos</h4>
                                        <p className="text-sm text-ps-gray italic italic leading-none">Ser mayor de 18 años. No requiere secundario completo.</p>
                                    </div>
                                </div>
                                <div className="flex space-x-4 p-4 bg-white rounded-lg shadow-sm">
                                    <GraduationCap className="text-ps-green shrink-0" />
                                    <div>
                                        <h4 className="font-bold">Matrícula {inscripData.etiqueta}</h4>
                                        <p className="text-sm text-ps-gray italic italic leading-none">${inscripData.precio} (Promoción hasta {inscripData.vencimiento}).</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-ps-black p-8 rounded-2xl text-ps-white flex flex-col justify-center">
                            <h3 className="text-xl font-bold mb-4 italic italic leading-none text-ps-green">"La inscripción se confirma únicamente al abonar la matrícula."</h3>
                            <p className="text-sm text-gray-400 mb-6">Asegurá tu lugar hoy mismo y comenzá en Marzo.</p>
                            <Button to="/inscripciones" variant="primary" className="w-full">
                                Quiero inscribirme <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reasons Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-black mb-12">Razones para estudiar con nosotros</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            "Base teórica sólida (Pichon Rivière)",
                            "Prácticas desde el primer año",
                            "Ambiente comunitario y cercano",
                            "Docentes con amplia trayectoria",
                            "Título con rápida inserción laboral",
                            "Enfoque local en la Patagonia"
                        ].map((reason, i) => (
                            <div key={i} className="p-6 bg-gray-50 rounded-lg text-left border-l-4 border-ps-green">
                                <p className="font-bold italic italic leading-none">{reason}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
