import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function seedReklama() {
    console.log('Starting Reklama seed...')
    const { getPayload } = await import('payload')
    const { default: config } = await import('../payload.config')
    const payload = await getPayload({ config })

    const allMedia = await payload.find({ collection: 'media', limit: 100 })

    const findImage = (keywords: string[]) => {
        const found = allMedia.docs.find(doc => {
            const text = (doc.alt + ' ' + doc.filename).toLowerCase()
            return keywords.some(k => text.includes(k.toLowerCase()))
        })
        return found?.id || allMedia.docs[0]?.id
    }

    const findImages = (keywords: string[], count: number = 6) => {
        const found = allMedia.docs.filter(doc => {
            const text = (doc.alt + ' ' + doc.filename).toLowerCase()
            return keywords.some(k => text.includes(k.toLowerCase()))
        })
        // If not enough found, fill with random ones to ensure gallery looks good
        if (found.length < count) {
            const remaining = count - found.length
            const others = allMedia.docs.filter(d => !found.includes(d)).slice(0, remaining)
            return [...found, ...others].map(doc => doc.id)
        }
        return found.slice(0, count).map(doc => doc.id)
    }

    const pages = [
        { key: 'reklama', sk: 'Reklama', en: 'Advertising', de: 'Werbung' },
        { key: 'reklama/grafika', sk: 'Grafika', en: 'Graphics', de: 'Grafik' },
        { key: 'reklama/digitalna-tlac', sk: 'Digitálna tlač', en: 'Digital Printing', de: 'Digitaldruck' },
        { key: 'reklama/digitalna-tlac/banery-a-sietoviny', sk: 'Banery a sieťoviny', en: 'Banners and Mesh', de: 'Banner und Netze' },
        { key: 'reklama/digitalna-tlac/samolepiace-folie', sk: 'Samolepiace fólie', en: 'Self-adhesive Foils', de: 'Selbstklebende Folien' },
        { key: 'reklama/sklenene-produkty', sk: 'Sklenené produkty', en: 'Glass Products', de: 'Glasprodukte' },
        { key: 'reklama/sklenene-produkty/grafoskla', sk: 'Grafosklá', en: 'Graphic Glass', de: 'Grafikglas' },
        { key: 'reklama/sklenene-produkty/sklenene-obrazy', sk: 'Sklenené obrazy', en: 'Glass Pictures', de: 'Glasbilder' },
        { key: 'reklama/sklenene-produkty/sklenene-zasteny', sk: 'Sklenené zásteny', en: 'Glass Backsplashes', de: 'Glasrückwände' },
        { key: 'reklama/malovana-reklama', sk: 'Maľovaná reklama', en: 'Painted Advertising', de: 'Gemalte Werbung' },
    ]

    const locales = ['sk', 'en', 'de']

    const descriptions: Record<string, Record<string, string>> = {
        'reklama': {
            sk: 'Komplexné reklamné služby pre vaše podnikanie. Od grafického návrhu až po realizáciu.',
            en: 'Comprehensive advertising services for your business. From graphic design to implementation.',
            de: 'Umfassende Werbedienstleistungen für Ihr Unternehmen. Von Grafikdesign bis zur Umsetzung.'
        },
        'reklama/grafika': {
            sk: 'Ponúkame komplexné grafické služby od návrhu loga až po kompletnú firemnú identitu.',
            en: 'We offer comprehensive graphic design services from logo design to complete corporate identity.',
            de: 'Wir bieten umfassende Grafikdesign-Dienstleistungen von der Logoentwicklung bis zur kompletten Corporate Identity.'
        },
        'reklama/digitalna-tlac': {
            sk: 'Vysokokvalitná veľkoformátová tlač na rôzne materiály.',
            en: 'High-quality large format printing on various materials.',
            de: 'Hochwertiger Großformatdruck auf verschiedenen Materialien.'
        },
        'reklama/digitalna-tlac/banery-a-sietoviny': {
            sk: 'Odolné banery a sieťoviny pre vašu reklamu.',
            en: 'Durable banners and mesh for your advertising.',
            de: 'Langlebige Banner und Netze für Ihre Werbung.'
        },
        'reklama/digitalna-tlac/samolepiace-folie': {
            sk: 'Kvalitné fólie pre polep áut, výkladov a tabúľ.',
            en: 'Quality foils for car wrapping, shop windows and boards.',
            de: 'Qualitätsfolien für Fahrzeugbeschriftung, Schaufenster und Tafeln.'
        },
        'reklama/sklenene-produkty': {
            sk: 'Potlačíme akékoľvek doskové materiály, bez ohľadu na farbu a štruktúru. Tlačíme formou White + CMYK, alebo opačne, akokoľvek aby bol efekt dokonalý. Sklo, PVC, Alubondy a iné.',
            en: 'We print on any board materials, regardless of color and structure. We print in the form of White + CMYK, or vice versa, however to make the effect perfect. Glass, PVC, Alubonds and others.',
            de: 'Wir bedrucken alle Plattenmaterialien, unabhängig von Farbe und Struktur. Wir drucken in Form von Weiß + CMYK oder umgekehrt, wie auch immer, um den Effekt perfekt zu machen. Glas, PVC, Alubonds und andere.'
        },
        'reklama/sklenene-produkty/grafoskla': {
            sk: 'Dizajnové sklá s potlačou pre kuchyne a kúpeľne.',
            en: 'Designer glass with print for kitchens and bathrooms.',
            de: 'Designglas mit Druck für Küchen und Badezimmer.'
        },
        'reklama/sklenene-produkty/sklenene-obrazy': {
            sk: 'Obrazy na skle s vysokým rozlíšením.',
            en: 'High-resolution glass pictures.',
            de: 'Hochauflösende Glasbilder.'
        },
        'reklama/sklenene-produkty/sklenene-zasteny': {
            sk: 'Praktické a estetické sklenené zásteny.',
            en: 'Practical and aesthetic glass backsplashes.',
            de: 'Praktische und ästhetische Glasrückwände.'
        },
        'reklama/malovana-reklama': {
            sk: 'Chcete sa odlíšiť od konkurencie? V našej ponuke služieb nájdete i možnosť aplikácie reklamy formou maľovania, na ktorú využívame kvalitné farby SERICOL. Životnosť maľovanej reklamy je zhruba 7-9 rokov.',
            en: 'Do you want to distinguish yourself from the competition? In our offer of services you will also find the possibility of applying advertising in the form of painting, for which we use quality SERICOL paints. The lifespan of painted advertising is roughly 7-9 years.',
            de: 'Möchten Sie sich von der Konkurrenz abheben? In unserem Leistungsangebot finden Sie auch die Möglichkeit der Werbeanbringung in Form von Malerei, für die wir hochwertige SERICOL-Farben verwenden. Die Lebensdauer gemalter Werbung beträgt ca. 7-9 Jahre.'
        }
    }



    for (const page of pages) {
        for (const locale of locales) {
            let title = page[locale as keyof typeof page]
            let slug = ''

            if (page.key === 'reklama') slug = 'reklama'
            else if (page.key === 'reklama/grafika') slug = 'grafika'
            else if (page.key === 'reklama/digitalna-tlac') slug = 'digitalna-tlac'
            else if (page.key === 'reklama/digitalna-tlac/banery-a-sietoviny') slug = 'banery-a-sietoviny'
            else if (page.key === 'reklama/digitalna-tlac/samolepiace-folie') slug = 'samolepiace-folie'
            else if (page.key === 'reklama/sklenene-produkty') slug = 'sklenene-produkty'
            else if (page.key === 'reklama/sklenene-produkty/grafoskla') slug = 'grafoskla'
            else if (page.key === 'reklama/sklenene-produkty/sklenene-obrazy') slug = 'sklenene-obrazy'
            else if (page.key === 'reklama/sklenene-produkty/sklenene-zasteny') slug = 'sklenene-zasteny'
            else if (page.key === 'reklama/malovana-reklama') slug = 'malovana-reklama'

            // Localization for slugs
            if (locale === 'en') {
                if (slug === 'reklama') slug = 'advertising'
                else if (slug === 'grafika') slug = 'graphics'
                else if (slug === 'digitalna-tlac') slug = 'digital-printing'
                else if (slug === 'banery-a-sietoviny') slug = 'banners-and-mesh'
                else if (slug === 'samolepiace-folie') slug = 'self-adhesive-foils'
                else if (slug === 'sklenene-produkty') slug = 'glass-products'
                else if (slug === 'grafoskla') slug = 'graphic-glass'
                else if (slug === 'sklenene-obrazy') slug = 'glass-pictures'
                else if (slug === 'sklenene-zasteny') slug = 'glass-backsplashes'
                else if (slug === 'malovana-reklama') slug = 'painted-advertising'
            } else if (locale === 'de') {
                if (slug === 'reklama') slug = 'werbung'
                else if (slug === 'grafika') slug = 'grafik'
                else if (slug === 'digitalna-tlac') slug = 'digitaldruck'
                else if (slug === 'banery-a-sietoviny') slug = 'banner-und-netze'
                else if (slug === 'samolepiace-folie') slug = 'selbstklebende-folien'
                else if (slug === 'sklenene-produkty') slug = 'glasprodukte'
                else if (slug === 'grafoskla') slug = 'grafikglas'
                else if (slug === 'sklenene-obrazy') slug = 'glasbilder'
                else if (slug === 'sklenene-zasteny') slug = 'glasrueckwaende'
                else if (slug === 'malovana-reklama') slug = 'gemalte-werbung'
            }

            const description = descriptions[page.key]?.[locale] || `Content for ${title}`

            let imageKeywords: string[] = []
            if (page.key === 'reklama') imageKeywords = ['reklama', 'advertising', 'banner']
            if (page.key === 'reklama/grafika') imageKeywords = ['grafika', 'design', 'logo']
            if (page.key === 'reklama/digitalna-tlac') imageKeywords = ['tlac', 'print', 'velkoformat']
            if (page.key === 'reklama/digitalna-tlac/banery-a-sietoviny') imageKeywords = ['banner', 'mesh', 'plachta']
            if (page.key === 'reklama/digitalna-tlac/samolepiace-folie') imageKeywords = ['folia', 'sticker', 'polep']
            if (page.key === 'reklama/sklenene-produkty') imageKeywords = ['sklo', 'glass', 'polep']
            if (page.key === 'reklama/sklenene-produkty/grafoskla') imageKeywords = ['grafosklo', 'kitchen', 'glass']
            if (page.key === 'reklama/sklenene-produkty/sklenene-obrazy') imageKeywords = ['obraz', 'picture', 'art']
            if (page.key === 'reklama/sklenene-produkty/sklenene-zasteny') imageKeywords = ['zastena', 'backsplash', 'kitchen']
            if (page.key === 'reklama/malovana-reklama') imageKeywords = ['malovana', 'painted', 'fasada']

            const pageImageId = findImage(imageKeywords)
            const galleryImageIds = findImages(imageKeywords, 6)

            const pageData: any = {
                title: title,
                slug: slug,
                locale: locale,
                translationKey: page.key,
                layout: [
                    {
                        blockType: 'heroModern',
                        title: title,
                        subtitle: description,
                        type: 'centered',
                        media: pageImageId ? { id: pageImageId } : null,
                        cta: {
                            label: locale === 'sk' ? 'Kontaktujte nás' : (locale === 'en' ? 'Contact Us' : 'Kontaktieren Sie uns'),
                            url: `/${locale}/#contact`
                        }
                    },
                    {
                        blockType: 'stats',
                        items: [
                            { value: '10+', label: locale === 'sk' ? 'Rokov skúseností' : (locale === 'en' ? 'Years Experience' : 'Jahre Erfahrung') },
                            { value: '100+', label: locale === 'sk' ? 'Projektov' : (locale === 'en' ? 'Projects' : 'Projekte') },
                            { value: '100%', label: locale === 'sk' ? 'Kvalita' : (locale === 'en' ? 'Quality' : 'Qualität') },
                        ],
                        backgroundImage: pageImageId ? { id: pageImageId } : null,
                    },
                    {
                        blockType: 'content',
                        content: {
                            root: {
                                type: 'root',
                                children: [
                                    {
                                        type: 'paragraph',
                                        children: [
                                            {
                                                type: 'text',
                                                detail: 0,
                                                format: 0,
                                                mode: 'normal',
                                                style: '',
                                                text: description,
                                                version: 1,
                                            },
                                        ],
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0,
                                        textFormat: 0,
                                        version: 1,
                                    },
                                ],
                                direction: 'ltr',
                                format: '',
                                version: 1,
                            }
                        },
                    },
                    {
                        blockType: 'features',
                        title: locale === 'sk' ? 'Naše výhody' : (locale === 'en' ? 'Our Advantages' : 'Unsere Vorteile'),
                        description: locale === 'sk' ? 'Ponúkame komplexné služby s dôrazom na kvalitu a detail.' : (locale === 'en' ? 'We offer comprehensive services with an emphasis on quality and detail.' : 'Wir bieten umfassende Dienstleistungen mit Schwerpunkt auf Qualität und Detail.'),
                        items: [
                            {
                                title: locale === 'sk' ? 'Vysoká kvalita' : (locale === 'en' ? 'High Quality' : 'Hohe Qualität'),
                                text: locale === 'sk' ? 'Používame len tie najlepšie materiály.' : (locale === 'en' ? 'We use only the best materials.' : 'Wir verwenden nur die besten Materialien.'),
                                icon: 'star',
                            },
                            {
                                title: locale === 'sk' ? 'Rýchle dodanie' : (locale === 'en' ? 'Fast Delivery' : 'Schnelle Lieferung'),
                                text: locale === 'sk' ? 'Vašu objednávku vybavíme v čo najkratšom čase.' : (locale === 'en' ? 'We will process your order as soon as possible.' : 'Wir bearbeiten Ihre Bestellung so schnell wie möglich.'),
                                icon: 'zap',
                            },
                            {
                                title: locale === 'sk' ? 'Profesionálny prístup' : (locale === 'en' ? 'Professional Approach' : 'Professioneller Ansatz'),
                                text: locale === 'sk' ? 'Náš tím odborníkov je vám vždy k dispozícii.' : (locale === 'en' ? 'Our team of experts is always at your disposal.' : 'Unser Expertenteam steht Ihnen jederzeit zur Verfügung.'),
                                icon: 'shield',
                            },
                        ],
                    },
                    {
                        blockType: 'cardGrid',
                        title: locale === 'sk' ? 'Súvisiace služby' : (locale === 'en' ? 'Related Services' : 'Verwandte Dienstleistungen'),
                        cards: [
                            { title: 'Digitálna tlač', description: locale === 'sk' ? 'Veľkoformátová UV tlač' : 'Large format UV printing', link: `/${locale}/reklama/digitalna-tlac`, image: pageImageId ? { id: pageImageId } : null },
                            { title: 'Grafika', description: locale === 'sk' ? 'Kreatívny dizajn' : 'Creative design', link: `/${locale}/reklama/grafika`, image: pageImageId ? { id: pageImageId } : null },
                            { title: 'Maľovaná reklama', description: locale === 'sk' ? 'Ručná maľba na fasády' : 'Hand painting on facades', link: `/${locale}/reklama/malovana-reklama`, image: pageImageId ? { id: pageImageId } : null },
                        ]
                    },
                    {
                        blockType: 'faq',
                        title: 'FAQ',
                        items: [
                            { question: locale === 'sk' ? 'Ako dlho trvá výroba?' : 'How long does production take?', answer: locale === 'sk' ? 'Štandardne 3-5 pracovných dní.' : 'Standard 3-5 working days.' },
                            { question: locale === 'sk' ? 'Poskytujete záruku?' : 'Do you provide a warranty?', answer: locale === 'sk' ? 'Áno, na všetky naše produkty poskytujeme záruku.' : 'Yes, we provide a warranty on all our products.' },
                        ]
                    },
                    {
                        blockType: 'galleryMasonry',
                        title: locale === 'sk' ? 'Galéria' : (locale === 'en' ? 'Gallery' : 'Galerie'),
                        description: locale === 'sk' ? 'Ukážka našich prác' : (locale === 'en' ? 'Our Work' : 'Unsere Arbeit'),
                        images: galleryImageIds.map((id, index) => ({
                            image: id,
                            category: index % 2 === 0 ? 'exterior' : 'interior',
                            caption: `Project ${index + 1}`
                        })),
                    },
                ],
            }

            // Find existing page by slug AND locale
            const existingPage = await payload.find({
                collection: 'pages',
                where: {
                    and: [
                        { slug: { equals: slug } },
                        { locale: { equals: locale } }
                    ]
                },
            })

            if (existingPage.docs.length > 0) {
                console.log(`Updating ${slug} (${locale})`)
                await payload.update({
                    collection: 'pages',
                    id: existingPage.docs[0].id,
                    data: pageData,
                })
            } else {
                console.log(`Creating ${slug} (${locale})`)
                await payload.create({
                    collection: 'pages',
                    data: pageData,
                })
            }
        }
    }


    console.log('Reklama seed done! 🚀')
    process.exit(0)
}

seedReklama()
