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

    const heroImage = await payload.find({ collection: 'media', limit: 1 })
    const heroImageId = heroImage.docs[0]?.id

    const pages = [
        { key: 'reklama', sk: 'Reklama', en: 'Advertising', de: 'Werbung' },
        { key: 'reklama/grafika', sk: 'Grafika', en: 'Graphics', de: 'Grafik' },
        { key: 'reklama/digitalna-tlac', sk: 'Digitálna tlač', en: 'Digital Printing', de: 'Digitaldruck' },
        { key: 'reklama/sklenene-produkty', sk: 'Sklenené produkty', en: 'Glass Products', de: 'Glasprodukte' },
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
        'reklama/sklenene-produkty': {
            sk: 'Potlač skla, pieskovanie a iné úpravy pre interiér aj exteriér.',
            en: 'Glass printing, sandblasting and other treatments for interior and exterior.',
            de: 'Glasdruck, Sandstrahlen und andere Behandlungen für Innen- und Außenbereiche.'
        },
        'reklama/malovana-reklama': {
            sk: 'Tradičná ručne maľovaná reklama na fasády a iné povrchy.',
            en: 'Traditional hand-painted advertising on facades and other surfaces.',
            de: 'Traditionelle handgemalte Werbung an Fassaden und anderen Oberflächen.'
        }
    }



    for (const page of pages) {
        for (const locale of locales) {
            let title = page[locale as keyof typeof page]
            let slug = ''

            if (page.key === 'reklama') slug = 'reklama'
            if (page.key === 'reklama/grafika') slug = 'grafika'
            if (page.key === 'reklama/digitalna-tlac') slug = 'digitalna-tlac'
            if (page.key === 'reklama/sklenene-produkty') slug = 'sklenene-produkty'
            if (page.key === 'reklama/malovana-reklama') slug = 'malovana-reklama'

            // Localization for slugs
            if (locale === 'en') {
                if (slug === 'reklama') slug = 'advertising'
                if (slug === 'grafika') slug = 'graphics'
                if (slug === 'digitalna-tlac') slug = 'digital-printing'
                if (slug === 'sklenene-produkty') slug = 'glass-products'
                if (slug === 'malovana-reklama') slug = 'painted-advertising'
            } else if (locale === 'de') {
                if (slug === 'reklama') slug = 'werbung'
                if (slug === 'grafika') slug = 'grafik'
                if (slug === 'digitalna-tlac') slug = 'digitaldruck'
                if (slug === 'sklenene-produkty') slug = 'glasprodukte'
                if (slug === 'malovana-reklama') slug = 'gemalte-werbung'
            }

            const description = descriptions[page.key]?.[locale] || `Content for ${title}`

            const pageData: any = {
                title: title,
                slug: slug,
                locale: locale,
                translationKey: page.key,
                layout: [
                    {
                        blockType: 'hero',
                        title: title,
                        subtitle: `${title} - Professional Solutions`,
                        type: 'default',
                        backgroundImage: heroImageId || null,
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
