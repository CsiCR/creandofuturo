export default {
    name: 'anuncio',
    title: 'Banner de Novedades',
    type: 'document',
    fields: [
        {
            name: 'titulo',
            title: 'Nombre interno (Solo referencia)',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'mensaje',
            title: 'Mensaje del Banner',
            type: 'string',
            description: 'Ej: ¡Inscripciones abiertas - Ciclo 2026!',
            validation: Rule => Rule.required()
        },
        {
            name: 'link',
            title: 'Enlace (opcional)',
            type: 'string',
            description: 'Dirección a la que lleva el banner al hacer click (ej: /inscripciones)'
        },
        {
            name: 'activo',
            title: '¿Está activado?',
            type: 'boolean',
            initialValue: true
        },
        {
            name: 'fechaInicio',
            title: 'Mostrar desde',
            type: 'datetime',
            initialValue: () => new Date().toISOString()
        },
        {
            name: 'fechaFin',
            title: 'Mostrar hasta',
            type: 'datetime'
        }
    ],
    preview: {
        select: {
            title: 'mensaje',
            subtitle: 'activo'
        },
        prepare({ title, subtitle }) {
            return {
                title: title,
                subtitle: subtitle ? '🟢 Activo' : '🔴 Desactivado'
            }
        }
    }
}
