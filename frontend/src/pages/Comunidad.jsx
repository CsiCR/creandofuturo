import { useState, useEffect } from 'react';
import { client } from '../utils/sanityClient';
import ComunidadPost from '../components/ComunidadPost';
import Badge from '../components/Badge';
import { useSEO } from '../utils/seo';

const Comunidad = () => {
    useSEO("La Comunidad", "Conocé el trabajo de campo, dinámicas grupales y jornadas de nuestra institución.");

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const query = `*[_type == "comunidad"] | order(fecha desc) {
            _id,
            titulo,
            fecha,
            descripcion,
            archivos[] {
                _type,
                "url": asset->url,
                "mimeType": asset->mimeType
            }
        }`;

        client.fetch(query)
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="py-20 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <Badge variant="yellow">Comunidad</Badge>
                    <h1 className="text-4xl font-black italic italic leading-none underline decoration-ps-green decoration-4 decoration-skip-ink-none text-ps-black">Nuestras Jornadas</h1>
                    <p className="text-ps-gray">
                        El núcleo de la Psicología Social es el grupo. Acá compartimos nuestro trabajo de campo y actividades grupales.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ps-green"></div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <ComunidadPost key={post._id} post={post} />
                            ))
                        ) : (
                            <div className="text-center py-20 text-ps-gray">
                                <p>Aún no hay publicaciones en la comunidad.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comunidad;
