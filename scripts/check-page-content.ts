import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function checkPageContent() {
    const { getPayload } = await import('payload')
    const { default: config } = await import('../payload.config')
    const payload = await getPayload({ config })

    const page = await payload.find({
        collection: 'pages',
        where: {
            and: [
                { slug: { equals: 'deliace-steny' } },
                { locale: { equals: 'sk' } }
            ]
        },
        depth: 2,
    })

    if (page.docs.length > 0) {
        console.log('Found page:', page.docs[0].title)
        console.log('Layout blocks:', page.docs[0].layout?.map((b: any) => b.blockType))

        const features = page.docs[0].layout?.find((b: any) => b.blockType === 'features')
        if (features) {
            console.log('Features found:', JSON.stringify(features, null, 2))
        } else {
            console.log('Features block NOT found')
        }

        const gallery = page.docs[0].layout?.find((b: any) => b.blockType === 'gallery')
        if (gallery) {
            console.log('Gallery found:', JSON.stringify(gallery, null, 2))
        } else {
            console.log('Gallery block NOT found')
        }

    } else {
        console.log('Page not found')
    }

    process.exit(0)
}

checkPageContent()
