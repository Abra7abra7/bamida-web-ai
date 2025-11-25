import Link from 'next/link'
import { ArrowRight, Factory, Home, Palette, Settings } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const categories = [
    {
        title: 'Pre priemysel',
        description: 'Deliace steny, haly a funkčné textílie.',
        icon: Factory,
        href: '/priemysel',
        color: 'bg-slate-800 text-white',
        colSpan: 'md:col-span-2',
    },
    {
        title: 'Pre domov',
        description: 'Pergoly, markízy a outdoor living.',
        icon: Home,
        href: '/tienenie',
        color: 'bg-white text-slate-900',
        colSpan: 'md:col-span-1',
    },
    {
        title: 'Branding',
        description: 'Polepy a svetelná reklama.',
        icon: Palette,
        href: '/branding',
        color: 'bg-accent text-white',
        colSpan: 'md:col-span-1',
    },
    {
        title: 'Materiály',
        description: 'Predaj technických materiálov.',
        icon: Settings,
        href: '/materialy',
        color: 'bg-slate-100 text-slate-900',
        colSpan: 'md:col-span-2',
    },
]

export function BentoGrid() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container">
                <h2 className="text-3xl font-bold font-serif mb-10 text-center">Naše divízie</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link key={category.title} href={category.href} className={`${category.colSpan} group`}>
                            <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${category.color} border-none`}>
                                <CardHeader>
                                    <category.icon className="h-8 w-8 mb-2" />
                                    <CardTitle className="text-2xl font-serif">{category.title}</CardTitle>
                                    <CardDescription className={category.color.includes('text-white') ? 'text-slate-200' : 'text-slate-500'}>
                                        {category.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex justify-end">
                                    <ArrowRight className="h-6 w-6 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
