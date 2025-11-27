import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CardGridBlockProps {
    title?: string | null
    description?: string | null
    cards: {
        title: string
        description?: string | null
        image?: {
            url?: string | null
            alt?: string | null
        } | null
        link?: string | null
        linkText?: string | null
        id?: string | null
    }[]
}

export const CardGridBlock = ({ title, description, cards }: CardGridBlockProps) => {
    return (
        <section className="py-12 container">
            <div className="mb-12 text-center max-w-3xl mx-auto">
                {title && (
                    <>
                        <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
                        <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6" />
                    </>
                )}
                {description && (
                    <p className="text-lg text-muted-foreground">{description}</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <Card key={card.id || index} className="flex flex-col overflow-hidden group hover:shadow-lg transition-shadow">
                        {card.image?.url && (
                            <div className="relative aspect-video overflow-hidden">
                                <Image
                                    src={card.image.url}
                                    alt={card.image.alt || card.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="group-hover:text-primary transition-colors">{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {card.description && (
                                <CardDescription className="text-base">
                                    {card.description}
                                </CardDescription>
                            )}
                        </CardContent>
                        {card.link && (
                            <CardFooter>
                                <Button asChild variant="ghost" className="w-full group/btn">
                                    <Link href={card.link}>
                                        {card.linkText || 'Learn More'}
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                ))}
            </div>
        </section>
    )
}
