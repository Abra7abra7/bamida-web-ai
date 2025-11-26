'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'

import { useState, useEffect } from 'react'
import { getTranslatedSlugs } from '@/app/actions'

export function LocaleSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const [slugMap, setSlugMap] = useState<Record<string, string> | null>(null)

    useEffect(() => {
        const fetchSlugs = async () => {
            // Extract slug from pathname
            // Pathname format: /locale/slug/parts or /slug/parts
            const segments = pathname.split('/').filter(Boolean)
            let currentSlug = ''
            let currentLocale = locale

            // If first segment is locale, remove it
            if (['sk', 'en', 'de'].includes(segments[0])) {
                currentLocale = segments[0]
                currentSlug = segments.slice(1).join('/')
            } else {
                currentSlug = segments.join('/')
            }

            if (!currentSlug) {
                currentSlug = 'home' // Default to home if root
            }

            // Call server action
            const map = await getTranslatedSlugs(currentSlug, currentLocale)
            setSlugMap(map)
        }

        fetchSlugs()
    }, [pathname, locale])

    const handleLocaleChange = (newLocale: string) => {
        let newPath = `/${newLocale}`

        if (slugMap && slugMap[newLocale]) {
            // If we have a direct translation, use it
            if (slugMap[newLocale] !== 'home') {
                newPath += `/${slugMap[newLocale]}`
            }
        } else {
            // Fallback logic (try to keep same structure or go home)
            // For now, just go to home of new locale if no mapping found
            // or try to keep the same path if it might exist (risky)
            const segments = pathname.split('/').filter(Boolean)
            if (['sk', 'en', 'de'].includes(segments[0])) {
                newPath += `/${segments.slice(1).join('/')}`
            } else {
                newPath += `/${segments.join('/')}`
            }
        }

        router.push(newPath)
    }

    const languages = [
        { code: 'sk', label: 'Slovenčina', flag: '🇸🇰' },
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    ]

    const currentLang = languages.find(l => l.code === locale)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-9 px-0">
                    <span className="sr-only">Prepnúť jazyk</span>
                    <span className="text-lg leading-none">{currentLang?.flag || <Globe className="h-4 w-4" />}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => handleLocaleChange(lang.code)}
                        className={`cursor-pointer ${locale === lang.code ? 'bg-accent' : ''}`}
                    >
                        <span className="mr-2 text-lg">{lang.flag}</span>
                        {lang.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

