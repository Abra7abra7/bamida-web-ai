import type { CollectionConfig } from 'payload'

export const KnowledgeBase: CollectionConfig = {
    slug: 'knowledge-base',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'content'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Názov (napr. Otváracie hodiny)',
        },
        {
            name: 'content',
            type: 'textarea',
            required: true,
            label: 'Obsah vedomosti',
            admin: {
                description: 'Tento text bude použitý AI agentom na odpovedanie.',
            },
        },
        {
            name: 'tags',
            type: 'text',
            label: 'Kľúčové slová (nepovinné)',
        },
    ],
}
