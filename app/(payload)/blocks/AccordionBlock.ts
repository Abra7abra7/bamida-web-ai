import { Block } from 'payload'

export const AccordionBlock: Block = {
    slug: 'accordion',
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Section Title',
        },
        {
            name: 'items',
            type: 'array',
            label: 'Accordion Items',
            minRows: 1,
            fields: [
                {
                    name: 'trigger',
                    type: 'text',
                    required: true,
                    label: 'Question / Trigger',
                },
                {
                    name: 'content',
                    type: 'textarea',
                    required: true,
                    label: 'Answer / Content',
                },
            ],
        },
    ],
}
