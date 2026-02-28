import { useState, useEffect } from 'react';
import { client } from '../utils/sanityClient';
import { X, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnnouncementBanner = () => {
    const [banner, setBanner] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const query = `*[_type == "anuncio" && activo == true][0] {
            mensaje,
            link,
            fechaInicio,
            fechaFin
        }`;

        client.fetch(query)
            .then((data) => {
                if (data) {
                    const now = new Date();
                    const start = new Date(data.fechaInicio);
                    const end = data.fechaFin ? new Date(data.fechaFin) : null;

                    // Lógica de programación horaria
                    if (now >= start && (!end || now <= end)) {
                        setBanner(data);
                    }
                }
            })
            .catch(console.error);
    }, []);

    if (!banner || !isVisible) return null;

    const BannerContent = () => (
        <div className="flex items-center w-full px-4 py-2 relative min-h-[40px]">
            {/* Icono fijo a la izquierda */}
            <div className="flex items-center gap-2 bg-ps-black z-20 pr-4">
                <Megaphone size={16} className="shrink-0 text-ps-green animate-pulse" />
            </div>

            {/* Contenedor de la Marquesina */}
            <div className="flex-1 overflow-hidden">
                <p className="text-xs md:text-sm font-bold animate-marquee hover:pause whitespace-nowrap">
                    {banner.mensaje}
                </p>
            </div>

            {/* Botón de cerrar fijo a la derecha */}
            <div className="bg-ps-black z-20 pl-4">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setIsVisible(false);
                    }}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors relative"
                    aria-label="Cerrar aviso"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-ps-black text-white w-full z-[60] relative overflow-hidden animate-slide-down shadow-md">
            {/* Efecto Shimmer de fondo */}
            <div className="absolute inset-0 shimmer-effect pointer-events-none" />
            {banner.link ? (
                <Link to={banner.link} className="block hover:bg-ps-black/80 transition-colors">
                    <BannerContent />
                </Link>
            ) : (
                <BannerContent />
            )}
        </div>
    );
};

export default AnnouncementBanner;
