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

async function seedContact() {
    console.log('Starting Contact seed...')

    // Dynamic imports to ensure env vars are loaded
    const { getPayload } = await import('payload')
    const { default: config } = await import('../payload.config')

    // Initialize Payload
    const payload = await getPayload({ config })

    // Find a suitable image for the contact hero
    const contactImage = await payload.find({
        collection: 'media',
        limit: 1,
    })
    const contactImageId = contactImage.docs[0]?.id

    const locales = ['sk', 'en', 'de']

    for (const locale of locales) {
        let slug = 'kontakt'
        let title = 'Kontakt'
        let subtitle = 'Sme tu pre vás. Neváhajte nás kontaktovať.'
        let ctaTitle = 'Nájdite nás na mape'
        let ctaText = 'Navštívte nás osobne v našej prevádzke.'
        let ctaButton = 'Otvoriť v Google Maps'

        if (locale === 'en') {
            slug = 'contact'
            title = 'Contact'
            subtitle = 'We are here for you. Do not hesitate to contact us.'
            ctaTitle = 'Find us on the map'
            ctaText = 'Visit us in person at our facility.'
            ctaButton = 'Open in Google Maps'
        } else if (locale === 'de') {
            slug = 'kontakt'
            title = 'Kontakt'
            subtitle = 'Wir sind für Sie da. Zögern Sie nicht, uns zu kontaktieren.'
            ctaTitle = 'Finden Sie uns auf der Karte'
            ctaText = 'Besuchen Sie uns persönlich in unserem Betrieb.'
            ctaButton = 'In Google Maps öffnen'
        }

        const contactPageData: any = {
            title: title,
            slug: slug,
            locale: locale,
            translationKey: 'contact',
            layout: [
                {
                    blockType: 'hero',
                    title: title,
                    subtitle: subtitle,
                    type: 'default',
                    backgroundImage: contactImageId || null,
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
                                    children: [{ type: 'text', text: locale === 'sk' ? 'Kontaktné údaje' : (locale === 'en' ? 'Contact Details' : 'Kontaktdaten'), version: 1 }],
                                    direction: 'ltr',
                                    format: '',
                                    indent: 0,
                                    version: 1,
                                },
                                {
                                    type: 'paragraph',
                                    children: [
                                        { type: 'text', text: 'BAMIDA s.r.o.', version: 1, format: 1 },
                                        { type: 'linebreak', version: 1 },
                                        { type: 'text', text: 'Košická 26', version: 1 },
                                        { type: 'linebreak', version: 1 },
                                        { type: 'text', text: '080 01 Prešov', version: 1 },
                                    ],
                                    direction: 'ltr',
                                    format: '',
                                    indent: 0,
                                    version: 1,
                                },
                                {
                                    type: 'paragraph',
                                    children: [
                                        { type: 'text', text: 'Email: info@bamida.sk', version: 1 },
                                    ],
                                    direction: 'ltr',
                                    format: '',
                                    indent: 0,
                                    version: 1,
                                },
                                {
                                    type: 'paragraph',
                                    children: [
                                        { type: 'text', text: 'Tel: +421 910 944 502', version: 1 },
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
                    blockType: 'contact',
                    title: locale === 'sk' ? 'Napíšte nám' : (locale === 'en' ? 'Write to us' : 'Schreiben Sie uns'),
                    introText: {
                        root: {
                            type: 'root',
                            children: [
                                {
                                    type: 'paragraph',
                                    children: [
                                        {
                                            type: 'text',
                                            text: locale === 'sk' ? 'Máte otázky? Vyplňte formulár nižšie a my sa vám ozveme.' : (locale === 'en' ? 'Do you have questions? Fill out the form below and we will get back to you.' : 'Haben Sie Fragen? Füllen Sie das untenstehende Formular aus und wir werden uns bei Ihnen melden.'),
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
                {
                    blockType: 'cta',
                    title: ctaTitle,
                    text: ctaText,
                    style: 'default',
                    links: [
                        {
                            label: ctaButton,
                            url: 'https://maps.google.com/?q=BAMIDA+s.r.o.+Prešov',
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
            console.log(`Updating existing contact page (${locale}): ${slug}`)
            await payload.update({
                collection: 'pages',
                id: existingPage.docs[0].id,
                data: contactPageData,
                locale: locale as any,
            })
        } else {
            console.log(`Creating new contact page (${locale}): ${slug}`)
            await payload.create({
                collection: 'pages',
                data: contactPageData,
                locale: locale as any,
            })
        }
    }

    console.log('Contact page seeded successfully! 🚀')
    process.exit(0)
}

seedContact()
