import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
    return [
        { category: 'priemysel' },
        { category: 'tienenie' },
        { category: 'branding' },
        { category: 'materialy' },
    ]
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params
    const payload = await getPayload({ config: configPromise })

    const products = await payload.find({
        collection: 'products',
        where: {
            category: {
                equals: category,
            },
        },
        depth: 1,
        limit: 100,
    })

    const categoryTitles: Record<string, string> = {
        priemysel: 'Priemyselné riešenia',
        tienenie: 'Tienenie a Outdoor Living',
        branding: 'Branding a Reklama',
        materialy: 'Materiály a Príslušenstvo',
    }

    const title = categoryTitles[category]

    if (!title) {
        return notFound()
    }

    return (
        <div className="container py-10">
            <h1 className="text-4xl font-bold font-serif mb-8">{title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.docs.map((product) => (
                    <Link key={product.id} href={`/products/${product.category}/${product.slug}`}>
                        <Card className="h-full hover:shadow-lg transition-shadow">
                            <div className="aspect-video relative overflow-hidden rounded-t-lg bg-muted">
                                {product.images && product.images[0]?.image && typeof product.images[0].image === 'object' && (
                                    <Image
                                        src={product.images[0].image.url || ''}
                                        alt={product.images[0].image.alt || product.name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <CardHeader>
                                <CardTitle className="font-serif text-2xl">{product.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="font-bold text-lg">
                                        {product.price ? `${product.price} €` : 'Cena na vyžiadanie'}
                                    </span>
                                    <Button variant="outline">Detail</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {products.totalDocs === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    V tejto kategórii zatiaľ nie sú žiadne produkty.
                </div>
            )}
        </div>
    )
}
