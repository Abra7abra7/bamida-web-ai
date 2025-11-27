import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function seedTienenie() {
    console.log('Starting Tienenie seed...')
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
        if (found.length < count) {
            const remaining = count - found.length
            const others = allMedia.docs.filter(d => !found.includes(d)).slice(0, remaining)
            return [...found, ...others].map(doc => doc.id)
        }
        return found.slice(0, count).map(doc => doc.id)
    }

    const pages = [
        { key: 'tienenie', sk: 'Tienenie', en: 'Shading', de: 'Beschattung' },
        { key: 'tienenie/pergoly', sk: 'Pergoly', en: 'Pergolas', de: 'Pergolen' },
        { key: 'tienenie/letne-terasy', sk: 'Letné terasy', en: 'Summer Terraces', de: 'Sommerterrassen' },
        { key: 'tienenie/markizy', sk: 'Markízy', en: 'Awnings', de: 'Markisen' },
        { key: 'tienenie/rozne-prekrytia', sk: 'Rôzne prekrytia', en: 'Various Coverings', de: 'Verschiedene Überdachungen' },
        { key: 'tienenie/atypicke-tienenie', sk: 'Atypické tienenie – TENUVO', en: 'Atypical Shading – TENUVO', de: 'Atypische Beschattung – TENUVO' },
    ]

    const locales = ['sk', 'en', 'de']

    const descriptions: Record<string, Record<string, string>> = {
        'tienenie': {
            sk: 'Moderné tieniace techniky pre váš domov a záhradu.',
            en: 'Modern shading techniques for your home and garden.',
            de: 'Moderne Beschattungstechniken für Ihr Zuhause und Ihren Garten.'
        },
        'tienenie/pergoly': {
            sk: 'Hliníkové a drevené pergoly na mieru.',
            en: 'Custom aluminum and wooden pergolas.',
            de: 'Maßgeschneiderte Aluminium- und Holzpergolen.'
        },
        'tienenie/letne-terasy': {
            sk: 'Zasklenie a prekrytie terás pre celoročné využitie.',
            en: 'Glazing and covering of terraces for year-round use.',
            de: 'Verglasung und Überdachung von Terrassen für die ganzjährige Nutzung.'
        },
        'tienenie/markizy': {
            sk: 'Výsuvné a kazetové markízy pre balkóny a terasy.',
            en: 'Retractable and cassette awnings for balconies and terraces.',
            de: 'Gelenkarm- und Kassettenmarkisen für Balkone und Terrassen.'
        },
        'tienenie/rozne-prekrytia': {
            sk: 'Atypické prístrešky a prekrytia vstupov.',
            en: 'Atypical shelters and entrance coverings.',
            de: 'Atypische Überdachungen und Eingangsüberdachungen.'
        },
        'tienenie/atypicke-tienenie': {
            sk: 'Dizajnové tieniace plachty a membránové konštrukcie.',
            en: 'Design shading sails and membrane structures.',
            de: 'Design-Sonnensegel und Membrankonstruktionen.'
        }
    }



    for (const page of pages) {
        for (const locale of locales) {
            let title = page[locale as keyof typeof page]
            let slug = ''

            if (page.key === 'tienenie') slug = 'tienenie'
            if (page.key === 'tienenie/pergoly') slug = 'pergoly'
            if (page.key === 'tienenie/letne-terasy') slug = 'letne-terasy'
            if (page.key === 'tienenie/markizy') slug = 'markizy'
            if (page.key === 'tienenie/rozne-prekrytia') slug = 'rozne-prekrytia'
            if (page.key === 'tienenie/atypicke-tienenie') slug = 'atypicke-tienenie'

            if (locale === 'en') {
                if (slug === 'tienenie') slug = 'shading'
                if (slug === 'pergoly') slug = 'pergolas'
                if (slug === 'letne-terasy') slug = 'summer-terraces'
                if (slug === 'markizy') slug = 'awnings'
                if (slug === 'rozne-prekrytia') slug = 'various-coverings'
                if (slug === 'atypicke-tienenie') slug = 'atypical-shading'
            } else if (locale === 'de') {
                if (slug === 'tienenie') slug = 'beschattung'
                if (slug === 'pergoly') slug = 'pergolen'
                if (slug === 'letne-terasy') slug = 'sommerterrassen'
                if (slug === 'markizy') slug = 'markisen'
                if (slug === 'rozne-prekrytia') slug = 'verschiedene-ueberdachungen'
                if (slug === 'atypicke-tienenie') slug = 'atypische-beschattung'
            }

            const description = descriptions[page.key]?.[locale] || `Content for ${title}`

            let imageKeywords: string[] = []
            if (page.key === 'tienenie') imageKeywords = ['tienenie', 'shading', 'slnko']
            if (page.key === 'tienenie/pergoly') imageKeywords = ['pergola', 'structure']
            if (page.key === 'tienenie/letne-terasy') imageKeywords = ['terasa', 'terrace', 'zasklenie']
            if (page.key === 'tienenie/markizy') imageKeywords = ['markiza', 'awning']
            if (page.key === 'tienenie/rozne-prekrytia') imageKeywords = ['prekrytie', 'covering', 'pristresok']
            if (page.key === 'tienenie/atypicke-tienenie') imageKeywords = ['atyp', 'tenuvo', 'plachta']

            const pageImageId = findImage(imageKeywords)

            const pageData: any = {
                title: title,
                slug: slug,
                locale: locale,
                translationKey: page.key,
                layout: [
                    {
                        blockType: 'heroModern',
                        title: title,
                        subtitle: `${title} - Comfort & Design`,
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
                            { value: '15+', label: locale === 'sk' ? 'Rokov na trhu' : (locale === 'en' ? 'Years on Market' : 'Jahre am Markt') },
                            { value: '300+', label: locale === 'sk' ? 'Inštalácií' : (locale === 'en' ? 'Installations' : 'Installationen') },
                            { value: '5r', label: locale === 'sk' ? 'Záruka' : (locale === 'en' ? 'Warranty' : 'Garantie') },
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
                                                text: description,
                                                version: 1,
                                            },
                                        ],
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0,
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
                        title: locale === 'sk' ? 'Výhody nášho tienenia' : (locale === 'en' ? 'Benefits of Our Shading' : 'Vorteile unserer Beschattung'),
                        description: locale === 'sk' ? 'Doprajte si pohodlie a ochranu pred slnkom s našimi riešeniami.' : (locale === 'en' ? 'Enjoy comfort and protection from the sun with our solutions.' : 'Genießen Sie Komfort und Schutz vor der Sonne mit unseren Lösungen.'),
                        items: [
                            {
                                title: locale === 'sk' ? 'Moderný dizajn' : (locale === 'en' ? 'Modern Design' : 'Modernes Design'),
                                text: locale === 'sk' ? 'Estetické a funkčné riešenia pre každú architektúru.' : (locale === 'en' ? 'Aesthetic and functional solutions for every architecture.' : 'Ästhetische und funktionale Lösungen für jede Architektur.'),
                                icon: 'star',
                            },
                            {
                                title: locale === 'sk' ? 'Dlhá životnosť' : (locale === 'en' ? 'Long Lifespan' : 'Lange Lebensdauer'),
                                text: locale === 'sk' ? 'Konštrukcie z kvalitných materiálov odolných voči korózii.' : (locale === 'en' ? 'Structures made of high-quality corrosion-resistant materials.' : 'Konstruktionen aus hochwertigen korrosionsbeständigen Materialien.'),
                                icon: 'shield',
                            },
                            {
                                title: locale === 'sk' ? 'Komfort' : (locale === 'en' ? 'Comfort' : 'Komfort'),
                                text: locale === 'sk' ? 'Jednoduché ovládanie a maximálne pohodlie.' : (locale === 'en' ? 'Easy operation and maximum comfort.' : 'Einfache Bedienung und maximaler Komfort.'),
                                icon: 'heart',
                            },
                        ],
                    },
                    {
                        blockType: 'galleryMasonry',
                        title: locale === 'sk' ? 'Inšpirácie' : (locale === 'en' ? 'Inspirations' : 'Inspirationen'),
                        description: locale === 'sk' ? 'Galéria našich realizácií' : (locale === 'en' ? 'Gallery of our projects' : 'Galerie unserer Projekte'),
                        images: findImages(imageKeywords, 6).map((id, index) => ({
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


    console.log('Tienenie seed done! 🚀')
    process.exit(0)
}

seedTienenie()
