import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'category',
            type: 'select',
            options: [
                { label: 'Priemysel', value: 'priemysel' },
                { label: 'Tienenie', value: 'tienenie' },
                { label: 'Branding', value: 'branding' },
                { label: 'Materiály', value: 'materialy' },
            ],
            required: true,
        },
        {
            name: 'description',
            type: 'richText',
        },
        {
            name: 'price',
            type: 'number',
            admin: {
                description: 'Base price or starting price',
            },
        },
        {
            name: 'images',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
        {
            name: 'specifications',
            type: 'array',
            fields: [
                {
                    name: 'key',
                    type: 'text',
                },
                {
                    name: 'value',
                    type: 'text',
                },
            ],
        },
        {
            name: 'features',
            type: 'array',
            fields: [
                {
                    name: 'feature',
                    type: 'text',
                },
            ],
        },
    ],
}
