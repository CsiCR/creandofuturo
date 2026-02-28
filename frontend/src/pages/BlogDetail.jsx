import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../utils/sanityClient';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import Badge from '../components/Badge';
import { useSEO } from '../utils/seo';

const BlogDetail = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useSEO(post?.titulo, post?.extracto);

    useEffect(() => {
        const query = `*[_type == "post" && slug.current == $slug][0] {
            titulo,
            extracto,
            contenido,
            fecha,
            autor,
            imagenMain
        }`;

        client.fetch(query, { slug })
            .then((data) => {
                setPost(data);
                setLoading(false);
            })
            .catch(console.error);
    }, [slug]);

    if (loading) {
        return (
            <div className="py-40 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ps-green"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="py-40 text-center space-y-4">
                <h2 className="text-2xl font-bold">Artículo no encontrado</h2>
                <Link to="/blog" className="text-ps-green font-bold underline">Volver al blog</Link>
            </div>
        );
    }

    const handleShare = async () => {
        const shareData = {
            title: post.titulo,
            text: post.extracto,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('¡Enlace copiado al portapapeles!');
            }
        } catch (err) {
            console.error('Error al compartir:', err);
        }
    };

    return (
        <article className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/blog" className="inline-flex items-center text-ps-gray hover:text-ps-green mb-12 transition-colors font-bold text-sm">
                    <ArrowLeft size={16} className="mr-2" /> Volver al listado
                </Link>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <Badge variant="green">Lectura</Badge>
                        <h1 className="text-4xl md:text-5xl font-black italic italic leading-none text-ps-black">
                            {post.titulo}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-ps-gray text-xs font-bold uppercase tracking-wider pt-2 border-b border-gray-100 pb-6">
                            <div className="flex items-center space-x-2">
                                <Calendar size={14} className="text-ps-green" />
                                <span>{post.fecha}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <User size={14} className="text-ps-green" />
                                <span>{post.autor}</span>
                            </div>
                        </div>
                    </div>

                    {post.imagenMain && (
                        <div className="rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={urlFor(post.imagenMain).url()}
                                alt={post.titulo}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}

                    <div className="prose prose-lg max-w-none text-ps-gray leading-relaxed space-y-6">
                        <PortableText value={post.contenido} />
                    </div>

                    <div className="pt-12 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-ps-green/10 rounded-full flex items-center justify-center text-ps-green">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-black italic italic leading-none">{post.autor}</p>
                                <p className="text-[10px] text-ps-gray uppercase">Autor Principal</p>
                            </div>
                        </div>
                        <button
                            onClick={handleShare}
                            className="flex items-center space-x-2 text-ps-gray hover:text-ps-green font-bold text-sm transition-colors"
                        >
                            <Share2 size={16} />
                            <span>Compartir artículo</span>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogDetail;
