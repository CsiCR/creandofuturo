import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { urlFor } from '../utils/sanityClient';

const HeroCarousel = ({ slides }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef(null);

    // 1. Filtrar slides vigentes según fecha y hora actual
    const now = new Date();
    const activeSlides = (slides || [])
        .filter(slide => {
            const start = slide.fechaInicio ? new Date(slide.fechaInicio) : null;
            const end = slide.fechaFin ? new Date(slide.fechaFin) : null;
            const isStarted = !start || now >= start;
            const isNotExpired = !end || now <= end;
            return isStarted && isNotExpired;
        })
        // Ordenar por el campo 'orden' (si existe), de lo contrario mantiene el orden de Sanity
        .sort((a, b) => {
            const orderA = typeof a.orden === 'number' ? a.orden : 9999;
            const orderB = typeof b.orden === 'number' ? b.orden : 9999;
            return orderA - orderB;
        });

    const totalSlides = activeSlides.length;

    // 2. Manejar la reproducción automática con duración personalizada por slide
    useEffect(() => {
        if (totalSlides <= 1 || isPaused) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            return;
        }

        const currentSlide = activeSlides[activeIndex];
        const durationSecs = currentSlide?.duracion || 5; // Por defecto 5s
        const durationMs = durationSecs * 1000;

        timeoutRef.current = setTimeout(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }, durationMs);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [activeIndex, totalSlides, isPaused, activeSlides]);

    // Si no hay slides válidos, no renderizar nada (el componente padre mostrará el fallback)
    if (totalSlides === 0) return null;

    const handlePrev = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const handleNext = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveIndex((prev) => (prev + 1) % totalSlides);
    };

    const handleDotClick = (index, e) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveIndex(index);
    };

    // Helper para renderizar enlace si corresponde
    const renderSlideContent = (slide) => {
        const imageUrl = urlFor(slide).width(600).height(600).fit('crop').url();
        
        const imgElement = (
            <img
                src={imageUrl}
                alt={slide.alt || 'Información de la institución'}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="eager"
            />
        );

        if (slide.link) {
            const isExternal = slide.link.startsWith('http://') || slide.link.startsWith('https://');
            if (isExternal) {
                return (
                    <a href={slide.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        {imgElement}
                    </a>
                );
            } else {
                return (
                    <Link to={slide.link} className="block w-full h-full">
                        {imgElement}
                    </Link>
                );
            }
        }

        return imgElement;
    };

    return (
        <div 
            className="relative w-80 h-80 group cursor-pointer"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Borde verde rotado por detrás */}
            <div className="w-full h-full border-4 border-ps-green rounded-2xl rotate-3 absolute -top-4 -left-4 transition-transform duration-300 group-hover:rotate-1"></div>
            
            {/* Contenedor del carrusel principal */}
            <div className="w-full h-full bg-ps-gray rounded-2xl relative z-10 overflow-hidden shadow-2xl flex items-center justify-center">
                {activeSlides.map((slide, index) => (
                    <div
                        key={slide._key || index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        {renderSlideContent(slide)}
                    </div>
                ))}

                {/* Flechas de Navegación (Visibles en hover) */}
                {totalSlides > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-ps-black/50 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 hover:bg-ps-green hover:text-ps-black transition-all duration-300"
                            aria-label="Diapositiva anterior"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-ps-black/50 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 hover:bg-ps-green hover:text-ps-black transition-all duration-300"
                            aria-label="Siguiente diapositiva"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}

                {/* Indicadores de diapositivas (Dots) */}
                {totalSlides > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2 bg-ps-black/40 backdrop-blur-xs px-3 py-1.5 rounded-full">
                        {activeSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={(e) => handleDotClick(index, e)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                    index === activeIndex
                                        ? 'bg-ps-green w-6'
                                        : 'bg-white/50 hover:bg-white'
                                }`}
                                aria-label={`Ir a diapositiva ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroCarousel;
