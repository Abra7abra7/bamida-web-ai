
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables FIRST
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const PAGES_JSON_PATH = path.resolve(__dirname, 'wordpress-export/pages.json')

async function migrateReferences() {
    console.log('Starting migration for Referencie page...')

    // Dynamic imports to ensure env vars are loaded
    const { getPayload } = await import('payload')
    const { default: config } = await import('../payload.config')

    // Initialize Payload
    const payload = await getPayload({ config })

    // Read pages.json
    const pagesData = JSON.parse(fs.readFileSync(PAGES_JSON_PATH, 'utf-8'))
    const referencesPage = pagesData.find((p: any) => p.slug === 'referencie')

    if (!referencesPage) {
        console.error('Referencie page not found in export!')
        process.exit(1)
    }

    console.log('Found Referencie page in export.')

    // Parse Elementor HTML content
    // We are looking for structure: Heading -> Gallery -> Heading -> Gallery
    // Elementor structure in JSON:
    // <h2 ...>Title</h2>
    // ...
    // <div ... data-widget_type="gallery.default"> ... <a href="image_url"> ... </a> ... </div>

    const content = referencesPage.content.rendered
    const blocks: any[] = []

    // Regex to find headings and galleries
    // This is a simplified parser specifically for this known structure
    const sections = content.split('elementor-widget-heading')

    // Skip the first part (before first heading)
    for (let i = 1; i < sections.length; i++) {
        const section = sections[i]

        // Extract Heading
        const headingMatch = section.match(/<h2[^>]*>(.*?)<\/h2>/)
        const title = headingMatch ? headingMatch[1] : 'Galéria'

        console.log(`Processing section: ${title}`)

        // Extract Images
        const imageMatches = [...section.matchAll(/href="(https:\/\/www\.bamida\.sk\/wp-content\/uploads\/[^"]+)"/g)]
        const imageUrls = imageMatches.map(m => m[1])

        // Filter out duplicate URLs (Elementor often has duplicates for lightbox/thumbnail)
        const uniqueUrls = [...new Set(imageUrls)]

        if (uniqueUrls.length > 0) {
            console.log(`Found ${uniqueUrls.length} images for section ${title}`)

            const imageIds = []

            for (const url of uniqueUrls) {
                // Download and upload image to Payload
                try {
                    // Check if media already exists by filename
                    const filename = path.basename(url)
                    const existingMedia = await payload.find({
                        collection: 'media',
                        where: {
                            filename: { equals: filename }
                        }
                    })

                    if (existingMedia.docs.length > 0) {
                        imageIds.push(existingMedia.docs[0].id)
                    } else {
                        // Download image
                        const response = await fetch(url)
                        if (!response.ok) throw new Error(`Failed to fetch ${url}`)
                        const arrayBuffer = await response.arrayBuffer()
                        const buffer = Buffer.from(arrayBuffer)

                        // Upload to Payload
                        const media = await payload.create({
                            collection: 'media',
                            data: {
                                alt: title,
                            },
                            file: {
                                data: buffer,
                                name: filename,
                                mimetype: response.headers.get('content-type') || 'image/jpeg',
                                size: buffer.length,
                            }
                        })
                        imageIds.push(media.id)
                        console.log(`Uploaded ${filename}`)
                    }
                } catch (e) {
                    console.error(`Error processing image ${url}:`, e)
                }
            }

            // Add Gallery Block
            if (imageIds.length > 0) {
                blocks.push({
                    blockType: 'gallery',
                    title: title,
                    images: imageIds, // Just pass the IDs
                    columns: '4'
                })
            }
        }
    }

    // Update the page in Payload
    // First find the page ID
    const pages = await payload.find({
        collection: 'pages',
        where: {
            slug: { equals: 'referencie' }
        }
    })

    if (pages.docs.length > 0) {
        const pageId = pages.docs[0].id
        await payload.update({
            collection: 'pages',
            id: pageId,
            data: {
                layout: blocks
            }
        })
        console.log('Successfully updated Referencie page with blocks!')
    } else {
        console.error('Referencie page not found in Payload!')
    }

    process.exit(0)
}

migrateReferences()
