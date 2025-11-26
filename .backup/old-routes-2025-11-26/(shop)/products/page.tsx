import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
    const payload = await getPayload({ config: configPromise })

    const products = await payload.find({
        collection: 'products',
        depth: 1,
        limit: 100,
    })

    return (
        <div className="container py-10">
            <h1 className="text-4xl font-bold font-serif mb-8">Všetky produkty</h1>

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
                                <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                                    {product.category}
                                </div>
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
                    Zatiaľ nie sú pridané žiadne produkty.
                </div>
            )}
        </div>
    )
}
