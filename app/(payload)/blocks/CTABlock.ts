import { Block } from 'payload'

export const CTABlock: Block = {
    slug: 'cta',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title',
        },
        {
            name: 'text',
            type: 'textarea',
            label: 'Text',
        },
        {
            name: 'links',
            type: 'array',
            label: 'Buttons',
            maxRows: 2,
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'type',
                    type: 'select',
                    defaultValue: 'primary',
                    options: [
                        { label: 'Primary', value: 'primary' },
                        { label: 'Secondary', value: 'secondary' },
                        { label: 'Outline', value: 'outline' },
                    ],
                },
            ],
        },
        {
            name: 'style',
            type: 'select',
            defaultValue: 'default',
            options: [
                { label: 'Default (Simple)', value: 'default' },
                { label: 'Boxed (Card)', value: 'boxed' },
                { label: 'Full Width (Dark)', value: 'full' },
            ],
        },
    ],
}
