import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

import { getContext } from '@/lib/rag'

export const maxDuration = 30

export async function POST(req: Request) {
    if (!process.env.OPENAI_API_KEY) {
        return new Response('OpenAI API Key is missing. Please add it to your .env file.', { status: 500 })
    }

    try {
        const { messages } = await req.json()
        const lastMessage = messages[messages.length - 1]

        const context = await getContext(lastMessage.content as string)

        const result = streamText({
            model: openai('gpt-4o'),
            system: `You are Bamida Expert, an AI assistant for Bamida.sk.
        You specialize in industrial textiles, shading systems (pergolas, awnings), and branding.
        
        Your tone is professional, helpful, and technically accurate.
        You communicate in Slovak language.
        
        Use the following context to answer the user's question if relevant:
        ${context}
        
        If you don't know the answer, politely ask the user to contact sales at info@bamida.sk.
        `,
            messages,
        })

        return result.toTextStreamResponse()
    } catch (error) {
        console.error('Chat API Error:', error)
        return new Response('An error occurred while processing your request.', { status: 500 })
    }
}
