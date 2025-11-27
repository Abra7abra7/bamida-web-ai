import { Block } from 'payload'

export const CardGridBlock: Block = {
    slug: 'cardGrid',
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Section Title',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
        },
        {
            name: 'cards',
            type: 'array',
            label: 'Cards',
            minRows: 1,
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'description',
                    type: 'textarea',
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Image',
                },
                {
                    name: 'link',
                    type: 'text',
                    label: 'Link URL',
                },
                {
                    name: 'linkText',
                    type: 'text',
                    label: 'Link Text',
                },
            ],
        },
    ],
}
