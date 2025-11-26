import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function seedTechnickeTextilie() {
    console.log('Starting Technicke Textilie seed...')
    const { getPayload } = await import('payload')
    const { default: config } = await import('../payload.config')
    const payload = await getPayload({ config })

    const heroImage = await payload.find({ collection: 'media', limit: 1 })
    const heroImageId = heroImage.docs[0]?.id

    const pages = [
        { key: 'technicke-textilie', sk: 'Technické textílie', en: 'Technical Textiles', de: 'Technische Textilien' },
        { key: 'technicke-textilie/autoplachty', sk: 'Autoplachty', en: 'Car Tarpaulins', de: 'LKW-Planen' },
        { key: 'technicke-textilie/priemysel', sk: 'Pre priemysel', en: 'For Industry', de: 'Für die Industrie' },
        { key: 'technicke-textilie/polnohospodarstvo', sk: 'Pre poľnohospodárstvo', en: 'For Agriculture', de: 'Für die Landwirtschaft' },
        { key: 'technicke-textilie/stropne-pohlady', sk: 'Stropné pohľady', en: 'Ceiling Views', de: 'Deckenansichten' },
    ]

    const locales = ['sk', 'en', 'de']

    const descriptions: Record<string, Record<string, string>> = {
        'technicke-textilie': {
            sk: 'Široká ponuka technických textílií pre rôzne priemyselné odvetvia.',
            en: 'Wide range of technical textiles for various industries.',
            de: 'Breites Angebot an technischen Textilien für verschiedene Industriezweige.'
        },
        'technicke-textilie/autoplachty': {
            sk: 'Výroba a oprava autoplachiet na mieru pre všetky typy vozidiel.',
            en: 'Custom manufacturing and repair of car tarpaulins for all types of vehicles.',
            de: 'Maßgeschneiderte Herstellung und Reparatur von LKW-Planen für alle Fahrzeugtypen.'
        },
        'technicke-textilie/priemysel': {
            sk: 'Špeciálne riešenia pre priemyselné haly, predelenia a krycie plachty.',
            en: 'Special solutions for industrial halls, partitions and cover sheets.',
            de: 'Spezielle Lösungen für Industriehallen, Trennwände und Abdeckplanen.'
        },
        'technicke-textilie/polnohospodarstvo': {
            sk: 'Krycie plachty pre poľnohospodárske stroje, stohy a silážne jamy.',
            en: 'Cover sheets for agricultural machinery, stacks and silage pits.',
            de: 'Abdeckplanen für landwirtschaftliche Maschinen, Stapel und Silagegruben.'
        },
        'technicke-textilie/stropne-pohlady': {
            sk: 'Estetické a funkčné textilné podhľady pre interiéry.',
            en: 'Aesthetic and functional textile ceilings for interiors.',
            de: 'Ästhetische und funktionale Textildecken für Innenräume.'
        }
    }


    for (const page of pages) {
        for (const locale of locales) {
            let title = page[locale as keyof typeof page]
            let slug = ''

            // Recalculate slug for current locale
            if (page.key === 'technicke-textilie') slug = 'technicke-textilie'
            if (page.key === 'technicke-textilie/autoplachty') slug = 'autoplachty'
            if (page.key === 'technicke-textilie/priemysel') slug = 'pre-priemysel'
            if (page.key === 'technicke-textilie/polnohospodarstvo') slug = 'polnohospodarstvo'
            if (page.key === 'technicke-textilie/stropne-pohlady') slug = 'stropne-pohlady'

            if (locale === 'en') {
                if (slug === 'technicke-textilie') slug = 'technical-textiles'
                if (slug === 'autoplachty') slug = 'car-tarpaulins'
                if (slug === 'pre-priemysel') slug = 'for-industry'
                if (slug === 'polnohospodarstvo') slug = 'agriculture'
                if (slug === 'stropne-pohlady') slug = 'ceiling-views'
            } else if (locale === 'de') {
                if (slug === 'technicke-textilie') slug = 'technische-textilien'
                if (slug === 'autoplachty') slug = 'lkw-planen'
                if (slug === 'pre-priemysel') slug = 'fuer-industrie'
                if (slug === 'polnohospodarstvo') slug = 'landwirtschaft'
                if (slug === 'stropne-pohlady') slug = 'deckenansichten'
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
                        subtitle: `${title} - Quality Textiles`,
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


    console.log('Technicke Textilie seed done! 🚀')
    process.exit(0)
}

seedTechnickeTextilie()
