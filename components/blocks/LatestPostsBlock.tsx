import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface LatestPostsBlockProps {
    title?: string | null
    limit?: number | null
    showDate?: boolean | null
}

export const LatestPostsBlock = ({ title, limit = 3, showDate = true }: LatestPostsBlockProps) => {
    // Placeholder data - in real app this would fetch from Payload API
    const posts = [
        {
            id: 1,
            title: 'Nové trendy v polepoch áut pre rok 2025',
            excerpt: 'Objavte najnovšie materiály a dizajnové prístupy pre firemné vozidlá.',
            date: '2025-11-20',
            slug: 'nove-trendy-polepy-2025',
        },
        {
            id: 2,
            title: 'Ako vybrať správnu svetelnú reklamu',
            excerpt: 'Porovnanie LED technológií a materiálov pre maximálnu viditeľnosť.',
            date: '2025-11-15',
            slug: 'ako-vybrat-svetelnu-reklamu',
        },
        {
            id: 3,
            title: 'Realizácia pre sieť kaviarní v Bratislave',
            excerpt: 'Komplexný branding od loga až po interiér.',
            date: '2025-11-10',
            slug: 'realizacia-kaviarne-bratislava',
        },
    ].slice(0, limit || 3)

    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">{title || 'Latest News'}</h2>
                    <Link href="/sk/blog" className="text-primary font-medium hover:underline flex items-center">
                        Všetky články <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/sk/blog/${post.slug}`}
                            className="group block bg-background rounded-2xl overflow-hidden border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="aspect-[16/9] bg-muted relative">
                                {/* Placeholder image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
                            </div>
                            <div className="p-6">
                                {showDate && (
                                    <time className="text-sm text-muted-foreground mb-3 block">
                                        {new Date(post.date).toLocaleDateString('sk-SK')}
                                    </time>
                                )}
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-muted-foreground line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
