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

async function seedAbout() {
    console.log('Starting About seed...')

    // Dynamic imports to ensure env vars are loaded
    const { getPayload } = await import('payload')
    const { default: config } = await import('../payload.config')

    // Initialize Payload
    const payload = await getPayload({ config })

    // Find a suitable image for the about hero
    const aboutImage = await payload.find({
        collection: 'media',
        limit: 1,
    })
    const aboutImageId = aboutImage.docs[0]?.id

    const locales = ['sk', 'en', 'de']

    for (const locale of locales) {
        let slug = 'o-nas'
        let title = 'O nás'
        let subtitle = 'Váš spoľahlivý partner v oblasti reklamy a technických textílií.'
        let historyTitle = 'Naša história'
        let historyText = 'Spoločnosť BAMIDA s.r.o. bola založená v roku 1995.'
        let valuesTitle = 'Naše hodnoty'
        let featuresTitle = 'Prečo si vybrať nás?'
        let featuresDesc = 'Ponúkame komplexné riešenia pod jednou strechou.'
        let ctaTitle = 'Pridajte sa k našim spokojným klientom'
        let ctaText = 'Kontaktujte nás pre nezáväznú konzultáciu.'
        let ctaButton = 'Kontaktovať'
        let ctaUrl = `/${locale}/kontakt`

        if (locale === 'en') {
            slug = 'about-us'
            title = 'About Us'
            subtitle = 'Your reliable partner in advertising and technical textiles.'
            historyTitle = 'Our History'
            historyText = 'BAMIDA s.r.o. was founded in 1995.'
            valuesTitle = 'Our Values'
            featuresTitle = 'Why Choose Us?'
            featuresDesc = 'We offer comprehensive solutions under one roof.'
            ctaTitle = 'Join our satisfied clients'
            ctaText = 'Contact us for a non-binding consultation.'
            ctaButton = 'Contact'
            ctaUrl = `/${locale}/contact`
        } else if (locale === 'de') {
            slug = 'uber-uns'
            title = 'Über uns'
            subtitle = 'Ihr zuverlässiger Partner für Werbung und technische Textilien.'
            historyTitle = 'Unsere Geschichte'
            historyText = 'BAMIDA s.r.o. wurde 1995 gegründet.'
            valuesTitle = 'Unsere Werte'
            featuresTitle = 'Warum uns wählen?'
            featuresDesc = 'Wir bieten umfassende Lösungen aus einer Hand.'
            ctaTitle = 'Schließen Sie sich unseren zufriedenen Kunden an'
            ctaText = 'Kontaktieren Sie uns für eine unverbindliche Beratung.'
            ctaButton = 'Kontakt'
            ctaUrl = `/${locale}/kontakt`
        }

        const aboutPageData: any = {
            title: title,
            slug: slug,
            locale: locale,
            layout: [
                {
                    blockType: 'hero',
                    title: title,
                    subtitle: subtitle,
                    type: 'default',
                    backgroundImage: aboutImageId || null,
                    showSearch: false,
                },
                {
                    blockType: 'content',
                    content: {
                        root: {
                            type: 'root',
                            children: [
                                {
                                    type: 'heading',
                                    tag: 'h2',
                                    children: [{ type: 'text', text: historyTitle, version: 1 }],
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
                                            text: historyText,
                                            version: 1,
                                        },
                                    ],
                                    direction: 'ltr',
                                    format: '',
                                    indent: 0,
                                    version: 1,
                                },
                                {
                                    type: 'heading',
                                    tag: 'h2',
                                    children: [{ type: 'text', text: valuesTitle, version: 1 }],
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
                    title: featuresTitle,
                    description: featuresDesc,
                    items: [
                        {
                            title: '25+ Years',
                            text: 'Experience.',
                            icon: 'star',
                        },
                        {
                            title: 'Quality',
                            text: 'Guaranteed.',
                            icon: 'check',
                        },
                        {
                            title: 'Support',
                            text: 'Individual approach.',
                            icon: 'heart',
                        },
                    ],
                },
                {
                    blockType: 'cta',
                    title: ctaTitle,
                    text: ctaText,
                    style: 'default',
                    links: [
                        {
                            label: ctaButton,
                            url: ctaUrl,
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
            console.log(`Updating existing about page (${locale}): ${slug}`)
            await payload.update({
                collection: 'pages',
                id: existingPage.docs[0].id,
                data: aboutPageData,
                locale: locale as any,
            })
        } else {
            console.log(`Creating new about page (${locale}): ${slug}`)
            await payload.create({
                collection: 'pages',
                data: aboutPageData,
                locale: locale as any,
            })
        }
    }

    console.log('About page seeded successfully! 🚀')
    process.exit(0)
}

seedAbout()
