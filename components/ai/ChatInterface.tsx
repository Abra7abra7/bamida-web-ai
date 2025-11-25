'use client'

// import { useChat } from '@ai-sdk/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot, Send, User, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function ChatInterface() {
    const [messages, setMessages] = useState<any[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage = { role: 'user', content: input }
        setMessages((prev) => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                }),
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(errorText || response.statusText)
            }

            const reader = response.body?.getReader()
            if (!reader) return

            const assistantMessage = { role: 'assistant', content: '' }
            setMessages((prev) => [...prev, assistantMessage])

            const decoder = new TextDecoder()
            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const text = decoder.decode(value, { stream: true })
                setMessages((prev) => {
                    const newMessages = [...prev]
                    const lastMsgIndex = newMessages.length - 1
                    const lastMsg = { ...newMessages[lastMsgIndex] }

                    if (lastMsg.role === 'assistant') {
                        lastMsg.content += text
                    }

                    newMessages[lastMsgIndex] = lastMsg
                    return newMessages
                })
            }
        } catch (error: any) {
            console.error('Chat error:', error)
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: `Chyba: ${error.message || 'Nastala neočakávaná chyba.'}` },
            ])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* Floating Action Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl transition-all duration-300 z-50",
                    isOpen ? "rotate-90 bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
                )}
            >
                {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-8 w-8" />}
            </Button>

            {/* Chat Window */}
            <div
                className={cn(
                    "fixed bottom-24 right-6 w-[90vw] md:w-[400px] transition-all duration-300 z-50",
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                )}
            >
                <Card className="h-[500px] flex flex-col shadow-2xl border-primary/20">
                    <CardHeader className="bg-primary text-primary-foreground rounded-t-lg py-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Bot className="h-5 w-5" />
                            Bamida Expert
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden">
                        <ScrollArea className="h-full p-4">
                            {messages.length === 0 && (
                                <div className="text-center text-muted-foreground mt-20">
                                    <p>Dobrý deň! 👋</p>
                                    <p className="text-sm mt-2">
                                        Som Bamida Expert. Ako vám môžem pomôcť s vaším projektom?
                                    </p>
                                </div>
                            )}
                            <div className="space-y-4">
                                {messages.map((m, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            "flex gap-3 max-w-[80%]",
                                            m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                                                m.role === 'user' ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                                            )}
                                        >
                                            {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                        </div>
                                        <div
                                            className={cn(
                                                "rounded-lg p-3 text-sm",
                                                m.role === 'user'
                                                    ? "bg-accent text-accent-foreground"
                                                    : "bg-muted text-foreground"
                                            )}
                                        >
                                            {m.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-4 border-t bg-muted/20">
                        <form onSubmit={handleSubmit} className="flex w-full gap-2">
                            <Input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Napíšte správu..."
                                className="flex-1 text-foreground"
                            />
                            <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
