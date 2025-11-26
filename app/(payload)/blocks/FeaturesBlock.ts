import { Block } from 'payload'

export const FeaturesBlock: Block = {
    slug: 'features',
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
            name: 'items',
            type: 'array',
            label: 'Features',
            minRows: 1,
            maxRows: 6,
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'text',
                    type: 'textarea',
                },
                {
                    name: 'icon',
                    type: 'select',
                    options: [
                        { label: 'Star', value: 'star' },
                        { label: 'Shield', value: 'shield' },
                        { label: 'Zap', value: 'zap' },
                        { label: 'Heart', value: 'heart' },
                        { label: 'Check', value: 'check' },
                        { label: 'Trophy', value: 'trophy' },
                    ],
                },
            ],
        },
    ],
}
