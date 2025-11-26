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

async function seedProducts() {
    console.log('Starting Products seed...')

    // Dynamic imports to ensure env vars are loaded
    const { getPayload } = await import('payload')
    const { default: config } = await import('../payload.config')

    // Initialize Payload
    const payload = await getPayload({ config })

    // Find a suitable image for the products hero
    const productsImage = await payload.find({
        collection: 'media',
        limit: 1,
    })
    const productsImageId = productsImage.docs[0]?.id

    const locales = ['sk', 'en', 'de']

    for (const locale of locales) {
        let slug = 'materialy'
        let title = 'Materiály a Príslušenstvo'
        let subtitle = 'Špičkové materiály pre vašu výrobu a projekty.'
        let ctaTitle = 'Nenašli ste čo hľadáte?'
        let ctaText = 'Kontaktujte nás a my vám pomôžeme nájsť správne riešenie.'
        let ctaButton = 'Kontaktovať'
        let ctaUrl = `/${locale}/kontakt`

        if (locale === 'en') {
            slug = 'materials'
            title = 'Materials & Accessories'
            subtitle = 'Top quality materials for your production and projects.'
            ctaTitle = 'Didn\'t find what you were looking for?'
            ctaText = 'Contact us and we will help you find the right solution.'
            ctaButton = 'Contact'
            ctaUrl = `/${locale}/contact`
        } else if (locale === 'de') {
            slug = 'materialien'
            title = 'Materialien & Zubehör'
            subtitle = 'Hochwertige Materialien für Ihre Produktion und Projekte.'
            ctaTitle = 'Nicht gefunden, was Sie suchen?'
            ctaText = 'Kontaktieren Sie uns und wir helfen Ihnen, die richtige Lösung zu finden.'
            ctaButton = 'Kontakt'
            ctaUrl = `/${locale}/kontakt`
        }

        const productsPageData: any = {
            title: title,
            slug: slug,
            locale: locale,
            layout: [
                {
                    blockType: 'hero',
                    title: title,
                    subtitle: subtitle,
                    type: 'default',
                    backgroundImage: productsImageId || null,
                    showSearch: true,
                },
                {
                    blockType: 'features',
                    title: locale === 'sk' ? 'Naša ponuka materiálov' : (locale === 'en' ? 'Our Material Offer' : 'Unser Materialangebot'),
                    description: locale === 'sk' ? 'Vyberte si z našej širokej ponuky.' : (locale === 'en' ? 'Choose from our wide range.' : 'Wählen Sie aus unserem breiten Angebot.'),
                    items: [
                        {
                            title: 'PVC',
                            text: 'High quality PVC materials.',
                            icon: 'shield',
                        },
                        {
                            title: 'Akryl',
                            text: 'Premium acrylic fabrics.',
                            icon: 'star',
                        },
                        {
                            title: 'Príslušenstvo',
                            text: 'Complete accessories range.',
                            icon: 'check',
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
            console.log(`Updating existing products page (${locale}): ${slug}`)
            await payload.update({
                collection: 'pages',
                id: existingPage.docs[0].id,
                data: productsPageData,
                locale: locale as any,
            })
        } else {
            console.log(`Creating new products page (${locale}): ${slug}`)
            await payload.create({
                collection: 'pages',
                data: productsPageData,
                locale: locale as any,
            })
        }
    }

    console.log('Products seeded successfully! 🚀')
    process.exit(0)
}

seedProducts()
