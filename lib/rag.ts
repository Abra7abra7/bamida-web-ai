import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getContext(query: string): Promise<string> {
    try {
        const payload = await getPayload({ config: configPromise })

        // 1. Fetch Knowledge Base entries
        // In a real production app with many entries, we would use vector search here.
        // For now, we fetch all active knowledge base entries (assuming < 100 items).
        const knowledgeBase = await payload.find({
            collection: 'knowledge-base',
            limit: 50,
        })

        const kbContext = knowledgeBase.docs
            .map((doc: any) => `[${doc.title}]: ${doc.content}`)
            .join('\n\n')

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
