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
            type: 'richText',
            label: 'Intro Text',
        },
    ],
}
