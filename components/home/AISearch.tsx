'use client'

import * as React from 'react'
import { Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AISearch() {
    const [query, setQuery] = React.useState('')

    const handleSearch = () => {
        if (query.trim()) {
            window.location.href = `/products?search=${encodeURIComponent(query)}`
        }
    }

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-background rounded-lg shadow-xl border">
                    <Sparkles className="ml-4 h-5 w-5 text-accent animate-pulse" />
                    <Input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Aký projekt plánujete? (napr. 'Zimná záhrada pre reštauráciu')"
                        className="border-0 shadow-none focus-visible:ring-0 h-14 text-lg bg-transparent text-foreground placeholder:text-muted-foreground"
                    />
                    <Button size="lg" onClick={handleSearch} className="m-1 bg-primary hover:bg-primary/90">
                        <Search className="h-5 w-5 mr-2" />
                        Hľadať
                    </Button>
                </div>
            </div>
            <p className="mt-2 text-center text-sm text-muted-foreground/80">
                Opýtajte sa našej AI na riešenia pre váš priestor.
            </p>
        </div>
    )
}
