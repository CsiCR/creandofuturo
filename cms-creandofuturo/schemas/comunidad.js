export default {
    name: 'comunidad',
    title: 'La Comunidad',
    type: 'document',
    fields: [
        {
            name: 'titulo',
            title: 'Título (Opcional)',
            type: 'string',
            description: 'Un título corto para identificar la jornada en este panel'
        },
        {
            name: 'fecha',
            title: 'Fecha de la Actividad',
            type: 'date',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'descripcion',
            title: 'Descripción (Pie de foto)',
            type: 'text',
            rows: 3,
            description: 'Texto breve que acompañará a la publicación estilo Instagram.',
            validation: (Rule) => Rule.required().max(300),
        },
        {
            name: 'archivos',
            title: 'Imágenes o Videos de la Jornada',
            type: 'array',
            of: [
                {
                    name: 'imagenJornada',
                    type: 'image',
                    title: 'Imagen',
                    options: {
                        hotspot: true, // Permite recortar la imagen en el panel
                    },
                },
                {
                    name: 'videoJornada',
                    type: 'file',
                    title: 'Video (MP4)',
                    options: {
                        accept: 'video/mp4,video/x-m4v,video/*',
                    },
                }
            ],
            description: 'Podés subir varias fotos y videos. Se mostrarán como un carrusel.',
            validation: (Rule) => Rule.required().min(1),
        }
    ],
    preview: {
        select: {
            title: 'descripcion',
            subtitle: 'fecha',
            media: 'archivos.0', // Muestra el primer archivo como miniatura
        },
        prepare(selection) {
            const { title, subtitle, media } = selection;
            return {
                title: title ? (title.length > 50 ? title.substring(0, 50) + '...' : title) : 'Sin descripción',
                subtitle: subtitle,
                media: media,
            }
        }
    }
}
