import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LexicalRenderer } from "@/components/payload/LexicalRenderer"

interface TabsBlockProps {
    title?: string | null
    tabs: {
        label: string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content: any
    }[]
}

export const TabsBlock = ({ title, tabs }: TabsBlockProps) => {
    return (
        <section className="py-12 container">
            {title && (
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                </div>
            )}
            <Tabs defaultValue="tab-0" className="w-full">
                <TabsList className="w-full justify-center mb-8 bg-transparent h-auto flex-wrap gap-2">
                    {tabs.map((tab, index) => (
                        <TabsTrigger
                            key={index}
                            value={`tab-${index}`}
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2 rounded-full border border-muted"
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {tabs.map((tab, index) => (
                    <TabsContent key={index} value={`tab-${index}`} className="mt-0">
                        <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm border">
                            <article className="prose prose-lg dark:prose-invert max-w-none">
                                <LexicalRenderer content={tab.content} />
                            </article>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    )
}
