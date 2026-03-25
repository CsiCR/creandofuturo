import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';

const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

const ComunidadPost = ({ post }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const archivos = post.archivos || [];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % archivos.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? archivos.length - 1 : prev - 1));
    };

    const handleShare = async () => {
        const shareData = {
            title: post.titulo ? `Creando Futuro - ${post.titulo}` : 'Novedad en Creando Futuro',
            text: post.descripcion,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('¡Enlace de la sección copiado al portapapeles!');
            }
        } catch (err) {
            console.error('Error al compartir:', err);
        }
    };

    return (
        <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mx-auto w-full max-w-2xl">
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-ps-green/10 flex items-center justify-center text-ps-green font-bold">
                        CF
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-ps-black">Creando Futuro</h3>
                        {post.titulo && <span className="text-[10px] text-ps-gray uppercase tracking-wider">{post.titulo}</span>}
                    </div>
                </div>
            </div>

            {/* Media Carousel */}
            {archivos.length > 0 && (
                <div className="relative bg-gray-100 aspect-square md:aspect-[4/5] flex items-center justify-center overflow-hidden">
                    {archivos.map((archivo, index) => {
                        const isVideo = archivo._type === 'videoJornada' || archivo._type === 'file' || (archivo.mimeType && archivo.mimeType.startsWith('video/'));
                        
                        return (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center bg-black ${
                                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                            >
                                {isVideo ? (
                                    <video 
                                        src={archivo.url} 
                                        controls 
                                        preload="metadata"
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <img
                                        src={archivo.url}
                                        alt={`Jornada ${index + 1}`}
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </div>
                        );
                    })}

                    {/* Navigation Arrows */}
                    {archivos.length > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
                            >
                                <ChevronRight size={20} />
                            </button>

                            {/* Indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5">
                                {archivos.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                            index === currentSlide ? 'bg-white' : 'bg-white/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Body */}
            <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs font-bold text-ps-gray uppercase tracking-widest">
                        <Calendar size={12} className="text-ps-green" />
                        <span>{formatDate(post.fecha)}</span>
                    </div>
                    <button
                        onClick={handleShare}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 text-ps-gray hover:text-ps-green transition-colors cursor-pointer"
                        title="Compartir"
                    >
                        <Share2 size={20} />
                    </button>
                </div>
                
                <p className="text-sm text-ps-black leading-relaxed whitespace-pre-wrap">
                    {post.descripcion}
                </p>
            </div>
        </article>
    );
};

export default ComunidadPost;
