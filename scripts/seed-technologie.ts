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

    const heroImage = await payload.find({ collection: 'media', limit: 1 })
    const heroImageId = heroImage.docs[0]?.id

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
