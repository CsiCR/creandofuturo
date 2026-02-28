import Button from './Button';
import Badge from './Badge';
import { clsx } from 'clsx';

const CourseCard = ({ curso }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
            <div className="p-6 flex-grow space-y-4">
                <div className="flex justify-between items-start">
                    <Badge variant={curso.destacado ? "yellow" : "green"}>{curso.modalidad}</Badge>
                    <span className="text-xs font-bold text-ps-gray uppercase tracking-tighter">{curso.duracion}</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-ps-black leading-snug">{curso.titulo}</h3>
                    <p className="text-sm text-ps-gray mt-2 line-clamp-3">{curso.descripcion}</p>
                </div>
                <div className="pt-2 text-xs font-medium text-ps-gray uppercase">
                    Certificación: <span className="text-ps-black font-bold">{curso.certificacion}</span>
                </div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-100 mt-auto">
                <Button
                    to={curso.modalidad === 'Presencial' ? `/inscripciones?curso=${curso.id}` : '#'}
                    variant={curso.destacado ? "primary" : "outline"}
                    className={clsx(
                        "w-full text-sm py-2",
                        curso.modalidad !== 'Presencial' && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={(e) => curso.modalidad !== 'Presencial' && e.preventDefault()}
                >
                    {curso.modalidad === 'Presencial' ? 'Me interesa' : 'Próximamente'}
                </Button>
            </div>
        </div>
    );
};

export default CourseCard;
