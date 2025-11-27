import { Block } from 'payload'

export const FAQBlock: Block = {
    slug: 'faq',
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'items',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'question',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'answer',
                    type: 'textarea',
                    required: true,
                },
            ],
        },
    ],
}
