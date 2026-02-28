import { useState, useEffect } from 'react';
import { client } from '../utils/sanityClient';
import BlogCard from '../components/BlogCard';
import Badge from '../components/Badge';
import { useSEO } from '../utils/seo';

const Blog = () => {
    useSEO("Blog de Salud Mental", "Artículos sobre psicología social, salud mental comunitaria y el rol del operador preventivo en la Patagonia.");

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const query = `*[_type == "post"] | order(fecha desc) {
            titulo,
            slug,
            extracto,
            fecha,
            autor,
            contenido,
            "imagen": imagenMain.asset->url
        }`;

        client.fetch(query)
            .then((data) => {
                const postsWithReadingTime = data.map(post => {
                    // Calcular tiempo de lectura
                    let wordCount = 0;
                    if (post.contenido) {
                        post.contenido.forEach(block => {
                            if (block._type === 'block' && block.children) {
                                block.children.forEach(child => {
                                    if (child.text) {
                                        wordCount += child.text.split(/\s+/).length;
                                    }
                                });
                            }
                        });
                    }
                    const minutes = Math.ceil(wordCount / 200) || 1;
                    return { ...post, readingTime: `${minutes} min` };
                });
                setPosts(postsWithReadingTime);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="py-20 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <Badge variant="green">Herramientas Psicosociales</Badge>
                    <h1 className="text-4xl font-black italic italic leading-none underline decoration-ps-green decoration-4 decoration-skip-ink-none">Espacio de Pensamiento</h1>
                    <p className="text-ps-gray">
                        Compartimos reflexiones y contenidos para profundizar en la formación de agentes de cambio.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ps-green"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <BlogCard key={post.slug.current} post={{ ...post, slug: post.slug.current }} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
