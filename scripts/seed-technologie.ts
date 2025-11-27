import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function seedTechnologie() {
    console.log('Starting Technologie seed...')
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

    const locales = ['sk', 'en', 'de']

    const descriptions: Record<string, string> = {
        sk: 'Najmodernejšie technológie pre spracovanie materiálov a výrobu reklamy.',
        en: 'State-of-the-art technologies for material processing and advertising production.',
        de: 'Modernste Technologien für die Materialbearbeitung und Werbeproduktion.'
    }

    for (const locale of locales) {
        let title = 'Technológie'
        let slug = 'technologie'

        if (locale === 'en') {
            title = 'Technologies'
            slug = 'technologies'
        } else if (locale === 'de') {
            title = 'Technologien'
            slug = 'technologien'
        }

        const description = descriptions[locale] || `Content for ${title}`

        const imageKeywords = ['technologia', 'technology', 'machine', 'stroj']
        const pageImageId = findImage(imageKeywords)

        const pageData: any = {
            title: title,
            slug: slug,
            locale: locale,
            translationKey: 'technologie',
            layout: [
                {
                    blockType: 'hero',
                    title: title,
                    subtitle: `${title} - Modern Production`,
                    type: 'default',
                    backgroundImage: pageImageId || null,
                    showSearch: false,
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
                            indent: 0,
                            version: 1,
                        }
                    },
                },
                {
                    blockType: 'features',
                    title: locale === 'sk' ? 'Naše technológie' : (locale === 'en' ? 'Our Technologies' : 'Unsere Technologien'),
                    description: locale === 'sk' ? 'Využívame najmodernejšie stroje pre dosiahnutie najlepších výsledkov.' : (locale === 'en' ? 'We use state-of-the-art machines to achieve the best results.' : 'Wir verwenden modernste Maschinen, um die besten Ergebnisse zu erzielen.'),
                    items: [
                        {
                            title: locale === 'sk' ? 'Presnosť' : (locale === 'en' ? 'Precision' : 'Präzision'),
                            text: locale === 'sk' ? 'Milimetrová presnosť pri každom reze.' : (locale === 'en' ? 'Millimeter precision with every cut.' : 'Millimetergenauigkeit bei jedem Schnitt.'),
                            icon: 'star',
                        },
                        {
                            title: locale === 'sk' ? 'Efektivita' : (locale === 'en' ? 'Efficiency' : 'Effizienz'),
                            text: locale === 'sk' ? 'Rýchla a efektívna výroba.' : (locale === 'en' ? 'Fast and efficient production.' : 'Schnelle und effiziente Produktion.'),
                            icon: 'zap',
                        },
                        {
                            title: locale === 'sk' ? 'Inovácia' : (locale === 'en' ? 'Innovation' : 'Innovation'),
                            text: locale === 'sk' ? 'Neustále investujeme do nových technológií.' : (locale === 'en' ? 'We constantly invest in new technologies.' : 'Wir investieren ständig in neue Technologien.'),
                            icon: 'trophy',
                        },
                    ],
                },
                {
                    blockType: 'gallery',
                    title: locale === 'sk' ? 'Strojový park' : (locale === 'en' ? 'Machine Park' : 'Maschinenpark'),
                    columns: '3',
                    images: findImages(imageKeywords, 6).map(id => ({ id })),
                },
            ],
        }

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
    console.log('Technologie seed done! 🚀')
    process.exit(0)
}

seedTechnologie()
