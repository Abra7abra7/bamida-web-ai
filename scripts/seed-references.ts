import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function seedReferences() {
    console.log('Starting References seed...')
    const { getPayload } = await import('payload')
    const { default: config } = await import('../payload.config')
    const payload = await getPayload({ config })

    const heroImage = await payload.find({ collection: 'media', limit: 1 })
    const heroImageId = heroImage.docs[0]?.id

    const locales = ['sk', 'en', 'de']

    for (const locale of locales) {
        let title = 'Referencie'
        let slug = 'referencie'
        let description = 'Naše realizované projekty a ukážky prác.'

        if (locale === 'en') {
            title = 'References'
            slug = 'references'
            description = 'Our completed projects and work samples.'
        } else if (locale === 'de') {
            title = 'Referenzen'
            slug = 'referenzen'
            description = 'Unsere abgeschlossenen Projekte und Arbeitsbeispiele.'
        }

        const pageData: any = {
            title: title,
            slug: slug,
            locale: locale,
            translationKey: 'referencie',
            layout: [
                {
                    blockType: 'hero',
                    title: title,
                    subtitle: `${title} - Bamida`,
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
                // Placeholder gallery block - in a real scenario, we'd migrate images
                {
                    blockType: 'content',
                    content: {
                        root: {
                            type: 'root',
                            children: [
                                {
                                    type: 'heading',
                                    tag: 'h2',
                                    children: [
                                        {
                                            type: 'text',
                                            text: locale === 'sk' ? 'Galéria' : (locale === 'en' ? 'Gallery' : 'Galerie'),
                                            version: 1,
                                        }
                                    ],
                                    direction: 'ltr',
                                    format: '',
                                    indent: 0,
                                    version: 1,
                                },
                                {
                                    type: 'paragraph',
                                    children: [
                                        {
                                            type: 'text',
                                            text: locale === 'sk' ? 'Tu nájdete ukážky našich prác...' : (locale === 'en' ? 'Here you can find examples of our work...' : 'Hier finden Sie Beispiele unserer Arbeit...'),
                                            version: 1,
                                        }
                                    ],
                                    direction: 'ltr',
                                    format: '',
                                    indent: 0,
                                    version: 1,
                                }
                            ],
                            direction: 'ltr',
                            format: '',
                            indent: 0,
                            version: 1,
                        }
                    }
                }
            ],
        }

        // Check if page exists for this specific locale
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

    console.log('References seed done! 🚀')
    process.exit(0)
}

seedReferences()
