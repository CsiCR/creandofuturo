export default {
    name: 'ajustes',
    title: 'Configuración Global',
    type: 'document',
    // Definimos que solo pueda haber UN documento de este tipo (Singleton)
    // Aunque para habilitar esto 100% se suele configurar en el deskStructure
    fields: [
        {
            name: 'tituloSitio',
            title: 'Título del Sitio',
            type: 'string',
            initialValue: 'CPSA - Sede Pico Truncado'
        },
        {
            name: 'telefono',
            title: 'Teléfono de WhatsApp',
            type: 'string',
            description: 'Sin espacios ni guiones, ej: 5492974277686',
            validation: Rule => Rule.required()
        },
        {
            name: 'email',
            title: 'Email de Contacto',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'direccion',
            title: 'Dirección Sede',
            type: 'text',
            rows: 2
        },
        {
            name: 'horarios',
            title: 'Horarios de Atención',
            type: 'string'
        },
        {
            name: 'googleMapsUrl',
            title: 'URL de Google Maps (Iframe)',
            type: 'url',
            description: 'El link del botón "Compartir > Insertar mapa" de Google Maps'
        },
        {
            name: 'inscripcionesEtiqueta',
            title: 'Etiqueta de Inscripciones',
            type: 'string',
            description: 'Ej: 2026, Agosto, Cohorte Marzo',
            initialValue: '2026'
        },
        {
            name: 'inscripcionesPrecio',
            title: 'Precio de Matrícula',
            type: 'string',
            description: 'Ej: 30.000',
            initialValue: '30.000'
        },
        {
            name: 'inscripcionesVencimiento',
            title: 'Vencimiento del Precio',
            type: 'string',
            description: 'Ej: 28/02/2026',
            initialValue: '28/02/2026'
        },
        {
            name: 'instagramUrl',
            title: 'URL de Instagram',
            type: 'url',
            description: 'Link completo a tu perfil de Instagram'
        },
        {
            name: 'facebookUrl',
            title: 'URL de Facebook',
            type: 'url',
            description: 'Link completo a tu página de Facebook'
        },
        {
            name: 'carruselHero',
            title: 'Carrusel del Hero (Inicio)',
            type: 'array',
            description: 'Imágenes informativas para el carrusel de la página de inicio (reemplaza el recuadro estático)',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Texto alternativo (Para SEO y Accesibilidad)',
                            validation: Rule => Rule.required()
                        },
                        {
                            name: 'link',
                            type: 'string',
                            title: 'Enlace (opcional)',
                            description: 'Ruta relativa (ej: /oferta-academica) o link completo externo (ej: https://...)'
                        },
                        {
                            name: 'orden',
                            type: 'number',
                            title: 'Número de orden (opcional)',
                            description: 'Permite forzar un orden numérico. Si se deja vacío, se usa el orden en que se arrastran los elementos.'
                        },
                        {
                            name: 'duracion',
                            type: 'number',
                            title: 'Duración en pantalla (segundos)',
                            description: 'Tiempo que dura la imagen visible en segundos. Por defecto es 5 segundos.',
                            initialValue: 5,
                            validation: Rule => Rule.min(1)
                        },
                        {
                            name: 'fechaInicio',
                            type: 'datetime',
                            title: 'Vigencia: Mostrar desde',
                            description: 'Fecha y hora a partir de la cual se mostrará esta imagen. Si está vacía, se muestra inmediatamente.',
                        },
                        {
                            name: 'fechaFin',
                            type: 'datetime',
                            title: 'Vigencia: Mostrar hasta',
                            description: 'Fecha y hora límite para mostrar esta imagen. Si está vacía, no tiene vencimiento.',
                        }
                    ]
                }
            ]
        }
    ]
}
