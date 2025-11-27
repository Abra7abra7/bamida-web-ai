/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getContext(query: string): Promise<string> {
    try {
        const payload = await getPayload({ config: configPromise })

        // 1. Fetch Knowledge Base entries
        // In a real production app with many entries, we would use vector search here.
        // For now, we fetch all active knowledge base entries (assuming < 100 items).
        const docs = await payload.find({
            collection: 'knowledge-base',
            limit: 100,
        })

        // Create embeddings for each doc
        const embeddings = await Promise.all(
            docs.docs.map(async (doc: any) => {
                // In a real app, you would use an embedding model here
                // For this example, we'll just use the content directly
                return `[${doc.title}]: ${doc.content}`
            }),
        )

        const kbContext = embeddings.join('\n\n')

        // 2. Fetch Products (basic search by name only)
        const products = await payload.find({
            collection: 'products',
            where: {
                name: { like: query },
            },
            limit: 3,
        })

        const productContext = products.docs
            .map((doc: any) => `Product: ${doc.name}\nPrice: ${doc.price} EUR\nCategory: ${doc.category}`)
            .join('\n\n')

        return `
Knowledge Base:
${kbContext}

Relevant Products:
${productContext}
        `.trim()
    } catch (error) {
        console.error('Error fetching context:', error)
        return ''
    }
}
