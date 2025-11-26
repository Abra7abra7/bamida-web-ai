import { Block } from 'payload'

export const GalleryBlock: Block = {
    slug: 'gallery',
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Gallery Title',
        },
        {
            name: 'images',
            type: 'upload',
            relationTo: 'media',
            required: true,
            hasMany: true,
            label: 'Images',
        },
        {
            name: 'columns',
            type: 'select',
            defaultValue: '3',
            options: [
                { label: '2 Columns', value: '2' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' },
            ],
        },
    ],
}
