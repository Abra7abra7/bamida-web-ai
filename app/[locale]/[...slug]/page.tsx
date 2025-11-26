import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Metadata } from 'next'
import { LexicalRenderer } from '@/components/payload/LexicalRenderer'
import { BlocksRenderer } from '@/components/blocks/BlocksRenderer'

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
    const lastSlug = Array.isArray(slug) ? slug[slug.length - 1] : slug

    const payload = await getPayload({ config })

    const { docs } = await payload.find({
        collection: 'pages',
        where: {
            and: [
                { slug: { equals: lastSlug } },
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
    const { slug, locale } = await params
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'pages',
        where: {
            slug: {
                equals: slug[slug.length - 1],
            },
        },
        locale: locale as any,
        depth: 2, // Ensure we get image data
    })

    const page = result.docs[0]

    if (!page) {
        return notFound()
    }

    // ... metadata generation ...

    return (
        <main className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 text-foreground">
                        {page.title}
                    </h1>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                </div>

                {/* Featured Image */}
                {page.featuredImage && typeof page.featuredImage === 'object' && 'url' in page.featuredImage && (
                    <div className="mb-12 max-w-5xl mx-auto">
                        <img
                            src={page.featuredImage.url || ''}
                            alt={page.featuredImage.alt || page.title}
                            className="w-full h-auto rounded-xl shadow-2xl"
                        />
                    </div>
                )}

                {/* Page Content - Blocks or Legacy */}
                {page.layout && page.layout.length > 0 ? (
                    <BlocksRenderer blocks={page.layout as any} />
                ) : (
                    <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
                        <LexicalRenderer content={page.content} />
                    </article>
                )}

                {/* Attachments */}
                {page.attachments && page.attachments.length > 0 && (
                    <div className="mt-16 max-w-4xl mx-auto border-t pt-8">
                        <h3 className="text-2xl font-bold mb-6">Dokumenty na stiahnutie</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {page.attachments.map((attachment: any, index: number) => (
                                <a
                                    key={index}
                                    href={attachment.file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-4 rounded-lg border bg-card hover:bg-accent transition-colors group"
                                >
                                    <div className="mr-4 p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4h4" /></svg>
                                    </div>
                                    <div>
                                        <div className="font-medium">{attachment.title || attachment.file.filename}</div>
                                        <div className="text-sm text-muted-foreground">PDF • {(attachment.file.filesize / 1024).toFixed(0)} KB</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
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
            </div>
        </main>
    )
}
