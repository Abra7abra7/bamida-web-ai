import { Block } from 'payload'

export const StatsBlock: Block = {
    slug: 'stats',
    fields: [
        {
            name: 'items',
            type: 'array',
            required: true,
            minRows: 1,
            maxRows: 4,
            fields: [
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                    label: 'Value (e.g. 10+)',
                },
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'description',
                    type: 'text',
                },
            ],
        },
        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
        },
    ],
}
