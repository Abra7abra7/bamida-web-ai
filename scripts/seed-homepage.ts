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

async function seedHomepage() {
    console.log('Starting Homepage seed...')

    // Dynamic imports to ensure env vars are loaded
    const { getPayload } = await import('payload')
    const { default: config } = await import('../payload.config')

    // Initialize Payload
    const payload = await getPayload({ config })

    const heroImage = await payload.find({
        collection: 'media',
        limit: 1,
    })

    const heroImageId = heroImage.docs[0]?.id

    const locales = ['sk', 'en', 'de']

    for (const locale of locales) {
        let title = 'Domov'
        let heroTitle = 'Kvalitná reklama pre vaše podnikanie'
        let heroSubtitle = 'Komplexné riešenia od grafického návrhu až po realizáciu. Polepy áut, svetelná reklama a veľkoformátová tlač.'
        let featuresTitle = 'Prečo si vybrať nás?'
        let featuresDesc = 'Sme lídrom v oblasti reklamnej výroby s viac ako 20 ročnými skúsenosťami.'
        let feat1Title = 'Vlastná výroba'
        let feat1Text = 'Disponujeme moderným strojovým parkom a všetko vyrábame pod jednou strechou.'
        let feat2Title = 'Rýchle dodanie'
        let feat2Text = 'Vďaka vlastným kapacitám vieme garantovať krátke dodacie lehoty.'
        let feat3Title = 'Kvalitné materiály'
        let feat3Text = 'Používame len overené materiály od renomovaných dodávateľov s dlhou životnosťou.'
        let latestPostsTitle = 'Novinky zo sveta reklamy'
        let ctaTitle = 'Máte záujem o spoluprácu?'
        let ctaText = 'Kontaktujte nás a my vám pripravíme nezáväznú cenovú ponuku na mieru.'
        let ctaBtn1 = 'Kontaktujte nás'
        let ctaBtn2 = 'Naše referencie'
        let ctaUrl1 = `/${locale}/kontakt`
        let ctaUrl2 = `/${locale}/referencie`

        if (locale === 'en') {
            title = 'Home'
            heroTitle = 'Quality Advertising for Your Business'
            heroSubtitle = 'Comprehensive solutions from graphic design to implementation. Car wrapping, illuminated advertising, and large format printing.'
            featuresTitle = 'Why Choose Us?'
            featuresDesc = 'We are a leader in advertising production with over 20 years of experience.'
            feat1Title = 'In-house Production'
            feat1Text = 'We have a modern machine park and manufacture everything under one roof.'
            feat2Title = 'Fast Delivery'
            feat2Text = 'Thanks to our own capacities, we can guarantee short delivery times.'
            feat3Title = 'Quality Materials'
            feat3Text = 'We use only proven materials from renowned suppliers with long durability.'
            latestPostsTitle = 'News from the World of Advertising'
            ctaTitle = 'Interested in Cooperation?'
            ctaText = 'Contact us and we will prepare a non-binding custom price offer for you.'
            ctaBtn1 = 'Contact Us'
            ctaBtn2 = 'Our References'
            ctaUrl1 = `/${locale}/contact`
            ctaUrl2 = `/${locale}/references`
        } else if (locale === 'de') {
            title = 'Startseite'
            heroTitle = 'Qualitätswerbung für Ihr Unternehmen'
            heroSubtitle = 'Umfassende Lösungen von Grafikdesign bis zur Umsetzung. Fahrzeugbeschriftung, Lichtwerbung und Großformatdruck.'
            featuresTitle = 'Warum uns wählen?'
            featuresDesc = 'Wir sind führend in der Werbeproduktion mit über 20 Jahren Erfahrung.'
            feat1Title = 'Eigene Produktion'
            feat1Text = 'Wir verfügen über einen modernen Maschinenpark und fertigen alles unter einem Dach.'
            feat2Title = 'Schnelle Lieferung'
            feat2Text = 'Dank eigener Kapazitäten können wir kurze Lieferzeiten garantieren.'
            feat3Title = 'Qualitätsmaterialien'
            feat3Text = 'Wir verwenden nur bewährte Materialien von renommierten Lieferanten mit langer Lebensdauer.'
            latestPostsTitle = 'Neuigkeiten aus der Werbewelt'
            ctaTitle = 'Interessiert an einer Zusammenarbeit?'
            ctaText = 'Kontaktieren Sie uns und wir erstellen Ihnen ein unverbindliches, maßgeschneidertes Angebot.'
            ctaBtn1 = 'Kontaktieren Sie uns'
            ctaBtn2 = 'Unsere Referenzen'
            ctaUrl1 = `/${locale}/kontakt`
            ctaUrl2 = `/${locale}/referenzen`
        }

        const homepageData: any = {
            title: title,
            slug: 'home',
            locale: locale,
            translationKey: 'home',
            layout: [
                {
                    blockType: 'hero',
                    title: heroTitle,
                    subtitle: heroSubtitle,
                    type: 'large',
                    backgroundImage: heroImageId || null,
                    showSearch: true,
                },
                {
                    blockType: 'features',
                    title: featuresTitle,
                    description: featuresDesc,
                    items: [
                        {
                            title: feat1Title,
                            text: feat1Text,
                            icon: 'trophy',
                        },
                        {
                            title: feat2Title,
                            text: feat2Text,
                            icon: 'zap',
                        },
                        {
                            title: feat3Title,
                            text: feat3Text,
                            icon: 'shield',
                        },
                    ],
                },
                {
                    blockType: 'latestPosts',
                    title: latestPostsTitle,
                    limit: 3,
                    showDate: true,
                },
                {
                    blockType: 'cta',
                    title: ctaTitle,
                    text: ctaText,
                    style: 'boxed',
                    links: [
                        {
                            label: ctaBtn1,
                            url: ctaUrl1,
                            type: 'primary',
                        },
                        {
                            label: ctaBtn2,
                            url: ctaUrl2,
                            type: 'outline',
                        },
                    ],
                },
            ],
            // SEO
            seo: {
                metaTitle: locale === 'sk' ? 'Bamida - Reklamná agentúra a výroba reklamy' : (locale === 'en' ? 'Bamida - Advertising Agency & Production' : 'Bamida - Werbeagentur & Produktion'),
                metaDescription: locale === 'sk' ? 'Komplexné služby v oblasti reklamy.' : (locale === 'en' ? 'Comprehensive advertising services.' : 'Umfassende Werbedienstleistungen.'),
            }
        }

        // Check if home page exists for this specific locale
        const existingHome = await payload.find({
            collection: 'pages',
            where: {
                and: [
                    { slug: { equals: 'home' } },
                    { locale: { equals: locale } }
                ]
            },
        })

        if (existingHome.docs.length > 0) {
            console.log(`Homepage already exists (${locale}), updating...`)
            await payload.update({
                collection: 'pages',
                id: existingHome.docs[0].id,
                data: homepageData,
            })
        } else {
            console.log(`Creating new Homepage (${locale})...`)
            await payload.create({
                collection: 'pages',
                data: homepageData,
            })
        }

    }

    console.log('Homepage seeded successfully! 🚀')
    process.exit(0)
}

seedHomepage()
