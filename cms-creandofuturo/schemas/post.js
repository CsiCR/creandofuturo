export default {
    name: 'post',
    title: 'Blog / Noticias',
    type: 'document',
    fields: [
        {
            name: 'titulo',
            title: 'Título de la Noticia',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'titulo',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'extracto',
            title: 'Resumen / Extracto',
            type: 'text',
            rows: 3
        },
        {
            name: 'contenido',
            title: 'Contenido Completo',
            type: 'array',
            of: [{ type: 'block' }]
        },
        {
            name: 'imagenMain',
            title: 'Imagen Principal',
            type: 'image',
            options: { hotspot: true }
        },
        {
            name: 'fecha',
            title: 'Fecha de Publicación',
            type: 'date',
            initialValue: () => new Date().toISOString().split('T')[0]
        },
        {
            name: 'autor',
            title: 'Autor',
            type: 'string'
        }
    ]
}
