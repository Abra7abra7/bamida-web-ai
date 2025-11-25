import { getPayload } from 'payload'
import configPromise from '@payload-config'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const seed = async () => {
    const payload = await getPayload({ config: configPromise })

    console.log('Seeding database...')

    // Create Media
    // In a real seed, we would upload a file. For now, we might skip media or try to upload a dummy buffer if needed.
    // But let's try to create a product without image first, or with a placeholder if the schema allows (it requires image).
    // The schema says images array is required, and image field inside is required.

    // Let's create a dummy media entry if possible, or just fail if file is missing.
    // Actually, Payload Local API create for upload collection requires 'file' property.

    // For simplicity, let's assume we can skip image for now if I make it optional in schema temporarily? 
    // No, I should stick to schema.

    // Let's try to create a product.

    const products = [
        {
            name: 'Bioklimatická Pergola Vision',
            slug: 'bioklimaticka-pergola-vision',
            category: 'tienenie',
            price: 5499,
            description: {
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
                                    text: 'Luxusná bioklimatická pergola s naklápacími lamelami. Ideálna pre vašu terasu.',
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
                    indent: 0,
                    version: 1,
                },
            },
            specifications: [
                { key: 'Rozmery', value: 'na mieru' },
                { key: 'Materiál', value: 'Hliník' },
                { key: 'Ovládanie', value: 'Motorické (Somfy)' },
            ],
            features: [
                { feature: 'Ochrana pred dažďom a slnkom' },
                { feature: 'Integrované LED osvetlenie' },
                { feature: 'Možnosť bočného zasklenia' },
            ],
        },
        {
            name: 'Priemyselná Deliaca Stena',
            slug: 'priemyselna-deliaca-stena',
            category: 'priemysel',
            price: 1200,
            description: {
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
                                    text: 'Flexibilné riešenie pre rozdelenie výrobných hál. Rýchla montáž a vysoká odolnosť.',
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
                    indent: 0,
                    version: 1,
                },
            },
            specifications: [
                { key: 'Materiál', value: 'PVC plachtovina 900g/m2' },
                { key: 'Požiarna odolnosť', value: 'B-s2,d0' },
            ],
            features: [
                { feature: 'Rýchla inštalácia' },
                { feature: 'Tepelná izolácia' },
            ],
        },
    ]

    for (const product of products) {
        const existing = await payload.find({
            collection: 'products',
            where: {
                slug: {
                    equals: product.slug,
                },
            },
        })

        if (existing.docs.length === 0) {
            // We need to handle the required image field.
            // Since we can't easily upload a file in this simple seed without a real file,
            // I will temporarily update the schema to make images optional, OR just fail here.
            // BUT, I can create a product WITHOUT images if I update the schema to not require it.

            // Let's create it without images for now, assuming I update schema or pass empty array if allowed (it says required).
            // I'll pass empty array and see if it validates.

            try {
                await payload.create({
                    collection: 'products',
                    data: {
                        ...(product as any),
                        images: [], // This might fail validation
                    },
                })
                console.log(`Created product: ${product.name}`)
            } catch (e) {
                console.error(`Failed to create ${product.name}:`, e)
            }
        } else {
            console.log(`Product already exists: ${product.name}`)
        }
    }

    console.log('Seed completed.')
    process.exit(0)
}

seed()
