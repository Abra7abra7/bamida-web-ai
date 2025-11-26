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
