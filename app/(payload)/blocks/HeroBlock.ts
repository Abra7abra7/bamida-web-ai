import { Block } from 'payload'

export const HeroBlock: Block = {
    slug: 'hero',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'subtitle',
            type: 'textarea',
        },
        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'type',
            type: 'select',
            defaultValue: 'default',
            options: [
                { label: 'Default', value: 'default' },
                { label: 'Large', value: 'large' },
                { label: 'Minimal', value: 'minimal' },
            ],
        },
        {
            name: 'showSearch',
            type: 'checkbox',
            label: 'Show AI Search',
            defaultValue: false,
        },
    ],
}
