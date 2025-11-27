import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function seedCireFolie() {
    console.log('Starting Cire Folie seed...')
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
        { key: 'cire-folie', sk: 'Číre fólie', en: 'Clear Foils', de: 'Klarsichtfolien' },
        { key: 'cire-folie/zip-system', sk: 'ZIP systém', en: 'ZIP System', de: 'ZIP-System' },
    ]

    const locales = ['sk', 'en', 'de']

    const descriptions: Record<string, Record<string, string>> = {
        'cire-folie': {
            sk: 'Vysokokvalitné číre fólie pre altánky a terasy.',
            en: 'High-quality clear foils for gazebos and terraces.',
            de: 'Hochwertige Klarsichtfolien für Pavillons und Terrassen.'
        },
        'cire-folie/zip-system': {
            sk: 'Moderný ZIP systém pre dokonalé napnutie fólie a odolnosť voči vetru.',
            en: 'Modern ZIP system for perfect foil tension and wind resistance.',
            de: 'Modernes ZIP-System für perfekte Folienspannung und Windbeständigkeit.'
        }
    }



    for (const page of pages) {
        for (const locale of locales) {
            let title = page[locale as keyof typeof page]
            let slug = ''

            if (page.key === 'cire-folie') slug = 'cire-folie'
            if (page.key === 'cire-folie/zip-system') slug = 'zip-system'

            if (locale === 'en') {
                if (slug === 'cire-folie') slug = 'clear-foils'
                if (slug === 'zip-system') slug = 'zip-system'
            } else if (locale === 'de') {
                if (slug === 'cire-folie') slug = 'klarsichtfolien'
                if (slug === 'zip-system') slug = 'zip-system'
            }

            const description = descriptions[page.key]?.[locale] || `Content for ${title}`

            let imageKeywords: string[] = []
            if (page.key === 'cire-folie') imageKeywords = ['folia', 'foil', 'pvc']
            if (page.key === 'cire-folie/zip-system') imageKeywords = ['zip', 'system']

            const pageImageId = findImage(imageKeywords)

            const pageData: any = {
                title: title,
                slug: slug,
                locale: locale,
                translationKey: page.key,
                layout: [
                    {
                        blockType: 'hero',
                        title: title,
                        subtitle: `${title} - Transparent Protection`,
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
                        title: locale === 'sk' ? 'Prečo naše fólie?' : (locale === 'en' ? 'Why Our Foils?' : 'Warum unsere Folien?'),
                        description: locale === 'sk' ? 'Kvalitné riešenie pre vašu terasu či altánok.' : (locale === 'en' ? 'Quality solution for your terrace or gazebo.' : 'Qualitätslösung für Ihre Terrasse oder Ihren Pavillon.'),
                        items: [
                            {
                                title: locale === 'sk' ? 'Kryštáľová čírosť' : (locale === 'en' ? 'Crystal Clarity' : 'Kristallklarheit'),
                                text: locale === 'sk' ? 'Dokonalý výhľad bez skreslenia.' : (locale === 'en' ? 'Perfect view without distortion.' : 'Perfekte Sicht ohne Verzerrung.'),
                                icon: 'star',
                            },
                            {
                                title: locale === 'sk' ? 'Odolnosť voči vetru' : (locale === 'en' ? 'Wind Resistance' : 'Windbeständigkeit'),
                                text: locale === 'sk' ? 'Ochrana pred nepriaznivým počasím.' : (locale === 'en' ? 'Protection against adverse weather.' : 'Schutz vor schlechtem Wetter.'),
                                icon: 'shield',
                            },
                            {
                                title: locale === 'sk' ? 'Celoročné využitie' : (locale === 'en' ? 'Year-round Use' : 'Ganzjährige Nutzung'),
                                text: locale === 'sk' ? 'Predĺžte si sezónu na terase.' : (locale === 'en' ? 'Extend your terrace season.' : 'Verlängern Sie Ihre Terrassensaison.'),
                                icon: 'check',
                            },
                        ],
                    },
                    {
                        blockType: 'gallery',
                        title: locale === 'sk' ? 'Galéria' : (locale === 'en' ? 'Gallery' : 'Galerie'),
                        columns: '3',
                        images: findImages(imageKeywords, 6).map(id => ({ id })),
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


    console.log('Cire Folie seed done! 🚀')
    process.exit(0)
}

seedCireFolie()
