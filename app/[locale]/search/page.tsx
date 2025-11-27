/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'


export default function SearchPage({ params: { locale } }: { params: { locale: string } }) {
    const searchParams = useSearchParams()
    const query = searchParams.get('q')
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    // Mock search for now, or implement real search API
    useEffect(() => {
        if (query) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(true)
            // Simulate API call
            setTimeout(() => {
                setResults([
                    {
                        title: 'Reklama a Branding',
                        description: 'Komplexné reklamné služby pre vašu firmu.',
                        url: `/${locale}/sluzba/reklama`,
                    },
                    {
                        title: 'Materiály a Príslušenstvo',
                        description: 'Špičkové materiály pre vašu výrobu.',
                        url: `/${locale}/materialy`,
                    },
                    // Add more mock results or fetch from Payload
                ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase())))
                setLoading(false)
            }, 500)
        }
    }, [query, locale])

    return (
        <div className="min-h-screen bg-background pt-20 pb-10">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8">Výsledky vyhľadávania: &quot;{query}&quot;</h1>

                {loading ? (
                    <p>Vyhľadávam...</p>
                ) : results.length > 0 ? (
                    <div className="grid gap-6">
                        {results.map((result, index) => (
                            <a key={index} href={result.url} className="block p-6 border rounded-lg hover:bg-accent transition-colors">
                                <h2 className="text-2xl font-semibold mb-2">{result.title}</h2>
                                <p className="text-muted-foreground">{result.description}</p>
                            </a>
                        ))}
                    </div>
                ) : (
                    <p>Pre výraz &quot;{query}&quot; sa nenašli žiadne výsledky.</p>
                )}
            </div>
        </div>
    )
}
