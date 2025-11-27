import { Block } from 'payload'

export const HeroModernBlock: Block = {
    slug: 'heroModern',
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
            name: 'type',
            type: 'select',
            options: [
                { label: 'Video Background', value: 'video' },
                { label: 'Split Screen', value: 'split' },
                { label: 'Centered', value: 'centered' },
            ],
            defaultValue: 'centered',
        },
        {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'videoUrl',
            type: 'text',
            label: 'Video URL (for Video Background type)',
            admin: {
                condition: (_, siblingData) => siblingData.type === 'video',
            },
        },
        {
            name: 'cta',
            type: 'group',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                },
                {
                    name: 'url',
                    type: 'text',
                },
            ],
        },
    ],
}
