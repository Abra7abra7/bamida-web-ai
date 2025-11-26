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

    const heroImage = await payload.find({ collection: 'media', limit: 1 })
    const heroImageId = heroImage.docs[0]?.id

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

            const pageData: any = {
                title: title,
                slug: slug,
                locale: locale,
                layout: [
                    {
                        blockType: 'hero',
                        title: title,
                        subtitle: `${title} - Transparent Protection`,
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


    console.log('Cire Folie seed done! 🚀')
    process.exit(0)
}

seedCireFolie()
