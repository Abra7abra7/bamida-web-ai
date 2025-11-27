'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getTranslatedSlugs(currentSlug: string, currentLocale: string) {
    try {
        const payload = await getPayload({ config })

        // 1. Find the current page to get its translationKey
        const currentPage = await payload.find({
            collection: 'pages',
            where: {
                and: [
                    { slug: { equals: currentSlug } },
                    { locale: { equals: currentLocale } }
                ]
            },
        })

        if (currentPage.docs.length === 0) {
            return null
        }

        const translationKey = currentPage.docs[0].translationKey

        if (!translationKey) {
            return null
        }

        // 2. Find all pages with the same translationKey
        const relatedPages = await payload.find({
            collection: 'pages',
            where: {
                translationKey: { equals: translationKey }
            },
            limit: 10, // Should be enough for 3 locales
        })

        // 3. Build the map
        const slugMap: Record<string, string> = {}
        relatedPages.docs.forEach((doc) => {
            if (doc.locale && doc.slug) {
                slugMap[doc.locale] = doc.slug
            }
        })

        return slugMap
    } catch (error) {
        console.error('Error fetching translated slugs:', error)
        return null
    }
}

import { z } from 'zod'

const contactFormSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    message: z.string().min(10),
})

export async function sendContactEmail(data: z.infer<typeof contactFormSchema>) {
    const result = contactFormSchema.safeParse(data)

    if (!result.success) {
        return { success: false, error: 'Invalid form data' }
    }

    try {
        const payload = await getPayload({ config })

        // Send email using Payload's email adapter
        // If no adapter is configured, it logs to console (which is what we want for now)
        await payload.sendEmail({
            to: 'info@bamida.sk', // Replace with actual recipient or config
            from: 'noreply@bamida.sk',
            subject: `New Contact Form Submission from ${result.data.name}`,
            html: `
                <h1>New Contact Form Submission</h1>
                <p><strong>Name:</strong> ${result.data.name}</p>
                <p><strong>Email:</strong> ${result.data.email}</p>
                <p><strong>Phone:</strong> ${result.data.phone || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p>${result.data.message.replace(/\n/g, '<br>')}</p>
            `,
        })

        return { success: true }
    } catch (error) {
        console.error('Error sending email:', error)
        return { success: false, error: 'Failed to send email' }
    }
}
