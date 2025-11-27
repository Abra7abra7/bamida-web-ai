'use client'

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface CarouselBlockProps {
    title?: string | null
    items: {
        image: {
            url?: string | null
            alt?: string | null
        }
        text?: string | null
        id?: string | null
    }[]
}

export const CarouselBlock = ({ title, items }: CarouselBlockProps) => {
    return (
        <section className="py-12 container">
            {title && (
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                </div>
            )}
            <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                    {items.map((item, index) => (
                        <CarouselItem key={item.id || index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6 gap-4">
                                        {item.image?.url && (
                                            <div className="relative w-full h-48 overflow-hidden rounded-md">
                                                <Image
                                                    src={item.image.url}
                                                    alt={item.image.alt || ''}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        {item.text && (
                                            <p className="text-sm text-center text-muted-foreground">
                                                {item.text}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}
