import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface CTABlockProps {
    title: string
    text?: string | null
    links: Array<{
        label: string
        url: string
        type?: 'primary' | 'secondary' | 'outline' | null
        id?: string | null
    }>
    style?: 'default' | 'boxed' | 'full' | null
}

export const CTABlock = ({ title, text, links, style = 'default' }: CTABlockProps) => {
    const isFull = style === 'full'
    const isBoxed = style === 'boxed'

    return (
        <section
            className={cn(
                'py-24',
                isFull ? 'bg-primary text-primary-foreground' : 'bg-background'
            )}
        >
            <div className="container mx-auto px-4">
                <div
                    className={cn(
                        'flex flex-col lg:flex-row items-center justify-between gap-8',
                        isBoxed && 'bg-muted p-12 rounded-3xl'
                    )}
                >
                    <div className="max-w-2xl text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                            {title}
                        </h2>
                        {text && (
                            <p
                                className={cn(
                                    'text-lg',
                                    isFull ? 'text-primary-foreground/90' : 'text-muted-foreground'
                                )}
                            >
                                {text}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center">
                        {links.map((link, index) => {
                            const isPrimary = link.type === 'primary' || !link.type
                            const isOutline = link.type === 'outline'

                            return (
                                <Link
                                    key={link.id || index}
                                    href={link.url}
                                    className={cn(
                                        'inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
                                        isFull
                                            ? 'bg-background text-foreground hover:bg-background/90'
                                            : isPrimary
                                                ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20'
                                                : isOutline
                                                    ? 'border-2 border-input hover:bg-accent hover:text-accent-foreground'
                                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                    )}
                                >
                                    {link.label}
                                    {index === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
