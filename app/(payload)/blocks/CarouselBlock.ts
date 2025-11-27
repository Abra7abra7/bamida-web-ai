import { Block } from 'payload'

export const CarouselBlock: Block = {
    slug: 'carousel',
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Section Title',
        },
        {
            name: 'items',
            type: 'array',
            label: 'Carousel Items',
            minRows: 1,
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    label: 'Image',
                },
                {
                    name: 'text',
                    type: 'textarea',
                    label: 'Caption / Text',
                },
            ],
        },
    ],
}
