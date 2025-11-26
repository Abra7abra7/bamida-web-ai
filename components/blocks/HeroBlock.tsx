import Image from 'next/image'
import { cn } from '@/lib/utils'

import { AISearch } from '../home/AISearch'

interface HeroBlockProps {
    title: string
    subtitle?: string | null
    backgroundImage?: {
        url?: string | null
        alt?: string | null
    } | null
    type?: 'default' | 'large' | 'minimal' | null
    showSearch?: boolean | null
}

export const HeroBlock = ({ title, subtitle, backgroundImage, type = 'default', showSearch }: HeroBlockProps) => {
    const currentType = type || 'default'

    const heightClass = {
        default: 'min-h-[60vh]',
        large: 'min-h-[90vh]',
        minimal: 'min-h-[40vh]',
    }

    return (
        <section className={cn('relative flex items-center justify-center overflow-hidden', heightClass[currentType])}>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/50 z-10" />
                {backgroundImage && backgroundImage.url && (
                    <Image
                        src={backgroundImage.url}
                        alt={backgroundImage.alt || title}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
            </div>

            <div className="container relative z-20 text-white text-center px-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto text-white/90 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        {subtitle}
                    </p>
                )}

                <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
                    {showSearch && (
                        <div className="w-full max-w-2xl mt-8">
                            <AISearch />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
