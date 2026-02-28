import Badge from '../components/Badge';
import { useSEO } from '../utils/seo';

const QuienesSomos = () => {
    useSEO("Quiénes Somos", "Conocé la historia de CPSA Sede Pico Truncado y nuestro compromiso con la comunidad.");

    return (
        <div className="py-20 animate-fade-in">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                {/* Header */}
                <div className="text-center space-y-4">
                    <Badge variant="green">Nuestra Identidad</Badge>
                    <h1 className="text-4xl md:text-5xl font-black italic italic leading-none">Formamos agentes de cambio en la Patagonia</h1>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-ps-gray leading-relaxed">
                        <p className="text-lg font-semibold text-ps-black">
                            CPSA (Centro Psicosocial Argentino) Sede Pico Truncado nace de la necesidad de brindar herramientas profesionales de intervención social en Santa Cruz.
                        </p>
                        <p>
                            Nuestra misión es capacitar a hombres y mujeres comprometidos con su comunidad, brindándoles un marco teórico sólido basado en la Psicología Social de Enrique Pichon Rivière.
                        </p>
                        <p>
                            Entendemos que la salud mental no es solo un proceso individual, sino una construcción colectiva. Por eso, nuestro enfoque es eminentemente comunitario, humano e interdisciplinario.
                        </p>
                    </div>
                    <div className="bg-ps-green/10 p-8 rounded-3xl border-2 border-ps-green/20">
                        <h3 className="text-2xl font-black mb-4 italic italic leading-none text-ps-black underline decoration-ps-green">Nuestro Enfoque</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <span className="w-1.5 h-1.5 bg-ps-green rounded-full mt-2 shrink-0"></span>
                                <span>Intervención en grupos y organizaciones.</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <span className="w-1.5 h-1.5 bg-ps-green rounded-full mt-2 shrink-0"></span>
                                <span>Salud mental desde la prevención primaria.</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <span className="w-1.5 h-1.5 bg-ps-green rounded-full mt-2 shrink-0"></span>
                                <span>Abordaje de problemáticas sociales actuales.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Valores */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12">
                    <div className="text-center p-6 space-y-2">
                        <div className="text-4xl mb-4">🤝</div>
                        <h4 className="font-black text-xl italic italic leading-none">Compromiso Social</h4>
                        <p className="text-sm text-ps-gray">Involucramos activamente a nuestros alumnos en la realidad local.</p>
                    </div>
                    <div className="text-center p-6 space-y-2">
                        <div className="text-4xl mb-4">🔥</div>
                        <h4 className="font-black text-xl italic italic leading-none">Pasión por Aprender</h4>
                        <p className="text-sm text-ps-gray">Promovemos un aprendizaje dinámico y grupal.</p>
                    </div>
                    <div className="text-center p-6 space-y-2">
                        <div className="text-4xl mb-4">🏔️</div>
                        <h4 className="font-black text-xl italic italic leading-none">Arraigo Patagónico</h4>
                        <p className="text-sm text-ps-gray">Entendemos los desafíos únicos de nuestra región.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuienesSomos;
