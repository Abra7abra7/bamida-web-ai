import { Block } from 'payload'

export const TestimonialsBlock: Block = {
    slug: 'testimonials',
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'reviews',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'content',
                    type: 'textarea',
                    required: true,
                },
                {
                    name: 'author',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'role',
                    type: 'text',
                },
                {
                    name: 'rating',
                    type: 'number',
                    min: 1,
                    max: 5,
                    defaultValue: 5,
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                },
            ],
        },
    ],
}
