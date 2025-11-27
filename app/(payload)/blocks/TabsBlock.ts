import { Block } from 'payload'

export const TabsBlock: Block = {
    slug: 'tabs',
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Section Title',
        },
        {
            name: 'items',
            type: 'array',
            label: 'Tabs',
            minRows: 1,
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Tab Label',
                },
                {
                    name: 'content',
                    type: 'richText',
                    required: true,
                    label: 'Tab Content',
                },
            ],
        },
    ],
}
