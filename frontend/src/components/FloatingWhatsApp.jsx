import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink, CONTACT_PHONE, DEFAULT_MESSAGES } from '../utils/whatsapp';
import { client } from '../utils/sanityClient';

const FloatingWhatsApp = () => {
    const [phone, setPhone] = useState(CONTACT_PHONE);

    useEffect(() => {
        const query = '*[_type == "ajustes"][0] { telefono }';
        client.fetch(query)
            .then(data => {
                if (data?.telefono) setPhone(data.telefono);
            })
            .catch(console.error);
    }, []);

    const link = getWhatsAppLink(phone, DEFAULT_MESSAGES.CONSULTA_GENERAL);

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
            aria-label="Contactanos por WhatsApp"
        >
            <MessageCircle size={28} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold whitespace-nowrap">
                ¿Dudas? Escribinos
            </span>
        </a>
    );
};

export default FloatingWhatsApp;
