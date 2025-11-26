#!/usr/bin/env tsx
/**
 * WordPress Export Script
 * 
 * This script exports all pages from bamida.sk WordPress site
 * and generates slug mappings for SK/EN/DE languages using AI translation
 */

import fs from 'fs/promises'
import path from 'path'
import { translateSlugEnhanced } from './slug-translations.js'

const WP_API_BASE = 'https://www.bamida.sk/wp-json/wp/v2'
const OUTPUT_DIR = path.join(process.cwd(), 'wordpress-export')

interface WordPressPage {
    id: number
    slug: string
    title: { rendered: string }
    content: { rendered: string }
    excerpt: { rendered: string }
    link: string
    modified: string
    parent: number
}

interface SlugMapping {
    wpId: number
    wpSlug: string
    skSlug: string
    enSlug: string
    deSlug: string
    title: string
    parent: number
}

/**
 * Detect language from WordPress URL
 */
function detectLanguage(url: string): 'sk' | 'en' | 'de' {
    if (url.includes('/en/')) return 'en'
    if (url.includes('/de/')) return 'de'
    return 'sk'
}

/**
 * Normalize slug - extract path from URL and remove language prefix
 */
function normalizeSlug(url: string): string {
    // Extract path from full URL
    const urlObj = new URL(url)
    let path = urlObj.pathname

    // Remove language prefix (/en/ or /de/)
    path = path.replace(/^\/(en|de)\//, '/')

    // Remove leading and trailing slashes
    path = path.replace(/^\//, '').replace(/\/$/, '')

    return path || 'home'  // Return 'home' for root path
}


/**
 * Fetch all pages from WordPress API
 */
async function fetchAllPages(): Promise<WordPressPage[]> {
    const pages: WordPressPage[] = []
    let page = 1
    let hasMore = true

    console.log('📥 Fetching pages from WordPress API...')

    while (hasMore) {
        try {
            const response = await fetch(
                `${WP_API_BASE}/pages?per_page=100&page=${page}`
            )

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`)
            }

            const data: WordPressPage[] = await response.json()

            if (data.length === 0) {
                hasMore = false
            } else {
                pages.push(...data)
                console.log(`  ✓ Fetched page ${page} (${data.length} pages)`)
                page++
            }
        } catch (error) {
            console.error(`❌ Error fetching page ${page}:`, error)
            hasMore = false
        }
    }

    console.log(`\n✅ Total pages fetched: ${pages.length}`)
    return pages
}

/**
 * Group pages by their SK/EN/DE versions
 */
function groupPagesByLanguage(pages: WordPressPage[]): Map<string, {
    sk?: WordPressPage
    en?: WordPressPage
    de?: WordPressPage
}> {
    const groups = new Map<string, {
        sk?: WordPressPage
        en?: WordPressPage
        de?: WordPressPage
    }>()

    for (const page of pages) {
        const lang = detectLanguage(page.link)
        const normalizedSlug = normalizeSlug(page.link)

        // Use normalized slug as grouping key
        const groupKey = normalizedSlug

        if (!groups.has(groupKey)) {
            groups.set(groupKey, {})
        }

        const group = groups.get(groupKey)!
        group[lang] = page
    }

    return groups
}

/**
 * Generate slug mappings for all pages
 */
function generateSlugMappings(
    pageGroups: Map<string, {
        sk?: WordPressPage
        en?: WordPressPage
        de?: WordPressPage
    }>
): SlugMapping[] {
    const mappings: SlugMapping[] = []

    console.log('\n🔄 Generating slug mappings...')

    for (const [baseSlug, group] of pageGroups.entries()) {
        // Prioritize SK version as source
        const sourcePage = group.sk || group.en || group.de
        if (!sourcePage) continue

        const skSlug = group.sk ? normalizeSlug(group.sk.link) : baseSlug
        const enSlug = group.en
            ? normalizeSlug(group.en.link)
            : translateSlugEnhanced(skSlug, 'en')
        const deSlug = group.de
            ? normalizeSlug(group.de.link)
            : translateSlugEnhanced(skSlug, 'de')

        mappings.push({
            wpId: sourcePage.id,
            wpSlug: sourcePage.slug,
            skSlug,
            enSlug,
            deSlug,
            title: sourcePage.title.rendered,
            parent: sourcePage.parent,
        })

        console.log(`  ✓ ${skSlug} → en: ${enSlug}, de: ${deSlug}`)
    }

    console.log(`\n✅ Generated ${mappings.length} slug mappings`)
    return mappings
}

/**
 * Export data to JSON and CSV files
 */
async function exportData(
    pages: WordPressPage[],
    mappings: SlugMapping[]
) {
    console.log('\n💾 Exporting data...')

    // Create output directory
    await fs.mkdir(OUTPUT_DIR, { recursive: true })

    // Export full pages JSON
    const pagesFile = path.join(OUTPUT_DIR, 'pages.json')
    await fs.writeFile(pagesFile, JSON.stringify(pages, null, 2))
    console.log(`  ✓ Saved: ${pagesFile}`)

    // Export slug mappings JSON
    const mappingsFile = path.join(OUTPUT_DIR, 'slug-mappings.json')
    await fs.writeFile(mappingsFile, JSON.stringify(mappings, null, 2))
    console.log(`  ✓ Saved: ${mappingsFile}`)

    // Export slug mappings CSV (for easy editing)
    const csvFile = path.join(OUTPUT_DIR, 'slug-mappings.csv')
    const csvHeader = 'WP_ID,WP_Slug,SK_Slug,EN_Slug,DE_Slug,Title,Parent\n'
    const csvRows = mappings.map(m =>
        `${m.wpId},"${m.wpSlug}","${m.skSlug}","${m.enSlug}","${m.deSlug}","${m.title}",${m.parent}`
    ).join('\n')
    await fs.writeFile(csvFile, csvHeader + csvRows)
    console.log(`  ✓ Saved: ${csvFile}`)

    console.log(`\n✅ Export complete! Files saved to: ${OUTPUT_DIR}`)
}

/**
 * Main execution
 */
async function main() {
    console.log('🚀 WordPress Export Script')
    console.log('='.repeat(50))

    try {
        // 1. Fetch all pages
        const pages = await fetchAllPages()

        // 2. Group by language
        const pageGroups = groupPagesByLanguage(pages)
        console.log(`\n📊 Found ${pageGroups.size} unique page groups`)

        // 3. Generate slug mappings
        const mappings = generateSlugMappings(pageGroups)

        // 4. Export data
        await exportData(pages, mappings)

        console.log('\n' + '='.repeat(50))
        console.log('✅ SUCCESS!')
        console.log('\n📝 Next steps:')
        console.log('1. Review slug-mappings.csv and update EN/DE slugs if needed')
        console.log('2. Run the migration script to import into Payload CMS')
    } catch (error) {
        console.error('\n❌ ERROR:', error)
        process.exit(1)
    }
}

main()
