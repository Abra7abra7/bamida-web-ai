'use client'

import { getMediaUrl } from '@/lib/media'
import Image from 'next/image'
import Link from 'next/link'

interface LogoGridBlockProps {
    title?: string | null
    logos: Array<{
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        image: any
        name?: string | null
        url?: string | null
    }>
}

export const LogoGridBlock = ({ title, logos }: LogoGridBlockProps) => {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container px-4">
                {title && (
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 font-serif text-foreground/80">
                        {title}
                    </h2>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
                    {logos.map((logo, index) => {
                        const imageUrl = getMediaUrl(logo.image)
                        if (!imageUrl) return null

                        const Content = (
                            <div className="relative w-32 h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                                <Image
                                    src={imageUrl}
                                    alt={logo.name || 'Partner logo'}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        )

                        if (logo.url) {
                            return (
                                <Link key={index} href={logo.url} target="_blank" rel="noopener noreferrer">
                                    {Content}
                                </Link>
                            )
                        }

                        return <div key={index}>{Content}</div>
                    })}
                </div>
            </div>
        </section>
    )
}
