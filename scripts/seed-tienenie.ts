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

    const heroImage = await payload.find({ collection: 'media', limit: 1 })
    const heroImageId = heroImage.docs[0]?.id

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

            const pageData: any = {
                title: title,
                slug: slug,
                locale: locale,
                layout: [
                    {
                        blockType: 'hero',
                        title: title,
                        subtitle: `${title} - Comfort & Design`,
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


    console.log('Tienenie seed done! 🚀')
    process.exit(0)
}

seedTienenie()
