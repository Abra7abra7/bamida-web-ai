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

async function seedHomepageV2() {
    console.log('Starting Homepage V2 seed...')

    // Dynamic imports to ensure env vars are loaded
    const { getPayload } = await import('payload')
    const { default: config } = await import('../payload.config')

    // Initialize Payload
    const payload = await getPayload({ config })

    // Fetch some images for use in blocks
    const mediaDocs = await payload.find({
        collection: 'media',
        limit: 10,
    })

    const heroImageId = mediaDocs.docs[0]?.id
    const partnerLogoId = mediaDocs.docs[1]?.id || heroImageId
    const testimonialImageId = mediaDocs.docs[2]?.id || heroImageId
    const galleryImageId1 = mediaDocs.docs[3]?.id || heroImageId
    const galleryImageId2 = mediaDocs.docs[4]?.id || heroImageId

    const locales = ['sk', 'en', 'de']

    for (const locale of locales) {
        let title = 'Domov'
        // Hero
        let heroTitle = 'Kvalitná reklama pre vaše podnikanie'
        let heroSubtitle = 'Komplexné riešenia od grafického návrhu až po realizáciu. Polepy áut, svetelná reklama a veľkoformátová tlač.'
        let heroCtaLabel = 'Naše služby'

        // Stats
        let stat1Val = '20+'
        let stat1Label = 'Rokov na trhu'
        let stat2Val = '500+'
        let stat2Label = 'Realizovaných projektov'
        let stat3Val = '100%'
        let stat3Label = 'Spokojnosť klientov'
        let stat4Val = '24/7'
        let stat4Label = 'Podpora'

        // Services (CardGrid)
        let servicesTitle = 'Naše Služby'
        let servicesDesc = 'Ponúkame široké portfólio služieb pre vaše podnikanie.'
        let s1Title = 'Reklama'
        let s1Desc = 'Veľkoformátová tlač, polepy, svetelná reklama.'
        let s2Title = 'Technické Textílie'
        let s2Desc = 'Autoplachty, priemyselné závesy, stany.'
        let s3Title = 'Tienenie'
        let s3Desc = 'Pergoly, markízy, rolety.'

        // Partners (LogoGrid)
        let partnersTitle = 'Naši Partneri'

        // Testimonials
        let reviewsTitle = 'Čo hovoria naši klienti'
        let r1Content = 'S firmou Bamida spolupracujeme už roky a vždy sme boli maximálne spokojní. Profesionálny prístup a kvalitná práca.'
        let r1Author = 'Ján Novák'
        let r1Role = 'CEO, Firma s.r.o.'

        // FAQ
        let faqTitle = 'Často kladené otázky'
        let q1 = 'Ako dlho trvá realizácia polepu auta?'
        let a1 = 'Zvyčajne 1-2 dni v závislosti od náročnosti dizajnu.'
        let q2 = 'Poskytujete záruku na vaše produkty?'
        let a2 = 'Áno, na všetky naše produkty a služby poskytujeme štandardnú záruku.'

        if (locale === 'en') {
            title = 'Home'
            heroTitle = 'Quality Advertising for Your Business'
            heroSubtitle = 'Comprehensive solutions from graphic design to implementation. Car wrapping, illuminated advertising, and large format printing.'
            heroCtaLabel = 'Our Services'

            stat1Label = 'Years on Market'
            stat2Label = 'Completed Projects'
            stat3Label = 'Client Satisfaction'
            stat4Label = 'Support'

            servicesTitle = 'Our Services'
            servicesDesc = 'We offer a wide portfolio of services for your business.'
            s1Title = 'Advertising'
            s1Desc = 'Large format printing, car wrapping, illuminated advertising.'
            s2Title = 'Technical Textiles'
            s2Desc = 'Car tarpaulins, industrial curtains, tents.'
            s3Title = 'Shading'
            s3Desc = 'Pergolas, awnings, blinds.'

            partnersTitle = 'Our Partners'

            reviewsTitle = 'What Our Clients Say'
            r1Content = 'We have been working with Bamida for years and have always been extremely satisfied. Professional approach and quality work.'
            r1Author = 'John Doe'
            r1Role = 'CEO, Company Ltd.'

            faqTitle = 'Frequently Asked Questions'
            q1 = 'How long does car wrapping take?'
            a1 = 'Usually 1-2 days depending on the complexity of the design.'
            q2 = 'Do you offer a warranty on your products?'
            a2 = 'Yes, we provide a standard warranty on all our products and services.'
        } else if (locale === 'de') {
            title = 'Startseite'
            heroTitle = 'Qualitätswerbung für Ihr Unternehmen'
            heroSubtitle = 'Umfassende Lösungen von Grafikdesign bis zur Umsetzung. Fahrzeugbeschriftung, Lichtwerbung und Großformatdruck.'
            heroCtaLabel = 'Unsere Dienstleistungen'

            stat1Label = 'Jahre am Markt'
            stat2Label = 'Realisierte Projekte'
            stat3Label = 'Kundenzufriedenheit'
            stat4Label = 'Support'

            servicesTitle = 'Unsere Dienstleistungen'
            servicesDesc = 'Wir bieten ein breites Portfolio an Dienstleistungen für Ihr Unternehmen.'
            s1Title = 'Werbung'
            s1Desc = 'Großformatdruck, Fahrzeugbeschriftung, Lichtwerbung.'
            s2Title = 'Technische Textilien'
            s2Desc = 'LKW-Planen, Industrievorhänge, Zelte.'
            s3Title = 'Beschattung'
            s3Desc = 'Pergolen, Markisen, Jalousien.'

            partnersTitle = 'Unsere Partner'

            reviewsTitle = 'Was unsere Kunden sagen'
            r1Content = 'Wir arbeiten seit Jahren mit Bamida zusammen und waren immer äußerst zufrieden. Professioneller Ansatz und Qualitätsarbeit.'
            r1Author = 'Hans Müller'
            r1Role = 'CEO, Firma GmbH'

            faqTitle = 'Häufig gestellte Fragen'
            q1 = 'Wie lange dauert eine Fahrzeugbeschriftung?'
            a1 = 'In der Regel 1-2 Tage, abhängig von der Komplexität des Designs.'
            q2 = 'Bieten Sie eine Garantie auf Ihre Produkte?'
            a2 = 'Ja, wir bieten auf alle unsere Produkte und Dienstleistungen eine Standardgarantie.'
        }

        const homepageData: any = {
            title: title,
            slug: 'home',
            locale: locale,
            translationKey: 'home',
            layout: [
                {
                    blockType: 'heroModern',
                    title: heroTitle,
                    subtitle: heroSubtitle,
                    type: 'centered',
                    media: heroImageId,
                    cta: {
                        label: heroCtaLabel,
                        url: `/${locale}/#services`
                    }
                },
                {
                    blockType: 'stats',
                    items: [
                        { value: stat1Val, label: stat1Label },
                        { value: stat2Val, label: stat2Label },
                        { value: stat3Val, label: stat3Label },
                        { value: stat4Val, label: stat4Label },
                    ],
                    backgroundImage: heroImageId, // Reuse hero image for stats bg
                },
                {
                    blockType: 'cardGrid',
                    title: servicesTitle,
                    description: servicesDesc,
                    cards: [
                        {
                            title: s1Title,
                            description: s1Desc,
                            image: heroImageId, // Use valid ID
                            link: `/${locale}/reklama`,
                            linkText: 'Viac info'
                        },
                        {
                            title: s2Title,
                            description: s2Desc,
                            image: heroImageId, // Use valid ID
                            link: `/${locale}/technicke-textilie`,
                            linkText: 'Viac info'
                        },
                        {
                            title: s3Title,
                            description: s3Desc,
                            image: heroImageId, // Use valid ID
                            link: `/${locale}/tienenie`,
                            linkText: 'Viac info'
                        }
                    ]
                },
                {
                    blockType: 'logoGrid',
                    title: partnersTitle,
                    logos: [
                        { image: partnerLogoId, name: 'Partner 1' },
                        { image: partnerLogoId, name: 'Partner 2' },
                        { image: partnerLogoId, name: 'Partner 3' },
                        { image: partnerLogoId, name: 'Partner 4' },
                        { image: partnerLogoId, name: 'Partner 5' },
                        { image: partnerLogoId, name: 'Partner 6' },
                    ]
                },
                {
                    blockType: 'testimonials',
                    title: reviewsTitle,
                    reviews: [
                        {
                            content: r1Content,
                            author: r1Author,
                            role: r1Role,
                            rating: 5,
                            image: testimonialImageId
                        },
                        {
                            content: r1Content,
                            author: r1Author,
                            role: r1Role,
                            rating: 5,
                            image: testimonialImageId
                        },
                        {
                            content: r1Content,
                            author: r1Author,
                            role: r1Role,
                            rating: 5,
                            image: testimonialImageId
                        }
                    ]
                },
                {
                    blockType: 'faq',
                    title: faqTitle,
                    items: [
                        { question: q1, answer: a1 },
                        { question: q2, answer: a2 },
                    ]
                },
                {
                    blockType: 'galleryMasonry',
                    title: 'Galéria',
                    description: 'Ukážka našich najnovších prác.',
                    images: [
                        { image: galleryImageId1, category: 'exterior', caption: 'Project 1' },
                        { image: galleryImageId2, category: 'interior', caption: 'Project 2' },
                        { image: galleryImageId1, category: 'detail', caption: 'Project 3' },
                        { image: galleryImageId2, category: 'exterior', caption: 'Project 4' },
                    ]
                }
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

    console.log('Homepage V2 seeded successfully! 🚀')
    process.exit(0)
}

seedHomepageV2()
