import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function checkMedia() {
    const { getPayload } = await import('payload')
    const { default: config } = await import('../payload.config')
    const payload = await getPayload({ config })

    const media = await payload.find({
        collection: 'media',
        limit: 100,
    })

    console.log(`Found ${media.totalDocs} media items:`)
    media.docs.forEach(doc => {
        console.log(`- ID: ${doc.id}, Alt: ${doc.alt}, Filename: ${doc.filename}`)
    })

    process.exit(0)
}

checkMedia()
