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

async function seedServices() {
    console.log('Starting Services seed...')

    // Dynamic imports to ensure env vars are loaded
    const { getPayload } = await import('payload')
    const { default: config } = await import('../payload.config')

    // Initialize Payload
    const payload = await getPayload({ config })

    // Find a suitable image for the service hero
    const serviceImage = await payload.find({
        collection: 'media',
        limit: 1,
    })
    const serviceImageId = serviceImage.docs[0]?.id

    // Define the service pages to modernize
    const services = [
        {
            slug: 'reklama', // Original slug from WP export might be different, need to check mapping
            title: 'Reklama a Branding',
            subtitle: 'Komplexné reklamné služby pre vašu firmu',
            description: 'Ponúkame široké spektrum reklamných služieb od návrhu až po realizáciu.',
            content: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'paragraph',
                            children: [
                                {
                                    type: 'text',
                                    text: 'Naša spoločnosť sa špecializuje na komplexné reklamné služby. Zabezpečujeme všetko od grafického návrhu, cez výrobu až po finálnu inštaláciu. Vďaka dlhoročným skúsenostiam a moderným technológiám garantujeme vysokú kvalitu a dlhú životnosť našich produktov.',
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
            }
        },
        // Add more services here as needed
    ]

    for (const service of services) {
        console.log(`Processing service: ${service.title}`)

        // Check if page exists (try to find by slug or similar)
        // Note: The actual slug might be 'sluzba/reklama' or just 'reklama' depending on how WP export handled it.
        // Based on Header.tsx, slugs are like '/sluzba/reklama'.
        // Let's try to find 'reklama' first.

        const existingPage = await payload.find({
            collection: 'pages',
            where: {
                slug: { equals: service.slug },
            },
            locale: 'sk' as any,
        })

        const pageData: any = {
            title: service.title,
            slug: service.slug,
            locale: 'sk',
            layout: [
                {
                    blockType: 'hero',
                    title: service.title,
                    subtitle: service.subtitle,
                    type: 'default',
                    backgroundImage: serviceImageId || null,
                    showSearch: false,
                },
                {
                    blockType: 'content',
                    content: service.content,
                },
                // We can add a gallery here if we find images for this service
                {
                    blockType: 'cta',
                    title: 'Máte záujem o tieto služby?',
                    text: 'Kontaktujte nás pre nezáväznú cenovú ponuku.',
                    style: 'default',
                    links: [
                        {
                            label: 'Kontaktovať',
                            url: '/sk/kontakt',
                            type: 'primary',
                        },
                    ],
                },
            ],
        }

        if (existingPage.docs.length > 0) {
            console.log(`Updating existing service page: ${service.slug}`)
            await payload.update({
                collection: 'pages',
                id: existingPage.docs[0].id,
                data: pageData,
                locale: 'sk' as any,
            })
        } else {
            console.log(`Creating new service page: ${service.slug}`)
            await payload.create({
                collection: 'pages',
                data: pageData,
                locale: 'sk' as any,
            })
        }
    }

    console.log('Services seeded successfully! 🚀')
    process.exit(0)
}

seedServices()
