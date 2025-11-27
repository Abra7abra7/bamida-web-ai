import { Block } from 'payload'

export const TimelineBlock: Block = {
    slug: 'timeline',
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Section Title',
        },
        {
            name: 'items',
            type: 'array',
            label: 'Timeline Events',
            minRows: 1,
            fields: [
                {
                    name: 'year',
                    type: 'text',
                    required: true,
                    label: 'Year / Date',
                },
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    label: 'Event Title',
                },
                {
                    name: 'description',
                    type: 'textarea',
                    label: 'Description',
                },
            ],
        },
    ],
}
