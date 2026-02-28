import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, FileText, CheckCircle2, AlertCircle, ExternalLink, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { useSEO } from '../utils/seo';
import { getWhatsAppLink } from '../utils/whatsapp';
import { client } from '../utils/sanityClient';
import { clsx } from 'clsx';

const Inscripciones = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);

    useEffect(() => {
        const query = '*[_type == "ajustes"][0] { telefono, inscripcionesEtiqueta, inscripcionesPrecio, inscripcionesVencimiento }';
        client.fetch(query)
            .then(data => {
                setSettings(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    const inscripData = {
        phone: settings?.telefono || "5492974277686",
        etiqueta: settings?.inscripcionesEtiqueta || "2026",
        precio: settings?.inscripcionesPrecio || "30.000",
        vencimiento: (settings?.inscripcionesVencimiento || "28/02/2026").replace(/-/g, '/')
    };

    useSEO(`Inscripciones ${inscripData.etiqueta}`, `Completá tu inscripción para el ciclo lectivo ${inscripData.etiqueta} en la Escuela Psicosocial CPSA.`);

    // Google Forms URL
    const GOOGLE_FORMS_URL = "https://forms.gle/haMcQNxJosxHqzUK7";

    const inscriptionMessage = `Hola! Completé el formulario de inscripción de Psicología Social ${inscripData.etiqueta}. ¿Me pasás info de pago de la matrícula ($${inscripData.precio} hasta ${inscripData.vencimiento})?`;

    if (loading) {
        return (
            <div className="py-40 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ps-green"></div>
            </div>
        );
    }

    return (
        <div className="py-20 bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-4">
                    <Badge variant="red" className="animate-pulse">Ciclo Lectivo {inscripData.etiqueta}</Badge>
                    <h1 className="text-4xl font-black italic italic leading-none">Inscripción en 3 Pasos</h1>
                    <p className="text-ps-gray">Seguí el proceso para asegurar tu lugar en la cohorte de Marzo.</p>
                </div>

                {/* Stepper Visual */}
                <div className="relative flex justify-between items-center max-w-2xl mx-auto">
                    <div className="absolute h-1 bg-gray-100 top-1/2 left-0 w-full -z-10 -translate-y-1/2"></div>
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={clsx(
                                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300",
                                step >= s ? "bg-ps-green text-ps-black shadow-lg scale-110" : "bg-white border-2 border-gray-200 text-gray-300"
                            )}
                        >
                            {s}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-xl">
                    {step === 1 && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-ps-green/20 rounded-lg text-ps-green">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black italic italic leading-none">Paso 1: Completar Formulario</h3>
                                    <p className="text-sm text-ps-gray">Ingresá tus datos personales y elegí tu carrera.</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-4">
                                    <p className="text-sm leading-relaxed text-ps-gray">
                                        Para iniciar tu camino en CPSA, primero debés completar el formulario oficial de Google.
                                        Esto nos permite registrar tus datos y enviarte la confirmación por correo.
                                    </p>
                                    <Button to={GOOGLE_FORMS_URL} variant="primary" className="w-full h-14 text-lg">
                                        Abrir formulario de inscripción <ExternalLink size={20} className="ml-2" />
                                    </Button>
                                </div>

                                <div className="p-4 bg-ps-yellow/5 rounded-xl border border-ps-yellow/20 flex items-start space-x-3">
                                    <AlertCircle size={20} className="text-ps-yellow shrink-0 mt-0.5" />
                                    <p className="text-xs text-ps-gray leading-tight">
                                        El formulario se abrirá en una pestaña nueva. Al finalizar, regresá aquí para continuar con el Paso 2 (Pago de Matrícula).
                                    </p>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button onClick={() => setStep(2)} variant="secondary">Ya completé el formulario <ArrowRight size={18} className="ml-2" /></Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-ps-green/20 rounded-lg text-ps-green">
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black italic italic leading-none">Paso 2: Pedir Info de Pago</h3>
                                    <p className="text-sm text-ps-gray">Contactanos por WhatsApp para recibir los datos de pago.</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 shadow-sm">
                                <p className="text-sm leading-relaxed">
                                    Para confirmar tu vacante, debés enviar un mensaje solicitando los datos bancarios para el pago de la matrícula.
                                </p>
                                <div className="p-4 bg-ps-yellow/10 rounded border-l-4 border-ps-yellow">
                                    <p className="text-xs font-bold text-yellow-800 uppercase italic italic leading-none">Inversión Matrícula:</p>
                                    <p className="text-lg font-black italic italic leading-none">${inscripData.precio} (Validez hasta {inscripData.vencimiento})</p>
                                </div>
                                <Button
                                    to={getWhatsAppLink(inscripData.phone, inscriptionMessage)}
                                    variant="primary"
                                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-none"
                                >
                                    Pedir info de pago por WhatsApp <MessageCircle size={18} className="ml-2" />
                                </Button>
                            </div>

                            <div className="flex justify-between pt-4">
                                <Button onClick={() => setStep(1)} variant="ghost">Volver</Button>
                                <Button onClick={() => setStep(3)} variant="secondary">Ya envié el mensaje <ArrowRight size={18} className="ml-2" /></Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-8 text-center animate-fade-in">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="p-6 bg-ps-green/20 rounded-full text-ps-green">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h3 className="text-2xl font-black italic italic leading-none underline decoration-ps-green decoration-4 decoration-skip-ink-none">¡Casi listo!</h3>
                                <p className="text-ps-gray max-w-sm mx-auto">
                                    Tu inscripción será confirmada una vez que el pago de la matrícula sea acreditado.
                                </p>
                            </div>

                            <div className="bg-ps-black p-6 rounded-xl text-ps-white space-y-4 shadow-2xl">
                                <div className="flex items-start space-x-3 text-left">
                                    <AlertCircle size={20} className="text-ps-yellow shrink-0 mt-1" />
                                    <p className="text-xs leading-relaxed text-gray-300">
                                        Recordá enviar el comprobante de pago por WhatsApp una vez realizado. Sin el comprobante, no podemos procesar tu inscripción oficial.
                                    </p>
                                </div>
                                <Button to="/" variant="outline" className="w-full border-gray-600 text-white hover:bg-white hover:text-ps-black">
                                    Volver al inicio
                                </Button>
                            </div>

                            <button onClick={() => setStep(2)} className="text-xs text-ps-gray underline hover:text-ps-green">Representar paso anterior</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Inscripciones;
