'use client'

import * as React from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Input } from '@/components/ui/input'
import { LocaleSwitcher } from './LocaleSwitcher'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

// Moved inside component to access translations and locale

export function Header() {
    const t = useTranslations('Navigation');
    const currentLocale = useLocale();

    const router = useRouter(); // Import useRouter

    // Helper to get localized slug
    const getSlug = (key: string) => {
        const slugs: Record<string, Record<string, string>> = {
            // REKLAMA
            'reklama': { sk: '/reklama', en: '/advertising', de: '/werbung' },
            'reklama_grafika': { sk: '/reklama/grafika', en: '/advertising/graphics', de: '/werbung/grafik' },
            'reklama_digitalna_tlac': { sk: '/reklama/digitalna-tlac', en: '/advertising/digital-printing', de: '/werbung/digitaldruck' },
            'reklama_sklenene_produkty': { sk: '/reklama/sklenene-produkty', en: '/advertising/glass-products', de: '/werbung/glasprodukte' },
            'reklama_malovana_reklama': { sk: '/reklama/malovana-reklama', en: '/advertising/painted-advertising', de: '/werbung/gemalte-werbung' },

            // TECHNICKÉ TEXTÍLIE
            'technicke_textilie': { sk: '/technicke-textilie', en: '/technical-textiles', de: '/technische-textilien' },
            'technicke_textilie_autoplachty': { sk: '/technicke-textilie/autoplachty', en: '/technical-textiles/car-tarpaulins', de: '/technische-textilien/lkw-planen' },
            'technicke_textilie_priemysel': { sk: '/technicke-textilie/priemysel', en: '/technical-textiles/industry', de: '/technische-textilien/industrie' },
            'technicke_textilie_polnohospodarstvo': { sk: '/technicke-textilie/polnohospodarstvo', en: '/technical-textiles/agriculture', de: '/technische-textilien/landwirtschaft' },
            'technicke_textilie_stropne_pohlady': { sk: '/technicke-textilie/stropne-pohlady', en: '/technical-textiles/ceiling-views', de: '/technische-textilien/deckenansichten' },

            // TIENENIE
            'tienenie': { sk: '/tienenie', en: '/shading', de: '/beschattung' },
            'tienenie_pergoly': { sk: '/tienenie/pergoly', en: '/shading/pergolas', de: '/beschattung/pergolen' },
            'tienenie_letne_terasy': { sk: '/tienenie/letne-terasy', en: '/shading/summer-terraces', de: '/beschattung/sommerterrassen' },
            'tienenie_markizy': { sk: '/tienenie/markizy', en: '/shading/awnings', de: '/beschattung/markisen' },
            'tienenie_rozne_prekrytia': { sk: '/tienenie/rozne-prekrytia', en: '/shading/various-coverings', de: '/beschattung/verschiedene-ueberdachungen' },
            'tienenie_atypicke_tienenie': { sk: '/tienenie/atypicke-tienenie', en: '/shading/atypical-shading', de: '/beschattung/atypische-beschattung' },

            // ČÍRE FÓLIE
            'cire_folie': { sk: '/cire-folie', en: '/clear-foils', de: '/klarsichtfolien' },
            'cire_folie_zip_system': { sk: '/cire-folie/zip-system', en: '/clear-foils/zip-system', de: '/klarsichtfolien/zip-system' },

            // OSTATNÉ
            'technologie': { sk: '/technologie', en: '/technologies', de: '/technologien' },
            'referencie': { sk: '/referencie', en: '/references', de: '/referenzen' },
            'kontakt': { sk: '/kontakt', en: '/contact', de: '/kontakt' },
        };

        // Check if currentLocale is valid, otherwise default to sk
        const lang = ['sk', 'en', 'de'].includes(currentLocale) ? currentLocale : 'sk';
        return slugs[key]?.[lang] || '/';
    };

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const query = e.currentTarget.value;
            if (query.trim()) {
                router.push(`/${currentLocale}/search?q=${encodeURIComponent(query)}`);
            }
        }
    };



    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <div className="mr-4 hidden md:flex items-center gap-6">
                    <Link href={`/${currentLocale}`} className="font-bold text-xl mr-4">
                        Bamida
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            {/* REKLAMA */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>{t('reklama')}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        <ListItem title={t('reklama')} href={`/${currentLocale}${getSlug('reklama')}`} />
                                        <ListItem title={t('reklama_grafika')} href={`/${currentLocale}${getSlug('reklama_grafika')}`} />

                                        {/* Digitálna tlač with sub-items */}
                                        <div className="row-span-3">
                                            <ListItem
                                                title={t('reklama_digitalna_tlac')}
                                                href={`/${currentLocale}${getSlug('reklama_digitalna_tlac')}`}
                                                className="mb-2 font-bold bg-accent/50"
                                            />
                                            <ul className="pl-4 space-y-2 border-l-2 border-muted ml-2">
                                                <li>
                                                    <Link href={`/${currentLocale}${getSlug('reklama_digitalna_tlac')}/banery-a-sietoviny`} className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                                                        {t('reklama_digitalna_tlac_banery')}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/${currentLocale}${getSlug('reklama_digitalna_tlac')}/samolepiace-folie`} className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                                                        {t('reklama_digitalna_tlac_samolepiace')}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Sklenené produkty with sub-items */}
                                        <div className="row-span-3">
                                            <ListItem
                                                title={t('reklama_sklenene_produkty')}
                                                href={`/${currentLocale}${getSlug('reklama_sklenene_produkty')}`}
                                                className="mb-2 font-bold bg-accent/50"
                                            />
                                            <ul className="pl-4 space-y-2 border-l-2 border-muted ml-2">
                                                <li>
                                                    <Link href={`/${currentLocale}${getSlug('reklama_sklenene_produkty')}/grafoskla`} className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                                                        {t('reklama_sklenene_produkty_grafoskla')}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/${currentLocale}${getSlug('reklama_sklenene_produkty')}/sklenene-obrazy`} className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                                                        {t('reklama_sklenene_produkty_sklenene_obrazy')}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/${currentLocale}${getSlug('reklama_sklenene_produkty')}/sklenene-zasteny`} className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                                                        {t('reklama_sklenene_produkty_sklenene_zasteny')}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <ListItem title={t('reklama_malovana_reklama')} href={`/${currentLocale}${getSlug('reklama_malovana_reklama')}`} />
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* TECHNICKÉ TEXTÍLIE */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>{t('technicke_textilie')}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        <ListItem title={t('technicke_textilie')} href={`/${currentLocale}${getSlug('technicke_textilie')}`} />
                                        <ListItem title={t('technicke_textilie_autoplachty')} href={`/${currentLocale}${getSlug('technicke_textilie_autoplachty')}`} />

                                        {/* Pre priemysel with sub-items */}
                                        <div className="row-span-3">
                                            <ListItem
                                                title={t('technicke_textilie_priemysel')}
                                                href={`/${currentLocale}${getSlug('technicke_textilie_priemysel')}`}
                                                className="mb-2 font-bold bg-accent/50"
                                            />
                                            <ul className="pl-4 space-y-2 border-l-2 border-muted ml-2">
                                                <li>
                                                    <Link href={`/${currentLocale}${getSlug('technicke_textilie_priemysel')}/deliace-steny`} className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                                                        {t('technicke_textilie_priemysel_deliace_steny')}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/${currentLocale}${getSlug('technicke_textilie_priemysel')}/priemyselne-zavesy`} className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                                                        {t('technicke_textilie_priemysel_priemyselne_zavesy')}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/${currentLocale}${getSlug('technicke_textilie_priemysel')}/lamelove-zavesy`} className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                                                        {t('technicke_textilie_priemysel_lamelove_zavesy')}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/${currentLocale}${getSlug('technicke_textilie_priemysel')}/brany`} className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                                                        {t('technicke_textilie_priemysel_brany')}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Pre poľnohospodárstvo with sub-items */}
                                        <div className="row-span-3">
                                            <ListItem
                                                title={t('technicke_textilie_polnohospodarstvo')}
                                                href={`/${currentLocale}${getSlug('technicke_textilie_polnohospodarstvo')}`}
                                                className="mb-2 font-bold bg-accent/50"
                                            />
                                            <ul className="pl-4 space-y-2 border-l-2 border-muted ml-2">
                                                <li>
                                                    <Link href={`/${currentLocale}${getSlug('technicke_textilie_polnohospodarstvo')}/ochranne-sietoviny`} className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                                                        {t('technicke_textilie_polnohospodarstvo_ochranne_sietoviny')}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/${currentLocale}${getSlug('technicke_textilie_polnohospodarstvo')}/foliovnikova-folia`} className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                                                        {t('technicke_textilie_polnohospodarstvo_foliovnikova_folia')}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <ListItem title={t('technicke_textilie_stropne_pohlady')} href={`/${currentLocale}${getSlug('technicke_textilie_stropne_pohlady')}`} />
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* TIENENIE */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>{t('tienenie')}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        <ListItem title={t('tienenie')} href={`/${currentLocale}${getSlug('tienenie')}`} />
                                        <ListItem title={t('tienenie_pergoly')} href={`/${currentLocale}${getSlug('tienenie_pergoly')}`} />
                                        <ListItem title={t('tienenie_letne_terasy')} href={`/${currentLocale}${getSlug('tienenie_letne_terasy')}`} />
                                        <ListItem title={t('tienenie_markizy')} href={`/${currentLocale}${getSlug('tienenie_markizy')}`} />
                                        <ListItem title={t('tienenie_rozne_prekrytia')} href={`/${currentLocale}${getSlug('tienenie_rozne_prekrytia')}`} />
                                        <ListItem title={t('tienenie_atypicke_tienenie')} href={`/${currentLocale}${getSlug('tienenie_atypicke_tienenie')}`} />
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* ČÍRE FÓLIE */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>{t('cire_folie')}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[400px]">
                                        <ListItem title={t('cire_folie')} href={`/${currentLocale}${getSlug('cire_folie')}`} />
                                        <ListItem title={t('cire_folie_zip_system')} href={`/${currentLocale}${getSlug('cire_folie_zip_system')}`} />
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* TECHNOLÓGIE */}
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href={`/${currentLocale}${getSlug('technologie')}`} className={navigationMenuTriggerStyle()}>
                                        {t('technologie')}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            {/* REFERENCIE */}
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href={`/${currentLocale}${getSlug('referencie')}`} className={navigationMenuTriggerStyle()}>
                                        {t('referencie')}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            {/* KONTAKT */}
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href={`/${currentLocale}${getSlug('kontakt')}`} className={navigationMenuTriggerStyle()}>
                                        {t('kontakt')}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Hľadať..."
                                className="pl-8 w-[200px] lg:w-[300px]"
                                onKeyDown={handleSearch}
                            />
                        </div>
                    </div>
                    <nav className="flex items-center gap-2">
                        <LocaleSwitcher />
                        <Link href={`/${currentLocale}${getSlug('kontakt')}`}>
                            <Button variant="default" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                                {t('getQuote')}
                            </Button>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = 'ListItem'
