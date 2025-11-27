'use client'

import { getMediaUrl } from '@/lib/media'
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface TestimonialsBlockProps {
    title?: string | null
    description?: string | null
    reviews: Array<{
        content: string
        author: string
        role?: string | null
        rating?: number | null
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        image?: any
    }>
}

export const TestimonialsBlock = ({ title, description, reviews }: TestimonialsBlockProps) => {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4">
                <div className="text-center mb-16">
                    {title && (
                        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-foreground">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {description}
                        </p>
                    )}
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent>
                        {reviews.map((review, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-6">
                                <div className="p-1">
                                    <Card className="h-full border-none shadow-lg bg-card/50 backdrop-blur-sm">
                                        <CardContent className="flex flex-col justify-between h-full p-8">
                                            <div>
                                                <div className="flex gap-1 mb-6">
                                                    {[...Array(review.rating || 5)].map((_, i) => (
                                                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                                                    ))}
                                                </div>
                                                <p className="text-lg mb-8 text-foreground/80 italic leading-relaxed">
                                                    &quot;{review.content}&quot;
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4 mt-auto">
                                                {review.image && (
                                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-accent/20">
                                                        <Image
                                                            src={getMediaUrl(review.image) || ''}
                                                            alt={review.author}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-bold text-foreground">{review.author}</p>
                                                    {review.role && (
                                                        <p className="text-sm text-muted-foreground">{review.role}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex -left-12" />
                    <CarouselNext className="hidden md:flex -right-12" />
                </Carousel>
            </div>
        </section>
    )
}
