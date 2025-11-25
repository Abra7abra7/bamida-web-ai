import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
    try {
        const payload = await getPayload({ config: configPromise })
        const products = await payload.find({
            collection: 'products',
            limit: 100,
        })

        return products.docs.map((product) => ({
            category: product.category,
            slug: product.slug,
        }))
    } catch (error) {
        console.warn('Database not available for static generation, skipping...', error)
        return []
    }
}

type Props = {
    params: Promise<{
        category: string
        slug: string
        locale: string
    }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'products',
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    const product = result.docs[0] as any

    if (!product) {
        return {
            title: 'Produkt nenájdený',
        }
    }

    // Extract text from Lexical description if possible, or use a default
    const description = product.description?.root?.children?.[0]?.children?.[0]?.text || 'Popis produktu'

    return {
        title: product.title,
        description: description,
        openGraph: {
            title: product.title,
            description: description,
            images: product.image?.url ? [product.image.url] : [],
        },
    }
}

export default async function ProductPage({ params }: Props) {
    const { category, slug } = await params
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'products',
        where: {
            and: [
                {
                    slug: {
                        equals: slug,
                    },
                },
                {
                    category: {
                        equals: category,
                    },
                },
            ],
        },
        depth: 1,
    })

    const product = result.docs[0]

    if (!product) {
        return notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
                {product.images && product.images[0]?.image && typeof product.images[0].image === 'object' && (
                    <Image
                        src={product.images[0].image.url || ''}
                        alt={product.images[0].image.alt || product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <div className="container">
                        <Badge className="mb-4 text-lg py-1 px-4 bg-accent text-accent-foreground border-none">
                            {product.category}
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-4">
                            {product.name}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Scrollytelling Section */}
            <div className="container py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sticky Sidebar */}
                    <div className="lg:col-span-4 relative">
                        <div className="sticky top-24 space-y-8">
                            <div className="prose prose-lg dark:prose-invert">
                                <p className="text-xl leading-relaxed text-muted-foreground">
                                    {/* Basic description fallback if rich text is complex to render quickly */}
                                    {/* In a real app, use a RichText renderer here */}
                                    Objavte dokonalé spojenie funkčnosti a dizajnu. Tento produkt je navrhnutý tak, aby splnil najnáročnejšie požiadavky.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="text-3xl font-bold">
                                    {product.price ? `${product.price} €` : 'Cena na vyžiadanie'}
                                </div>
                                <div className="flex gap-2">
                                    <Button size="lg" className="flex-1 text-lg h-14">
                                        Mám záujem o ponuku
                                    </Button>
                                    <Link href="/configurator">
                                        <Button size="lg" variant="outline" className="h-14 px-6" title="Konfigurovať v 3D">
                                            <span className="text-2xl">🧊</span>
                                        </Button>
                                    </Link>
                                </div>
                                <p className="text-xs text-center text-muted-foreground">
                                    Nezáväzná konzultácia a cenová ponuka zdarma.
                                </p>
                            </div>

                            {product.specifications && product.specifications.length > 0 && (
                                <div className="border rounded-lg p-6 bg-muted/30">
                                    <h3 className="font-bold mb-4">Technické špecifikácie</h3>
                                    <dl className="space-y-2 text-sm">
                                        {product.specifications.map((spec, i) => (
                                            <div key={i} className="flex justify-between border-b last:border-0 pb-2 last:pb-0 border-border/50">
                                                <dt className="text-muted-foreground">{spec.key}</dt>
                                                <dd className="font-medium">{spec.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Scrolling Content */}
                    <div className="lg:col-span-8 space-y-24">
                        {product.features && product.features.map((item, i) => (
                            <div key={i} className="group">
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-primary transition-colors">
                                            Vlastnosť {i + 1}
                                        </h3>
                                        <p className="text-lg text-muted-foreground">
                                            {item.feature}
                                        </p>
                                    </div>
                                    {/* Placeholder for feature image/icon */}
                                    <div className="w-full md:w-1/3 aspect-square bg-muted rounded-xl flex items-center justify-center text-4xl font-serif text-muted-foreground/30">
                                        {i + 1}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {(!product.features || product.features.length === 0) && (
                            <div className="text-muted-foreground italic">
                                Ďalšie informácie o produkte vám radi poskytneme osobne.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
