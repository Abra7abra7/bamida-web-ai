import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface AccordionBlockProps {
    title?: string | null
    items: {
        trigger: string
        content: string
        id?: string | null
    }[]
}

export const AccordionBlock = ({ title, items }: AccordionBlockProps) => {
    return (
        <section className="py-12 container">
            {title && (
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                </div>
            )}
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                {items.map((item, index) => (
                    <AccordionItem key={item.id || index} value={`item-${index}`}>
                        <AccordionTrigger>{item.trigger}</AccordionTrigger>
                        <AccordionContent>
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    )
}
