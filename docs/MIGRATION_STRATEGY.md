# WordPress to Payload CMS - Migration Strategy

## 📊 WordPress Content Analysis

### Total URLs: 65

#### By Category:
- **Services (`/sluzba/*`)**: 19 pages
  - Reklama, Grafika, Digitálna tlač, Sklenené produkty, Maľovaná reklama
  - Technické textílie, Autoplachty, Čiré fólie, Tienenie, Party stany, atď.
  
- **Products (`/produkt/`, `/cire-folie/*`)**: 15+ pages
  - Banéry, Samolepiace fólie, Grafosklá, Sklenené obrazy
  - PVC závesy, Ochranné sietoviny, Pergoly, ZIP systém
  
- **Special Pages**: 12 pages
  - EEA Grants (5 pages): `/eea-grants/*`
  - Prezentácia: `/prezentacia/` (SK), `/presentation/` (EN)
  - Miroslav Baran, Referencie, Kontakt, Blog
  
- **E-commerce**: 4 pages
  - Obchod, Košík, Kontrola objednávky, Môj účet
  
- **Legal**: 4 pages
  - Odstúpenie od zmluvy, Obchodné podmienky, GDPR, Formulár

#### By Language:
- **Slovak (SK)**: 60+ URLs (bez prefixu)
- **English (EN)**: 3 URLs (`/en/`, `/en/sluzba/reklama/`, `/presentation/`)
- **German (DE)**: 1 URL (`/de/`)

## 🎯 Migration Plan

### Phase 1: Payload Collections Setup ✅
**Estimated Time**: 1 hour

Collections to create:
1. **Pages** - All static/marketing pages
2. **Services** - `/sluzba/*` products
3. **Products** - `/produkt/*` items
4. **Posts** - Blog articles
5. **Gallery** - Image/video collections
6. **Legal** - Terms, Privacy, etc.

### Phase 2: WordPress Content Export 📥
**Estimated Time**: 2 hours

**Tools**: WordPress REST API
- Endpoint: `https://www.bamida.sk/wp-json/wp/v2/pages`
- Fetch all 65 pages
- Download all media attachments
- Export to JSON files for backup

**Script**: `scripts/export-wordpress.ts`
```bash
npm run export:wordpress
# Output: ./wordpress-export/
#   - pages.json
#   - posts.json
#   - media.json
```

### Phase 3: Media Download 🖼️
**Estimated Time**: 30 min

Download all media from WordPress:
- Images: `.jpg`, `.png`, `.webp`
- PDFs: Company presentations, catalogs
- Videos: `.mov` files from gallery

**Storage**: 
- Local: `public/uploads/` (for development)
- Production: Vercel Blob Storage (recommended)

### Phase 4: Content Conversion 🔄
**Estimated Time**: 2 hours

Convert WordPress HTML → Lexical JSON:
- Parse HTML from `content.rendered`
- Convert to Lexical Editor format
- Handle WordPress shortcodes (if any)
- Preserve media embeds, links, formatting

**Library**: `@payloadcms/richtext-lexical/html/converter`

### Phase 5: Data Import 📤
**Estimated Time**: 1 hour

Run migration script:
```bash
npm run migrate:wordpress
```

Process:
1. Upload media → Payload Media collection
2. Create Pages → Map URL slugs
3. Create Services → Category organization
4. Create Products → Product taxonomy
5. Verify all relations (media, categories)

### Phase 6: URL Routing 🌐
**Estimated Time**: 2 hours

Configure Next.js routing to match WordPress URLs:
- SK (default): `/sluzba/reklama/` → no prefix
- EN: `/en/sluzba/reklama/`
- DE: `/de/` → homepage only

**Special cases**:
- `/prezentacia/` (SK) → `/presentation/` (EN) different slugs!

### Phase 7: Verification ✅
**Estimated Time**: 2 hours

Test all migrated content:
- [ ] All 65 URLs accessible
- [ ] Images load correctly
- [ ] PDFs embedded properly
- [ ] Videos play in gallery
- [ ] Multi-language switching works
- [ ] SEO metadata preserved

**Tools**: Automated testing script

### Phase 8: Deployment 🚀
**Estimated Time**: 1 hour

1. Push to GitHub
2. Deploy to Vercel
3. Configure Neon DB
4. Run migration on production
5. Test live URLs

## 📋 URL Mapping Strategy

### Keep same URLs (SK):
```
WP: /sluzba/reklama/          → Next: /sluzba/reklama/
WP: /prezentacia/             → Next: /prezentacia/
WP: /eea-grants/aktuality-news/ → Next: /eea-grants/aktuality-news/
```

### Multi-language URLs:
```
WP: /en/sluzba/reklama/       → Next: /en/sluzba/reklama/
WP: /de/                      → Next: /de/
WP: /presentation/            → Next: /en/presentation/ (remap!)
```

### 301 Redirects needed:
- `/presentation/` → `/en/presentation/` (if keeping EN prefix)
- OR keep `/presentation/` as SK alternate slug

## 🔧 Technical Implementation

### 1. Payload Collections Schema

**Pages Collection**:
```typescript
{
  slug: 'sluzba/reklama',  // No leading slash
  locale: 'sk',
  title: 'Reklama',
  content: { /* Lexical JSON */ },
  category: 'services',
  seo: { /* metadata */ }
}
```

**Multi-language handling**:
- Option A: Separate documents with `locale` field
- Option B: Single document with `translations` array (relations)

**Recommendation**: Option A (simpler queries)

### 2. Dynamic Route Structure

```
app/
  [locale]/
    [slug]/          → /sk/sluzba/reklama/
      page.tsx
    [...slug]/       → /sk/eea-grants/aktuality-news/
      page.tsx
```

### 3. Migration Script Flow

```typescript
// 1. Fetch from WordPress
const pages = await fetch('https://www.bamida.sk/wp-json/wp/v2/pages?per_page=100')

// 2. For each page:
for (const wpPage of pages) {
  // 3. Detect locale from URL
  const locale = wpPage.link.includes('/en/') ? 'en' : 
                 wpPage.link.includes('/de/') ? 'de' : 'sk'
  
  // 4. Normalize slug
  const slug = normalizeSlug(wpPage.link, locale)
  
  // 5. Convert HTML → Lexical
  const content = await htmlToLexical(wpPage.content.rendered)
  
  // 6. Create in Payload
  await payload.create({
    collection: 'pages',
    data: { title, slug, locale, content, ... }
  })
}
```

## ⚠️ Potential Issues

### 1. WordPress Shortcodes
WordPress may use shortcodes: `[pdf-embedder url="..."]`
- **Solution**: Parse and convert to React components

### 2. Elementor Content
Some pages use Elementor (visual builder)
- **Issue**: Complex HTML structure
- **Solution**: Extract clean content or keep as HTML blocks

### 3. Missing Language Versions
Only 3 EN pages exist (most are SK only)
- **Decision needed**: Create empty placeholders or show "SK only"?

### 4. URL Conflicts
`/presentation/` vs `/en/presentation/`
- **Solution**: Choose one canonical URL, 301 redirect the other

## 📅 Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| Collections Setup | 1h | ⏳ Pending |
| WP Export | 2h | ⏳ Pending |
| Media Download | 30m | ⏳ Pending |
| Content Conversion | 2h | ⏳ Pending |
| Data Import | 1h | ⏳ Pending |
| URL Routing | 2h | ⏳ Pending |
| Verification | 2h | ⏳ Pending |
| Deployment | 1h | ⏳ Pending |
| **TOTAL** | **~11.5 hours** | |

## ✅ Next Steps

1. **User Decision**: Potvrďte tento plán
2. **Start Migration**: Spustiť `npm run migrate:wordpress`
3. **Review**: Skontrolovať Payload Admin
4. **Test**: Overiť všetky URL
5. **Deploy**: Push to production

---

**Questions?**
- Chcete zachovať `/presentation/` ako SK alternate slug alebo pridať `/en/` prefix?
- Mali by sme vytvoriť placeholdery pre chýbajúce EN/DE verzie?
- Preferujete local storage alebo Vercel Blob pre media?
