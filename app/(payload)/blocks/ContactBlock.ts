import { Block } from 'payload'

export const ContactBlock: Block = {
    slug: 'contact',
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Title',
        },
        {
            name: 'introText',
            type: 'textarea',
            label: 'Intro Text',
        },
        {
            name: 'subjects',
            type: 'array',
            label: 'Subject Options',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                },
            ],
            defaultValue: [
                { label: 'General Inquiry', value: 'general' },
                { label: 'Quote Request', value: 'quote' },
                { label: 'Support', value: 'support' },
            ],
        },
    ],
}
