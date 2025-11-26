/**
 * Enhanced Slug Translations
 * Manual translations for common Slovak slug patterns
 */

export const slovakSlugTranslations: Record<string, { en: string; de: string }> = {
    // Common pages
    'kontakt': { en: 'contact', de: 'kontakt' },
    'o-nas': { en: 'about-us', de: 'uber-uns' },
    'referencie': { en: 'references', de: 'referenzen' },
    'blog': { en: 'blog', de: 'blog' },
    'prezentacia': { en: 'presentation', de: 'prasentation' },
    'galeria': { en: 'gallery', de: 'galerie' },

    // Services
    'sluzby': { en: 'services', de: 'dienstleistungen' },
    'sluzba': { en: 'services', de: 'dienstleistungen' },
    'reklama': { en: 'advertising', de: 'werbung' },
    'grafika': { en: 'graphics', de: 'grafik' },
    'digitalna-tlac': { en: 'digital-print', de: 'digitaldruck' },

    // Products
    'produkt': { en: 'product', de: 'produkt' },
    'produkty': { en: 'products', de: 'produkte' },

    // Technologies
    'nase-technologie': { en: 'our-technologies', de: 'unsere-technologien' },
    'technicke-textilie': { en: 'technical-textiles', de: 'technische-textilien' },

    // Shop/Commerce
    'obchod': { en: 'shop', de: 'shop' },
    'kosik': { en: 'cart', de: 'warenkorb' },
    'moj-ucet': { en: 'my-account', de: 'mein-konto' },
    'kontrola-objednavky': { en: 'order-tracking', de: 'bestellverfolgung' },

    // Legal
    'obchodne-podmienky': { en: 'terms-and-conditions', de: 'geschaftsbedingungen' },
    'ochrana-osobnych-udajov': { en: 'privacy-policy', de: 'datenschutzrichtlinie' },
    'odstupenie-od-zmluvy': { en: 'withdrawal-from-contract', de: 'widerrufsrecht' },
    'formular-na-odstupenie-od-zmluvy': { en: 'withdrawal-form', de: 'widerrufsformular' },

    // Misc
    'projekty': { en: 'projects', de: 'projekte' },
    'obstaravanie': { en: 'procurement', de: 'beschaffung' },
    'cennik': { en: 'pricing', de: 'preisliste' },
    'home': { en: 'home', de: 'startseite' },
}

/**
 * Intelligent slug translator with fallback
 */
export function translateSlugEnhanced(skSlug: string, targetLang: 'en' | 'de'): string {
    // Handle nested paths like "sluzba/reklama"
    const parts = skSlug.split('/')

    const translatedParts = parts.map(part => {
        // Check direct translations
        if (slovakSlugTranslations[part]) {
            return slovakSlugTranslations[part][targetLang]
        }

        // Fallback: keep SK slug (user will review)
        return part
    })

    return translatedParts.join('/')
}
