import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const payload = await getPayload({ config: configPromise })

    // Fetch products (existing)
    const products = await payload.find({
        collection: 'products',
        limit: 1000,
    })

    const productUrls = products.docs.map((product) => ({
        url: `https://bamida.sk/products/${product.category}/${product.slug}`,
        lastModified: new Date(product.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Fetch all migrated pages (NEW - 186 URLs)
    const pages = await payload.find({
        collection: 'pages',
        limit: 200,
        pagination: false,
    })

    const pageUrls = pages.docs.map((page: any) => {
        const slug = page.slug === 'home' ? '' : page.slug

        return {
            url: `https://bamida.sk/${page.locale}/${slug}`,
            lastModified: new Date(page.updatedAt),
            changeFrequency: 'monthly' as const,
            priority: page.slug === 'home' ? 1.0 : 0.8,
        }
    })

    return [
        // Static pages
        {
            url: 'https://bamida.sk',
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
