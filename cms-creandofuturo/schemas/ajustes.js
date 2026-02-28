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
        }
    ]
}
