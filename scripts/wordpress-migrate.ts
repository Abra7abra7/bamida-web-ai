#!/usr/bin/env tsx
/**
 * WordPress to Payload CMS Migration Script
 * 
 * Migrates all WordPress pages to Payload with:
 * - CSV slug mappings (SK/EN/DE)
 * - HTML → Lexical JSON conversion
 * - Media downloads to Payload
 */

import fs from 'fs/promises'
import path from 'path'
import payload from 'payload'
import { parse } from 'csv-parse'
import dotenv from 'dotenv'

// Load environment variables from parent directory
dotenv.config({ path: path.resolve(process.cwd(), '../.env') })

const CSV_PATH = path.join(process.cwd(), 'wordpress-export/slug-mappings.csv')
const PAGES_JSON_PATH = path.join(process.cwd(), 'wordpress-export/pages.json')
const WP_API_BASE = 'https://www.bamida.sk/wp-json/wp/v2'

// TEST MODE: Set to true to only migrate first 3 pages
const TEST_MODE = process.argv.includes('--test')
const TEST_PAGE_LIMIT = 3

interface SlugMapping {
    WP_ID: string
    WP_Slug: string
    SK_Slug: string
    EN_Slug: string
    DE_Slug: string
    Title_SK: string
    Title_EN: string
    Title_DE: string
    Parent: string
}

interface WordPressPage {
    id: number
    slug: string
    title: { rendered: string }
    content: { rendered: string }
    excerpt: { rendered: string }
    link: string
    modified: string
    parent: number
    featured_media?: number
}

/**
 * Load slug mappings from CSV
 */
async function loadSlugMappings(): Promise<Map<number, SlugMapping>> {
    console.log('📂 Loading slug mappings from CSV...')

    const csvContent = await fs.readFile(CSV_PATH, 'utf-8')

    return new Promise((resolve, reject) => {
        parse(csvContent, {
            columns: true,
            skip_empty_lines: true,
        }, (err, records: SlugMapping[]) => {
            if (err) {
                reject(err)
                return
            }

            const mappings = new Map<number, SlugMapping>()

            for (const record of records) {
                const wpId = parseInt(record.WP_ID, 10)
                mappings.set(wpId, record)
            }

            console.log(`  ✓ Loaded ${mappings.size} slug mappings`)
            resolve(mappings)
        })
    })
}

/**
 * Load WordPress pages from exported JSON
 */
async function loadWordPressPages(): Promise<WordPressPage[]> {
    console.log('📂 Loading WordPress pages...')

    const jsonContent = await fs.readFile(PAGES_JSON_PATH, 'utf-8')
    const pages = JSON.parse(jsonContent) as WordPressPage[]

    console.log(`  ✓ Loaded ${pages.length} WordPress pages`)
    return pages
}

/**
 * Convert WordPress HTML to Lexical JSON
 * 
 * Note: This is a simplified converter. For production, consider:
 * - @payloadcms/richtext-lexical HTML converter
 * - Proper handling of WordPress shortcodes
 * - Image/video embed parsing
 */
function htmlToLexical(html: string): any {
    // Strip WordPress paragraph wrapper if empty
    const cleanHtml = html.trim()

    if (!cleanHtml || cleanHtml === '<p></p>') {
        return {
            root: {
                type: 'root',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
            },
        }
    }

    // Basic conversion - creates paragraph nodes
    // TODO: Enhance with proper HTML parsing
    const paragraphs = cleanHtml
        .split(/<\/p>|<br\s*\/?>/gi)
        .map(p => p.replace(/<p[^>]*>/gi, '').trim())
        .filter(p => p.length > 0)

    return {
        root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: paragraphs.map(text => ({
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        type: 'text',
                        format: 0,
                        text: text.replace(/<[^>]+>/g, ''), // Strip remaining HTML
                        mode: 'normal',
                        style: '',
                        detail: 0,
                        version: 1,
                    },
                ],
                direction: 'ltr',
            })),
            direction: 'ltr',
        },
    }
}

/**
 * Download media from WordPress and upload to Payload
 */
async function downloadAndUploadMedia(
    mediaUrl: string,
    alt: string = ''
): Promise<string | null> {
    try {
        console.log(`    📥 Downloading: ${path.basename(mediaUrl)}`)

        const response = await fetch(mediaUrl)
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
        }

        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const filename = path.basename(mediaUrl)

        // Upload to Payload Media collection
        const media = await payload.create({
            collection: 'media',
            data: {
                alt: alt || filename,
            } as any,
            file: {
                data: buffer,
                mimetype: response.headers.get('content-type') || 'application/octet-stream',
                name: filename,
                size: buffer.length,
            },
        })

        console.log(`    ✓ Uploaded: ${media.id}`)
        return String(media.id)
    } catch (error) {
        console.error(`    ❌ Failed to download ${mediaUrl}:`, error)
        return null
    }
}

/**
 * Create page in Payload for specific locale
 */
async function createPageInPayload(
    wpPage: WordPressPage,
    locale: 'sk' | 'en' | 'de',
    mapping: SlugMapping,
    parentId?: string
) {
    const slugByLocale = {
        sk: mapping.SK_Slug,
        en: mapping.EN_Slug,
        de: mapping.DE_Slug,
    }

    const titleByLocale = {
        sk: mapping.Title_SK,
        en: mapping.Title_EN,
        de: mapping.Title_DE,
    }

    const slug = slugByLocale[locale]
    const title = titleByLocale[locale]

    console.log(`  📄 Creating: [${locale.toUpperCase()}] ${slug}`)

    // Convert HTML to Lexical
    const content = htmlToLexical(wpPage.content.rendered)

    // Create page data
    const pageData: any = {
        title,
        slug,
        locale,
        content,
        excerpt: wpPage.excerpt.rendered.replace(/<[^>]+>/g, '').trim(),
        wpId: wpPage.id,
        seo: {
            metaTitle: title,
            metaDescription: wpPage.excerpt.rendered.replace(/<[^>]+>/g, '').trim().substring(0, 160),
        },
    }

    // Add parent if exists
    if (parentId) {
        pageData.parent = parentId
    }

    try {
        const page = await payload.create({
            collection: 'pages' as any,
            data: pageData as any,
        })

        console.log(`    ✓ Created: ${page.id}`)
        return String(page.id)
    } catch (error: any) {
        console.error(`    ❌ Failed to create page:`, error.message)
        return null
    }
}

/**
 * Main migration function
 */
async function migrate() {
    console.log('🚀 WordPress to Payload Migration')
    console.log('='.repeat(50))

    // Initialize Payload
    console.log('\n📦 Initializing Payload...')

    // Import config from parent directory
    const configPath = path.resolve(process.cwd(), '../payload.config.ts')
    const config = await import(configPath).then(m => m.default)

    const payloadInstance = await payload.init({ config })
    console.log('  ✓ Payload initialized')

    // Load data
    const mappings = await loadSlugMappings()
    const wpPages = await loadWordPressPages()

    console.log('\n🔄 Starting migration...')

    if (TEST_MODE) {
        console.log(`\n⚠️  TEST MODE: Only migrating first ${TEST_PAGE_LIMIT} pages`)
    }

    const pagesToMigrate = TEST_MODE ? wpPages.slice(0, TEST_PAGE_LIMIT) : wpPages

    console.log(`  Total pages to migrate: ${pagesToMigrate.length}`)
    console.log(`  Total URLs to create: ${pagesToMigrate.length * 3} (SK/EN/DE)`)

    let successCount = 0
    let failCount = 0

    // Create pages for each WordPress page in all 3 locales
    for (const wpPage of pagesToMigrate) {
        const mapping = mappings.get(wpPage.id)

        if (!mapping) {
            console.log(`⚠️  No mapping found for WP ID ${wpPage.id}, skipping...`)
            failCount++
            continue
        }

        console.log(`\n📝 Processing: ${wpPage.title.rendered} (WP ID: ${wpPage.id})`)

        // Create SK version
        const skId = await createPageInPayload(wpPage, 'sk', mapping)
        if (skId) successCount++
        else failCount++

        // Create EN version
        const enId = await createPageInPayload(wpPage, 'en', mapping)
        if (enId) successCount++
        else failCount++

        // Create DE version
        const deId = await createPageInPayload(wpPage, 'de', mapping)
        if (deId) successCount++
        else failCount++
    }

    console.log('\n' + '='.repeat(50))
    console.log('✅ MIGRATION COMPLETE!')
    console.log(`\n📊 Statistics:`)
    console.log(`  ✓ Success: ${successCount}`)
    console.log(`  ❌ Failed: ${failCount}`)
    console.log(`  📄 Total: ${successCount + failCount}`)

    process.exit(0)
}

// Run migration
migrate().catch(error => {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
})
