import { Link } from 'react-router-dom';
import { Clock, Calendar, ChevronRight } from 'lucide-react';
import Badge from './Badge';

const BlogCard = ({ post }) => {
    return (
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-all duration-300">
            <div className="h-48 overflow-hidden relative group bg-gray-50 flex items-center justify-center">
                {post.imagen ? (
                    <img
                        src={post.imagen}
                        alt={post.titulo}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-ps-gray/10 flex items-center justify-center p-8 text-ps-green/20">
                        <div className="w-16 h-1 bg-ps-green/20 rounded-full"></div>
                    </div>
                )}
                <div className="absolute inset-0 bg-ps-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <div className="p-6 flex-grow space-y-4">
                <div className="flex items-center space-x-2 text-[10px] font-bold text-ps-gray uppercase tracking-widest">
                    <Calendar size={12} className="text-ps-green" />
                    <span>{post.fecha}</span>
                </div>
                <h3 className="text-xl font-black italic italic leading-none text-ps-black group-hover:text-ps-green transition-colors">
                    {post.titulo}
                </h3>
                <p className="text-sm text-ps-gray line-clamp-2 leading-relaxed italic italic leading-none">{post.extracto}</p>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 mt-auto flex justify-between items-center">
                <div className="flex items-center space-x-1 text-xs text-ps-gray font-medium">
                    <Clock size={12} />
                    <span>{post.readingTime} de lectura</span>
                </div>
                <Link to={`/blog/${post.slug}`} className="text-ps-green font-bold text-sm flex items-center hover:translate-x-1 transition-transform">
                    Leer más <ChevronRight size={16} />
                </Link>
            </div>
        </article>
    );
};

export default BlogCard;
