import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { client } from '../utils/sanityClient';
import CourseCard from '../components/CourseCard';
import Badge from '../components/Badge';
import { useSEO } from '../utils/seo';
import { clsx } from 'clsx';

const OfertaAcademica = () => {
    useSEO("Oferta Académica", "Explorá nuestros cursos y carreras en Psicología Social y Salud Mental en Pico Truncado.");

    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('Todos');
    const modalidades = ['Todos', 'Presencial', 'Híbrida', 'Virtual'];

    useEffect(() => {
        const query = `*[_type == "curso"] {
            id,
            titulo,
            descripcion,
            duracion,
            modalidad,
            perfilEgresado,
            salidaLaboral,
            destacado,
            certificacion,
            estado
        }`;

        client.fetch(query)
            .then((data) => {
                setCursos(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    const filteredCursos = filter === 'Todos'
        ? cursos
        : cursos.filter(c => c.modalidad === filter);

    return (
        <div className="py-20 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-4">
                    <Badge variant="green">Formación Profesional</Badge>
                    <h1 className="text-4xl font-black italic italic leading-none">Nuestra Oferta Académica</h1>
                    <p className="text-ps-gray max-w-2xl mx-auto">
                        Programas diseñados para brindarte herramientas prácticas de intervención psicosocial.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2">
                    {modalidades.map((m) => (
                        <button
                            key={m}
                            onClick={() => setFilter(m)}
                            className={clsx(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 shadow-sm border",
                                filter === m
                                    ? "bg-ps-green border-ps-green text-ps-black scale-105"
                                    : "bg-white border-gray-200 text-ps-gray hover:border-ps-green"
                            )}
                        >
                            {m}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ps-green"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCursos.map((curso) => (
                            <CourseCard key={curso.id} curso={curso} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {filteredCursos.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-ps-gray italic italic leading-none">Próximamente más cursos en esta modalidad.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfertaAcademica;
