import { cn } from "@/lib/utils"

interface TimelineBlockProps {
    title?: string | null
    items: {
        year: string
        title: string
        description?: string | null
        id?: string | null
    }[]
}

export const TimelineBlock = ({ title, items }: TimelineBlockProps) => {
    return (
        <section className="py-12 container">
            {title && (
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                </div>
            )}
            <div className="relative max-w-3xl mx-auto pl-8 md:pl-0">
                {/* Vertical Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

                <div className="space-y-12">
                    {items.map((item, index) => (
                        <div key={item.id || index} className={cn(
                            "relative flex flex-col md:flex-row gap-8 md:gap-0",
                            index % 2 === 0 ? "md:flex-row-reverse" : ""
                        )}>
                            {/* Dot */}
                            <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />

                            {/* Content */}
                            <div className="md:w-1/2 md:px-12">
                                <div className={cn(
                                    "bg-card p-6 rounded-xl border shadow-sm",
                                    index % 2 === 0 ? "text-left" : "md:text-right"
                                )}>
                                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-2">
                                        {item.year}
                                    </span>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    {item.description && (
                                        <p className="text-muted-foreground">{item.description}</p>
                                    )}
                                </div>
                            </div>

                            {/* Spacer for the other side */}
                            <div className="hidden md:block md:w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
