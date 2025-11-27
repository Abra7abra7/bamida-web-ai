import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const payload = await getPayload({ config: configPromise })
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://bamida.sk'

    // Fetch products (existing)
    const products = await payload.find({
        collection: 'products',
        limit: 1000,
    })

    const productUrls = products.docs.map((product) => ({
        url: `${baseUrl}/products/${product.category}/${product.slug}`,
        lastModified: new Date(product.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Fetch all migrated pages (NEW - 186 URLs)
    const pages = await payload.find({
        collection: 'pages',
        limit: 1000, // Increased limit to ensure we get all pages
        pagination: false,
    })

    const pageUrls = pages.docs.map((page) => {
        const slug = page.slug === 'home' ? '' : page.slug
        // Ensure locale is present, default to 'sk' if missing (though schema requires it)
        const locale = page.locale || 'sk'

        return {
            url: `${baseUrl}/${locale}/${slug}`,
            lastModified: new Date(page.updatedAt),
            changeFrequency: 'monthly' as const,
            priority: page.slug === 'home' ? 1.0 : 0.8,
        }
    })

    return [
        // Static pages
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        // All migrated WordPress pages (186 URLs)
        ...pageUrls,
        // Product pages
        ...productUrls,
    ]
}
