import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Metadata } from 'next'
import { LexicalRenderer } from '@/components/payload/LexicalRenderer'

type Props = {
    params: Promise<{
        locale: string
        slug: string[]
    }>
}

/**
 * Generate static params for all pages
 * This enables SSG for all 186 URLs
 */
export async function generateStaticParams() {
    const payload = await getPayload({ config })

    // Fetch all pages from Payload
    const { docs: pages } = await payload.find({
        collection: 'pages',
        limit: 200,
        where: {},
    })

    // Generate params for each page
    return pages.map((page: any) => {
        const slugParts = page.slug.split('/').filter(Boolean)

        return {
            locale: page.locale,
            slug: slugParts.length > 0 ? slugParts : ['home'],
        }
    })
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params
    const slugString = Array.isArray(slug) ? slug.join('/') : slug

    const payload = await getPayload({ config })

    const { docs } = await payload.find({
        collection: 'pages',
        where: {
            and: [
                { slug: { equals: slugString } },
                { locale: { equals: locale } },
            ],
        },
        limit: 1,
    })

    const page = docs[0]

    if (!page) {
        return {
            title: 'Page Not Found',
        }
    }

    return {
        title: page.seo?.metaTitle || page.title,
        description: page.seo?.metaDescription || page.excerpt,
        keywords: page.seo?.metaKeywords,
        alternates: {
            languages: {
                sk: `/sk/${slugString}`,
                en: `/en/${slugString}`,
                de: `/de/${slugString}`,
            },
        },
    }
}

/**
 * Page component - renders migrated WordPress pages
 */
export default async function Page({ params }: Props) {
    const { locale, slug } = await params
    const slugString = Array.isArray(slug) ? slug.join('/') : slug || 'home'

    const payload = await getPayload({ config })

    // Fetch page by slug and locale
    const { docs } = await payload.find({
        collection: 'pages',
        where: {
            and: [
                { slug: { equals: slugString } },
                { locale: { equals: locale } },
            ],
        },
        limit: 1,
    })

    const page = docs[0]

    if (!page) {
        notFound()
    }

    return (
        <main className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{page.title}</h1>

                {page.excerpt && (
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        {page.excerpt}
                    </p>
                )}
            </header>

            {/* Featured Image */}
            {page.featuredImage && typeof page.featuredImage === 'object' && 'url' in page.featuredImage && (
                <div className="mb-8">
                    <img
                        src={page.featuredImage.url}
                        alt={page.featuredImage.alt || page.title}
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>
            )}

            {/* Page Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none">
                <LexicalRenderer content={page.content} />
            </article>

            {/* PDF Attachments */}
            {page.attachments && page.attachments.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Downloads</h2>
                    <div className="grid gap-4">
                        {page.attachments.map((attachment: any, index: number) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            >
                                <svg
                                    className="w-8 h-8 text-red-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                </svg>
                                <div className="flex-1">
                                    <p className="font-medium">
                                        {attachment.title || 'Document'}
                                    </p>
                                </div>
                                <a
                                    href={typeof attachment.file === 'object' ? attachment.file.url : '#'}
                                    download
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Download
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Debug Info (Development Only) */}
            {process.env.NODE_ENV === 'development' && (
                <details className="mt-12 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <summary className="cursor-pointer font-medium">
                        Debug Info (dev only)
                    </summary>
                    <pre className="mt-4 text-xs overflow-auto">
                        {JSON.stringify(
                            {
                                id: page.id,
                                slug: page.slug,
                                locale: page.locale,
                                wpId: page.wpId,
                            },
                            null,
                            2
                        )}
                    </pre>
                </details>
            )}
        </main>
    )
}
