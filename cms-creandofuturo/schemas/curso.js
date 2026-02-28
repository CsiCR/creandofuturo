export default {
    name: 'curso',
    title: 'Cursos y Ofertas Académicas',
    type: 'document',
    fields: [
        {
            name: 'titulo',
            title: 'Título del Curso',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'descripcion',
            title: 'Descripción',
            type: 'text',
            validation: Rule => Rule.required()
        },
        {
            name: 'duracion',
            title: 'Duración',
            type: 'string'
        },
        {
            name: 'modalidad',
            title: 'Modalidad',
            type: 'string',
            options: {
                list: [
                    { title: 'Presencial', value: 'Presencial' },
                    { title: 'Virtual', value: 'Virtual' },
                    { title: 'Híbrida', value: 'Híbrida' }
                ]
            }
        },
        {
            name: 'estado',
            title: 'Estado de Inscripción',
            type: 'string',
            options: {
                list: [
                    { title: 'Inscripciones Abiertas', value: 'abierta' },
                    { title: 'Cerrado', value: 'cerrado' }
                ]
            }
        },
        {
            name: 'destacado',
            title: '¿Es Destacado?',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'certificacion',
            title: 'Certificación que otorga',
            type: 'string'
        }
    ]
}
