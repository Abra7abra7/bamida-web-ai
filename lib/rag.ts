import { Pinecone } from '@pinecone-database/pinecone'
import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'

const indexName = process.env.PINECONE_INDEX || 'bamida-index'

export async function getContext(query: string) {
    const apiKey = process.env.PINECONE_API_KEY
    if (!apiKey) {
        console.warn('PINECONE_API_KEY is not set. Returning empty context.')
        return ''
    }

    try {
        const pinecone = new Pinecone({
            apiKey,
        })

        const { embedding } = await embed({
            model: openai.embedding('text-embedding-3-small'),
            value: query,
        })

        const index = pinecone.index(indexName)

        const queryResponse = await index.query({
            vector: embedding,
            topK: 3,
            includeMetadata: true,
        })

        const context = queryResponse.matches
            .map((match) => (match.metadata as any)?.text)
            .filter(Boolean)
            .join('\n\n')

        return context
    } catch (error) {
        console.error('Error querying Pinecone:', error)
        return ''
    }
}
