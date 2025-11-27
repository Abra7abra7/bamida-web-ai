import { Block } from 'payload'

export const GalleryMasonryBlock: Block = {
    slug: 'galleryMasonry',
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
            name: 'images',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'category',
                    type: 'select',
                    options: [
                        { label: 'Exterior', value: 'exterior' },
                        { label: 'Interior', value: 'interior' },
                        { label: 'Detail', value: 'detail' },
                        { label: 'Project', value: 'project' },
                    ],
                },
                {
                    name: 'caption',
                    type: 'text',
                },
            ],
        },
    ],
}
