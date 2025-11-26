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

export function LocaleSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const handleLocaleChange = (newLocale: string) => {
        // Replace the locale in the pathname
        // e.g. /sk/contact -> /en/contact
        // e.g. /contact -> /en/contact (if default locale is hidden)

        const segments = pathname.split('/')
        // segments[0] is always empty string because pathname starts with /

        // Check if the first segment is a locale
        const hasLocalePrefix = ['sk', 'en', 'de'].includes(segments[1])

        let newPath
        if (hasLocalePrefix) {
            // Replace existing locale
            segments[1] = newLocale
            newPath = segments.join('/')
        } else {
            // Add locale prefix (unless it's the default locale and we want to hide it, 
            // but for simplicity let's be explicit first or rely on middleware redirect)
            newPath = `/${newLocale}${pathname}`
        }

        // Special handling for default locale 'sk' if we want to hide prefix
        // But since middleware handles redirects, pushing the prefixed path is safest
        // The middleware will redirect /sk/contact -> /contact if configured to 'as-needed'

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
