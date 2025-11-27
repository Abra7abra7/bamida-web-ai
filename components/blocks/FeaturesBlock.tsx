import { Star, Shield, Zap, Heart, Check, Trophy } from 'lucide-react'


interface FeaturesBlockProps {
    title?: string | null
    description?: string | null
    items: Array<{
        title: string
        text?: string | null
        icon?: 'star' | 'shield' | 'zap' | 'heart' | 'check' | 'trophy' | null
        id?: string | null
    }>
}

const iconMap = {
    star: Star,
    shield: Shield,
    zap: Zap,
    heart: Heart,
    check: Check,
    trophy: Trophy,
}

export const FeaturesBlock = ({ title, description, items }: FeaturesBlockProps) => {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
                {(title || description) && (
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        {title && (
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-lg text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, index) => {
                        const Icon = item.icon && iconMap[item.icon] ? iconMap[item.icon] : Star

                        return (
                            <div
                                key={item.id || index}
                                className="relative p-8 bg-card rounded-2xl border shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                {item.text && (
                                    <p className="text-muted-foreground leading-relaxed">
                                        {item.text}
                                    </p>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
