import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const payload = await getPayload({ config: configPromise })

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

    return [
        {
            url: 'https://bamida.sk',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://bamida.sk/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://bamida.sk/contact',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...productUrls,
    ]
}
