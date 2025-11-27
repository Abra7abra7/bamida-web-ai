import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function seedTechnickeTextilie() {
    console.log('Starting Technicke Textilie seed...')
    const { getPayload } = await import('payload')
    const { default: config } = await import('../payload.config')
    const payload = await getPayload({ config })

    const allMedia = await payload.find({ collection: 'media', limit: 100 })

    const findImage = (keywords: string[]) => {
        const found = allMedia.docs.find(doc => {
            const text = (doc.alt + ' ' + doc.filename).toLowerCase()
            return keywords.some(k => text.includes(k.toLowerCase()))
        })
        return found?.id || allMedia.docs[0]?.id
    }

    const findImages = (keywords: string[], count: number = 6) => {
        const found = allMedia.docs.filter(doc => {
            const text = (doc.alt + ' ' + doc.filename).toLowerCase()
            return keywords.some(k => text.includes(k.toLowerCase()))
        })
        if (found.length < count) {
            const remaining = count - found.length
            const others = allMedia.docs.filter(d => !found.includes(d)).slice(0, remaining)
            return [...found, ...others].map(doc => doc.id)
        }
        return found.slice(0, count).map(doc => doc.id)
    }

    const pages = [
        { key: 'technicke-textilie', sk: 'Technické textílie', en: 'Technical Textiles', de: 'Technische Textilien' },
        { key: 'technicke-textilie/autoplachty', sk: 'Autoplachty', en: 'Car Tarpaulins', de: 'LKW-Planen' },
        { key: 'technicke-textilie/priemysel', sk: 'Pre priemysel', en: 'For Industry', de: 'Für die Industrie' },
        { key: 'technicke-textilie/priemysel/deliace-steny', sk: 'Deliace steny', en: 'Partition Walls', de: 'Trennwände' },
        { key: 'technicke-textilie/priemysel/priemyselne-zavesy', sk: 'Priemyselné závesy z PVC plachiet', en: 'Industrial Curtains from PVC Tarpaulins', de: 'Industrievorhänge aus PVC-Planen' },
        { key: 'technicke-textilie/priemysel/lamelove-zavesy', sk: 'Lamelové PVC závesy', en: 'Strip PVC Curtains', de: 'Streifen-PVC-Vorhänge' },
        { key: 'technicke-textilie/priemysel/brany', sk: 'Brány z technických textílií', en: 'Gates from Technical Textiles', de: 'Tore aus technischen Textilien' },
        { key: 'technicke-textilie/polnohospodarstvo', sk: 'Pre poľnohospodárstvo', en: 'For Agriculture', de: 'Für die Landwirtschaft' },
        { key: 'technicke-textilie/polnohospodarstvo/ochranne-sietoviny', sk: 'Ochranné sieťoviny', en: 'Protective Mesh', de: 'Schutznetze' },
        { key: 'technicke-textilie/polnohospodarstvo/foliovnikova-folia', sk: 'Fóliovníková PP fólia', en: 'Greenhouse PP Foil', de: 'Gewächshaus-PP-Folie' },
        { key: 'technicke-textilie/stropne-pohlady', sk: 'Stropné pohľady', en: 'Ceiling Views', de: 'Deckenansichten' },
    ]

    const locales = ['sk', 'en', 'de']

    const descriptions: Record<string, Record<string, string>> = {
        'technicke-textilie': {
            sk: 'Zaoberáme sa výrobou technických textílií aj pre priemysel a poľnohospodárstvo, pričom využívame moderné technologické postupy a dlhoročné skúsenosti v oblasti spracovania špeciálnych materiálov. Naše technické riešenia nachádzajú uplatnenie v rôznych odvetviach – od ochrany výrobných hál až po estetické a funkčné úpravy interiérov.',
            en: 'We are engaged in the production of technical textiles also for industry and agriculture, using modern technological procedures and many years of experience in the field of processing special materials. Our technical solutions find application in various sectors – from the protection of production halls to aesthetic and functional interior modifications.',
            de: 'Wir beschäftigen uns mit der Herstellung von technischen Textilien auch für Industrie und Landwirtschaft, wobei wir moderne technologische Verfahren und langjährige Erfahrung im Bereich der Verarbeitung von Spezialmaterialien nutzen. Unsere technischen Lösungen finden in verschiedenen Branchen Anwendung – vom Schutz von Produktionshallen bis hin zu ästhetischen und funktionalen Innenraumgestaltungen.'
        },
        'technicke-textilie/autoplachty': {
            sk: 'Zabezpečujeme výrobu, montáž, servis aj opravy autoplachiet, vrátane predaja príslušenstva. Používame vysokokvalitné materiály a ponúkame aj potlač reklamy na mieru.',
            en: 'We provide production, assembly, service and repair of car tarpaulins, including the sale of accessories. We use high-quality materials and also offer custom advertising printing.',
            de: 'Wir bieten Produktion, Montage, Service und Reparatur von LKW-Planen, einschließlich des Verkaufs von Zubehör. Wir verwenden hochwertige Materialien und bieten auch individuellen Werbedruck an.'
        },
        'technicke-textilie/priemysel': {
            sk: 'Technické textílie predstavujú efektívne riešenie pre zlepšenie pracovných procesov v priemysle. Umožňujú úpravu a rozdelenie výrobných plôch, ako aj bezpečné uskladnenie materiálov. Svoje uplatnenie nachádzajú ako halové deliace steny, krycie plachty či ochranné závesy.',
            en: 'Technical textiles represent an effective solution for improving work processes in industry. They allow the modification and division of production areas, as well as the safe storage of materials. They find their application as hall partition walls, cover sheets or protective curtains.',
            de: 'Technische Textilien stellen eine effektive Lösung zur Verbesserung von Arbeitsprozessen in der Industrie dar. Sie ermöglichen die Anpassung und Aufteilung von Produktionsflächen sowie die sichere Lagerung von Materialien. Sie finden ihre Anwendung als Hallentrennwände, Abdeckplanen oder Schutzvorhänge.'
        },
        'technicke-textilie/polnohospodarstvo': {
            sk: 'Ponúkame praktické riešenia z technických textílií, ktoré pomáhajú chrániť úrodu, hospodárske zvieratá aj stroje pred nepriaznivým počasím. Naše textílie sú vhodné aj na prekrytie a rozdelenie priestorov v halách, skladoch alebo maštaliach.',
            en: 'We offer practical solutions from technical textiles that help protect crops, livestock and machinery from adverse weather. Our textiles are also suitable for covering and dividing spaces in halls, warehouses or stables.',
            de: 'Wir bieten praktische Lösungen aus technischen Textilien, die helfen, Ernten, Vieh und Maschinen vor widrigem Wetter zu schützen. Unsere Textilien eignen sich auch zum Abdecken und Unterteilen von Räumen in Hallen, Lagern oder Ställen.'
        },
        'technicke-textilie/priemysel/deliace-steny': {
            sk: 'Flexibilné deliace steny pre optimalizáciu priestoru v halách.',
            en: 'Flexible partition walls for space optimization in halls.',
            de: 'Flexible Trennwände zur Raumoptimierung in Hallen.'
        },
        'technicke-textilie/priemysel/priemyselne-zavesy': {
            sk: 'Odolné PVC závesy pre oddelenie pracovných zón.',
            en: 'Durable PVC curtains for separating work zones.',
            de: 'Langlebige PVC-Vorhänge zur Abtrennung von Arbeitsbereichen.'
        },
        'technicke-textilie/priemysel/lamelove-zavesy': {
            sk: 'Priehľadné lamelové závesy pre prechody a tepelnú izoláciu.',
            en: 'Transparent strip curtains for passages and thermal insulation.',
            de: 'Transparente Streifenvorhänge für Durchgänge und Wärmedämmung.'
        },
        'technicke-textilie/priemysel/brany': {
            sk: 'Rýchlobežné a rolovacie brány z technických textílií.',
            en: 'High-speed and rolling gates made of technical textiles.',
            de: 'Schnelllauf- und Rolltore aus technischen Textilien.'
        },
        'technicke-textilie/polnohospodarstvo/ochranne-sietoviny': {
            sk: 'Siete proti vetru, vtákom a krupobitiu.',
            en: 'Nets against wind, birds and hail.',
            de: 'Netze gegen Wind, Vögel und Hagel.'
        },
        'technicke-textilie/polnohospodarstvo/foliovnikova-folia': {
            sk: 'Kvalitné fólie pre fóliovníky a skleníky s dlhou životnosťou.',
            en: 'Quality foils for greenhouses with long lifespan.',
            de: 'Qualitätsfolien für Gewächshäuser mit langer Lebensdauer.'
        },
        'technicke-textilie/stropne-pohlady': {
            sk: 'Estetické a funkčné textilné podhľady pre interiéry.',
            en: 'Aesthetic and functional textile ceilings for interiors.',
            de: 'Ästhetische und funktionale Textildecken für Innenräume.'
        }
    }


    for (const page of pages) {
        for (const locale of locales) {
            let title = page[locale as keyof typeof page]
            let slug = ''

            // Recalculate slug for current locale
            // Recalculate slug for current locale
            if (page.key === 'technicke-textilie') slug = 'technicke-textilie'
            else if (page.key === 'technicke-textilie/autoplachty') slug = 'autoplachty'
            else if (page.key === 'technicke-textilie/priemysel') slug = 'pre-priemysel'
            else if (page.key === 'technicke-textilie/priemysel/deliace-steny') slug = 'deliace-steny'
            else if (page.key === 'technicke-textilie/priemysel/priemyselne-zavesy') slug = 'priemyselne-zavesy'
            else if (page.key === 'technicke-textilie/priemysel/lamelove-zavesy') slug = 'lamelove-zavesy'
            else if (page.key === 'technicke-textilie/priemysel/brany') slug = 'brany'
            else if (page.key === 'technicke-textilie/polnohospodarstvo') slug = 'polnohospodarstvo'
            else if (page.key === 'technicke-textilie/polnohospodarstvo/ochranne-sietoviny') slug = 'ochranne-sietoviny'
            else if (page.key === 'technicke-textilie/polnohospodarstvo/foliovnikova-folia') slug = 'foliovnikova-folia'
            else if (page.key === 'technicke-textilie/stropne-pohlady') slug = 'stropne-pohlady'

            if (locale === 'en') {
                if (slug === 'technicke-textilie') slug = 'technical-textiles'
                else if (slug === 'autoplachty') slug = 'car-tarpaulins'
                else if (slug === 'pre-priemysel') slug = 'for-industry'
                else if (slug === 'deliace-steny') slug = 'partition-walls'
                else if (slug === 'priemyselne-zavesy') slug = 'industrial-curtains'
                else if (slug === 'lamelove-zavesy') slug = 'strip-curtains'
                else if (slug === 'brany') slug = 'gates'
                else if (slug === 'polnohospodarstvo') slug = 'agriculture'
                else if (slug === 'ochranne-sietoviny') slug = 'protective-mesh'
                else if (slug === 'foliovnikova-folia') slug = 'greenhouse-foil'
                else if (slug === 'stropne-pohlady') slug = 'ceiling-views'
            } else if (locale === 'de') {
                if (slug === 'technicke-textilie') slug = 'technische-textilien'
                else if (slug === 'autoplachty') slug = 'lkw-planen'
                else if (slug === 'pre-priemysel') slug = 'fuer-industrie'
                else if (slug === 'deliace-steny') slug = 'trennwaende'
                else if (slug === 'priemyselne-zavesy') slug = 'industrievorhaenge'
                else if (slug === 'lamelove-zavesy') slug = 'streifenvorhaenge'
                else if (slug === 'brany') slug = 'tore'
                else if (slug === 'polnohospodarstvo') slug = 'landwirtschaft'
                else if (slug === 'ochranne-sietoviny') slug = 'schutznetze'
                else if (slug === 'foliovnikova-folia') slug = 'gewaechshausfolie'
                else if (slug === 'stropne-pohlady') slug = 'deckenansichten'
            }

            const description = descriptions[page.key]?.[locale] || `Content for ${title}`

            let imageKeywords: string[] = []
            if (page.key === 'technicke-textilie') imageKeywords = ['textil', 'textile']
            if (page.key === 'technicke-textilie/autoplachty') imageKeywords = ['autoplachty', 'tarpaulin', 'kamion']
            if (page.key === 'technicke-textilie/priemysel') imageKeywords = ['priemysel', 'industry', 'hala']
            if (page.key === 'technicke-textilie/priemysel/deliace-steny') imageKeywords = ['stena', 'wall', 'partition']
            if (page.key === 'technicke-textilie/priemysel/priemyselne-zavesy') imageKeywords = ['zaves', 'curtain', 'pvc']
            if (page.key === 'technicke-textilie/priemysel/lamelove-zavesy') imageKeywords = ['lamely', 'strip', 'curtain']
            if (page.key === 'technicke-textilie/priemysel/brany') imageKeywords = ['brana', 'gate', 'door']
            if (page.key === 'technicke-textilie/polnohospodarstvo') imageKeywords = ['polnohospodarstvo', 'agriculture', 'traktor']
            if (page.key === 'technicke-textilie/polnohospodarstvo/ochranne-sietoviny') imageKeywords = ['siet', 'mesh', 'net']
            if (page.key === 'technicke-textilie/polnohospodarstvo/foliovnikova-folia') imageKeywords = ['folia', 'greenhouse', 'foil']
            if (page.key === 'technicke-textilie/stropne-pohlady') imageKeywords = ['strop', 'ceiling']

            const pageImageId = findImage(imageKeywords)
            const galleryImages = findImages(imageKeywords, 6)

            const pageData: any = {
                title: title,
                slug: slug,
                locale: locale,
                translationKey: page.key,
                layout: [
                    {
                        blockType: 'heroModern',
                        title: title,
                        subtitle: description,
                        type: 'centered',
                        media: pageImageId ? { id: pageImageId } : null,
                        cta: {
                            label: locale === 'sk' ? 'Kontaktujte nás' : (locale === 'en' ? 'Contact Us' : 'Kontaktieren Sie uns'),
                            url: `/${locale}/#contact`
                        }
                    },
                    {
                        blockType: 'stats',
                        items: [
                            { value: '25+', label: locale === 'sk' ? 'Rokov skúseností' : (locale === 'en' ? 'Years Experience' : 'Jahre Erfahrung') },
                            { value: '1000+', label: locale === 'sk' ? 'Realizácií' : (locale === 'en' ? 'Projects' : 'Projekte') },
                            { value: '100%', label: locale === 'sk' ? 'Spokojnosť' : (locale === 'en' ? 'Satisfaction' : 'Zufriedenheit') },
                        ],
                        backgroundImage: pageImageId ? { id: pageImageId } : null,
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
                                                detail: 0,
                                                format: 0,
                                                mode: 'normal',
                                                style: '',
                                                text: description,
                                                version: 1,
                                            },
                                        ],
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0,
                                        textFormat: 0,
                                        version: 1,
                                    },
                                ],
                                direction: 'ltr',
                                format: '',
                                version: 1,
                            }
                        },
                    },
                    {
                        blockType: 'features',
                        title: locale === 'sk' ? 'Vlastnosti' : (locale === 'en' ? 'Features' : 'Eigenschaften'),
                        items: [
                            { title: locale === 'sk' ? 'Odolnosť' : (locale === 'en' ? 'Durability' : 'Haltbarkeit'), text: locale === 'sk' ? 'Odolné voči poveternostným vplyvom.' : (locale === 'en' ? 'Resistant to weather conditions.' : 'Wetterbeständig.'), icon: 'shield' },
                            { title: locale === 'sk' ? 'Flexibilita' : (locale === 'en' ? 'Flexibility' : 'Flexibilität'), text: locale === 'sk' ? 'Prispôsobíme sa vašim potrebám.' : (locale === 'en' ? 'We adapt to your needs.' : 'Wir passen uns Ihren Bedürfnissen an.'), icon: 'zap' },
                            { title: locale === 'sk' ? 'Dlhá životnosť' : (locale === 'en' ? 'Long Life' : 'Lange Lebensdauer'), text: locale === 'sk' ? 'Materiály s dlhou životnosťou.' : (locale === 'en' ? 'Long-lasting materials.' : 'Langlebige Materialien.'), icon: 'star' },
                        ]
                    },
                    {
                        blockType: 'cardGrid',
                        title: locale === 'sk' ? 'Kategórie' : (locale === 'en' ? 'Categories' : 'Kategorien'),
                        cards: [
                            { title: 'Autoplachty', description: locale === 'sk' ? 'Pre všetky typy vozidiel' : 'For all vehicle types', link: `/${locale}/technicke-textilie/autoplachty`, image: pageImageId ? { id: pageImageId } : null },
                            { title: 'Priemysel', description: locale === 'sk' ? 'Deliace steny a závesy' : 'Partition walls and curtains', link: `/${locale}/technicke-textilie/priemysel`, image: pageImageId ? { id: pageImageId } : null },
                            { title: 'Poľnohospodárstvo', description: locale === 'sk' ? 'Ochranné siete a plachty' : 'Protective nets and sheets', link: `/${locale}/technicke-textilie/polnohospodarstvo`, image: pageImageId ? { id: pageImageId } : null },
                        ]
                    },
                    {
                        blockType: 'faq',
                        title: 'FAQ',
                        items: [
                            { question: locale === 'sk' ? 'Aká je životnosť materiálov?' : 'What is the lifespan of materials?', answer: locale === 'sk' ? 'Životnosť závisí od typu materiálu a použitia, zvyčajne 5-10 rokov.' : 'Lifespan depends on material type and usage, usually 5-10 years.' },
                            { question: locale === 'sk' ? 'Robíte aj montáž?' : 'Do you also do installation?', answer: locale === 'sk' ? 'Áno, zabezpečujeme kompletnú montáž.' : 'Yes, we provide complete installation.' },
                        ]
                    },
                    {
                        blockType: 'galleryMasonry',
                        title: locale === 'sk' ? 'Ukážky realizácií' : (locale === 'en' ? 'Project Examples' : 'Projektbeispiele'),
                        description: locale === 'sk' ? 'Naše projekty' : (locale === 'en' ? 'Our Projects' : 'Unsere Projekte'),
                        images: galleryImages.map((id, index) => ({
                            image: id,
                            category: index % 2 === 0 ? 'exterior' : 'interior',
                            caption: `Project ${index + 1}`
                        })),
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


    console.log('Technicke Textilie seed done! 🚀')
    process.exit(0)
}

seedTechnickeTextilie()
