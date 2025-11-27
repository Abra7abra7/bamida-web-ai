import { getPayload } from 'payload'
import config from '../payload.config'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })


async function checkSlugs() {
    console.log('Checking slugs...')
    const { getPayload } = await import('payload')
    const { default: config } = await import('../payload.config')
    const payload = await getPayload({ config })



    const locales = ['sk', 'en', 'de']

    for (const locale of locales) {
        console.log(`--- Locale: ${locale} ---`)
        const result = await payload.find({
            collection: 'pages',
            where: {
                and: [
                    { slug: { equals: 'home' } },
                    { locale: { equals: locale } }
                ]
            },
        })

        if (result.docs.length > 0) {
            result.docs.forEach(doc => {
                console.log(`Found page: ${doc.title} (ID: ${doc.id})`)
                console.log(`Slug: ${doc.slug}`)
                console.log(`Locale: ${doc.locale}`)
                // Check Hero Title to verify content
                const heroBlock = doc.layout?.find((b: any) => b.blockType === 'hero')
                if (heroBlock && 'title' in heroBlock) {
                    console.log(`Hero Title: ${heroBlock.title}`)
                }
            })
        } else {
            console.log('No pages found.')
        }
    }




    process.exit(0)
}

checkSlugs()
