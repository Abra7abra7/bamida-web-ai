import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables FIRST
dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function seedServicesAll() {
    console.log('Starting All Services seed...')

    // Dynamic imports to ensure env vars are loaded
    const { getPayload } = await import('payload')
    const { default: config } = await import('../payload.config')

    // Initialize Payload
    const payload = await getPayload({ config })

    // Find a suitable image
    const serviceImage = await payload.find({
        collection: 'media',
        limit: 1,
    })
    const serviceImageId = serviceImage.docs[0]?.id

    const services = [
        {
            slug: 'technicke-textilie-pre-priemysel',
            title: 'Technické textílie pre priemysel',
            subtitle: 'Inovatívne riešenia pre priemyselné aplikácie',
            description: 'Výroba a spracovanie technických textílií pre rôzne priemyselné odvetvia.',
        },
        {
            slug: 'tienenie',
            title: 'Tienenie a Outdoor Living',
            subtitle: 'Komfort a ochrana pre váš exteriér',
            description: 'Pergoly, markízy a tieniace plachty na mieru.',
        },
        {
            slug: 'engineering',
            title: 'Bamida Engineering',
            subtitle: 'Komplexné inžinierske riešenia',
            description: 'Návrh a realizácia oceľových konštrukcií a hál.',
        },
    ]

    const locales = ['sk', 'en', 'de']

    for (const service of services) {
        console.log(`Processing service: ${service.title}`)

        for (const locale of locales) {
            let slug = service.slug
            let title = service.title
            let subtitle = service.subtitle
            let description = service.description

            // Localization logic
            if (locale === 'en') {
                if (slug === 'technicke-textilie-pre-priemysel') { slug = 'technical-textiles'; title = 'Technical Textiles'; }
                if (slug === 'tienenie') { slug = 'shading'; title = 'Shading & Outdoor Living'; }
                if (slug === 'engineering') { slug = 'engineering'; title = 'Bamida Engineering'; }
                subtitle = 'Innovative solutions for your business.'
                description = 'Production and processing of technical textiles.'
            } else if (locale === 'de') {
                if (slug === 'technicke-textilie-pre-priemysel') { slug = 'technische-textilien'; title = 'Technische Textilien'; }
                if (slug === 'tienenie') { slug = 'beschattung'; title = 'Beschattung'; }
                if (slug === 'engineering') { slug = 'engineering'; title = 'Bamida Engineering'; }
                subtitle = 'Innovative Lösungen für Ihr Unternehmen.'
                description = 'Herstellung und Verarbeitung von technischen Textilien.'
            }

            const pageData: any = {
                title: title,
                slug: slug,
                locale: locale,
                layout: [
                    {
                        blockType: 'hero',
                        title: title,
                        subtitle: subtitle,
                        type: 'default',
                        backgroundImage: serviceImageId || null,
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
                                    {
                                        type: 'paragraph',
                                        children: [
                                            {
                                                type: 'text',
                                                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
                        blockType: 'cta',
                        title: locale === 'sk' ? 'Máte záujem o riešenie na mieru?' : (locale === 'en' ? 'Interested in a custom solution?' : 'Interessiert an einer individuellen Lösung?'),
                        text: locale === 'sk' ? 'Kontaktujte nás pre konzultáciu.' : (locale === 'en' ? 'Contact us for a consultation.' : 'Kontaktieren Sie uns für eine Beratung.'),
                        style: 'default',
                        links: [
                            {
                                label: locale === 'sk' ? 'Kontaktovať' : (locale === 'en' ? 'Contact' : 'Kontakt'),
                                url: `/${locale}/${locale === 'sk' ? 'kontakt' : (locale === 'en' ? 'contact' : 'kontakt')}`,
                                type: 'primary',
                            },
                        ],
                    },
                ],
            }

            const existingPage = await payload.find({
                collection: 'pages',
                where: {
                    slug: { equals: slug },
                },
                locale: locale as any,
            })

            if (existingPage.docs.length > 0) {
                console.log(`Updating existing service page (${locale}): ${slug}`)
                await payload.update({
                    collection: 'pages',
                    id: existingPage.docs[0].id,
                    data: pageData,
                    locale: locale as any,
                })
            } else {
                console.log(`Creating new service page (${locale}): ${slug}`)
                await payload.create({
                    collection: 'pages',
                    data: pageData,
                    locale: locale as any,
                })
            }
        }
    }

    console.log('All Services seeded successfully! 🚀')
    process.exit(0)
}

seedServicesAll()
