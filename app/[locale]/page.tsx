/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload'
import type { Metadata } from 'next'
import config from '@/payload.config'
import { BlocksRenderer } from '@/components/blocks/BlocksRenderer'
import { LexicalRenderer } from '@/components/payload/LexicalRenderer'

type Props = {
  params: Promise<{
    locale: string
  }>
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: 'home' } },
        { locale: { equals: locale } },
      ],
    },
    limit: 1,
  })

  const page = docs[0]

  if (!page) {
    return {
      title: 'Domov',
    }
  }

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || page.excerpt,
    keywords: page.seo?.metaKeywords,
    alternates: {
      languages: {
        sk: '/sk',
        en: '/en',
        de: '/de',
      },
    },
  }
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: 'home' } },
        { locale: { equals: locale } },
      ],
    },
    depth: 2,
  })

  const page = result.docs[0]

  if (!page) {
    // Fallback if no home page exists in Payload yet
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Homepage not found</h1>
          <p>Please create a page with slug &quot;home&quot; in Payload CMS.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      {/* Page Content - Blocks or Legacy */}
      {page.layout && page.layout.length > 0 ? (
        <BlocksRenderer blocks={page.layout as any} />
      ) : (
        <div className="container mx-auto px-4 py-12">
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">&quot;Kvalita, ktorá vydrží.&quot;</p>
          <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
            <LexicalRenderer content={page.content} />
          </article>
        </div>
      )}
    </main>
  )
}
