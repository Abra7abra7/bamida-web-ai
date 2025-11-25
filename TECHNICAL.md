# Technická dokumentácia - Bamida.sk

## 📐 Architektúra systému

### High-Level Overview

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    Vercel (Hosting)                      │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Next.js 16 App (Turbopack)                │  │
│  │                                                    │  │
│  │  ┌──────────────┐  ┌──────────────┐              │  │
│  │  │   Frontend   │  │  API Routes  │              │  │
│  │  │  (React 19)  │  │              │              │  │
│  │  │              │  │  /api/chat   │              │  │
│  │  │  - Pages     │  │  /api/[...]  │              │  │
│  │  │  - Components│  │              │              │  │
│  │  └──────────────┘  └──────────────┘              │  │
│  │                                                    │  │
│  │  ┌──────────────────────────────────────────────┐ │  │
│  │  │        Payload CMS Admin (/admin)            │ │  │
│  │  │  - Users, Products, Media, Knowledge Base    │ │  │
│  │  └──────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ├──────────────┬──────────────┐
                           ▼              ▼              ▼
                    ┌─────────────┐ ┌──────────┐  ┌──────────┐
                    │  Neon DB    │ │ OpenAI   │  │  Vercel  │
                    │ (Postgres)  │ │ GPT-4o   │  │   CDN    │
                    │             │ │          │  │          │
                    │ - Users     │ │ - Chat   │  │ - Images │
                    │ - Products  │ │ - RAG    │  │ - Static │
                    │ - Knowledge │ │          │  │          │
                    └─────────────┘ └──────────┘  └──────────┘
\`\`\`

## 🗄️ Databázová schéma

### Collections (Payload CMS)

#### 1. Users
\`\`\`typescript
{
  id: string
  email: string (unique)
  password: string (hashed)
  createdAt: Date
  updatedAt: Date
}
\`\`\`

#### 2. Products
\`\`\`typescript
{
  id: string
  name: string
  slug: string (unique)
  category: 'priemysel' | 'tienenie' | 'branding' | 'materialy'
  description: RichText (Lexical JSON)
  price: number
  images: [
    {
      image: Relation<Media>
    }
  ]
  specifications: [
    {
      key: string
      value: string
    }
  ]
  features: [
    {
      feature: string
    }
  ]
  createdAt: Date
  updatedAt: Date
}
\`\`\`

#### 3. Media
\`\`\`typescript
{
  id: string
  alt: string
  url: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  createdAt: Date
  updatedAt: Date
}
\`\`\`

#### 4. Knowledge Base
\`\`\`typescript
{
  id: string
  title: string
  content: string (textarea)
  tags: string (optional)
  createdAt: Date
  updatedAt: Date
}
\`\`\`

## 🤖 AI Chatbot - RAG Implementation

### Workflow

\`\`\`
User Question
     │
     ▼
┌─────────────────────┐
│  ChatInterface.tsx  │  (Frontend)
│  - Zbiera správu    │
│  - Posiela na API   │
└─────────────────────┘
     │
     ▼ POST /api/chat
┌─────────────────────┐
│  app/api/chat/      │  (Backend)
│  route.ts           │
│                     │
│  1. getContext()    │ ──────┐
│  2. streamText()    │       │
└─────────────────────┘       │
                              │
                              ▼
                    ┌──────────────────┐
                    │   lib/rag.ts     │
                    │                  │
                    │ 1. Fetch KB      │
                    │ 2. Search Prods  │
                    │ 3. Build Context │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   Neon DB        │
                    │  (PostgreSQL)    │
                    └──────────────────┘
\`\`\`

### RAG Context Building

**Súbor**: \`lib/rag.ts\`

\`\`\`typescript
export async function getContext(query: string): Promise<string> {
  // 1. Načítaj všetky Knowledge Base záznamy
  const knowledgeBase = await payload.find({
    collection: 'knowledge-base',
    limit: 50,
  })
  
  // 2. Vyhľadaj relevantné produkty (LIKE query na názov)
  const products = await payload.find({
    collection: 'products',
    where: { name: { like: query } },
    limit: 3,
  })
  
  // 3. Skonštruuj kontext pre AI
  return \`
Knowledge Base:
\${kbContext}

Relevant Products:
\${productContext}
  \`.trim()
}
\`\`\`

**Poznámka**: Aktuálna implementácia používa jednoduchý full-text search. Pre produkciu s veľkým množstvom dát odporúčam migráciu na **pgvector** (vector embeddings).

## 🌐 Routing & Lokalizácia

### Middleware (proxy.ts)

\`\`\`typescript
// Detekcia jazyka z URL alebo Accept-Language header
// Redirect: / → /sk, /en, /de
\`\`\`

### URL Štruktúra

\`\`\`
/                          → redirect na /sk
/sk                        → Homepage (SK)
/en                        → Homepage (EN)
/de                        → Homepage (DE)
/sk/products               → Produktový katalóg
/sk/products/tienenie      → Kategória
/sk/products/tienenie/pergola-bioclimatic → Detail produktu
/sk/configurator           → 3D konfigurátor
/admin                     → Payload CMS admin
/api/chat                  → AI chatbot endpoint
\`\`\`

### Preklady

**Súbory**: \`messages/sk.json\`, \`messages/en.json\`, \`messages/de.json\`

\`\`\`json
{
  "Navigation": {
    "home": "Domov",
    "products": "Produkty",
    "about": "O nás"
  },
  "Chat": {
    "placeholder": "Napíšte správu...",
    "title": "Bamida Expert"
  }
}
\`\`\`

**Použitie**:
\`\`\`tsx
import { useTranslations } from 'next-intl'

const t = useTranslations('Navigation')
<Link href="/products">{t('products')}</Link>
\`\`\`

## 🎨 Styling System

### Tailwind CSS 4 + Shadcn/UI

**Konfigurácia**: \`app/globals.css\`

\`\`\`css
@theme {
  --color-background: 0 0% 100%;
  --color-foreground: 222.2 84% 4.9%;
  --color-primary: 222.2 47.4% 11.2%;
  --color-accent: 210 40% 96.1%;
  /* ... */
}
\`\`\`

### Komponenty (Shadcn/UI)

- \`components/ui/button.tsx\`
- \`components/ui/card.tsx\`
- \`components/ui/input.tsx\`
- atď.

**Použitie**:
\`\`\`tsx
import { Button } from '@/components/ui/button'

<Button variant="default" size="lg">
  Kúpiť
</Button>
\`\`\`

## 🔒 Bezpečnosť

### Environment Variables

**Nikdy necommituj**:
- \`.env\`
- \`.env.local\`
- \`.env.production\`

**Gitignored**: \`.gitignore\` obsahuje \`.env*\`

### Payload CMS Auth

- **Heslo**: Bcrypt hash (automaticky)
- **Session**: JWT token (httpOnly cookie)
- **Admin prístup**: Len autentifikovaní používatelia

### API Routes

- **CORS**: Automaticky spravované Next.js
- **Rate limiting**: Odporúčam pridať (napr. Vercel Edge Config)

## 📦 Build & Deployment

### Local Development

\`\`\`bash
npm run dev  # Port 3000
\`\`\`

### Production Build

\`\`\`bash
npm run build
npm run start
\`\`\`

### Vercel Deployment

1. **Pripoj GitHub repo**
2. **Nastav Environment Variables**:
   - \`DATABASE_URI\`
   - \`PAYLOAD_SECRET\`
   - \`OPENAI_API_KEY\`
3. **Deploy**: Automaticky pri push na \`main\`

### Environment Variables (Vercel)

\`\`\`
DATABASE_URI=postgresql://user:pass@host/db?sslmode=require
PAYLOAD_SECRET=min-32-character-random-string
OPENAI_API_KEY=sk-...
\`\`\`

## 🧪 Testing

### Manual Testing Checklist

- [ ] Homepage načítanie
- [ ] Produktový katalóg (všetky kategórie)
- [ ] Detail produktu
- [ ] 3D konfigurátor (zmena parametrov)
- [ ] AI chatbot (otázka + odpoveď)
- [ ] Admin panel (login, CRUD operácie)
- [ ] Knowledge Base (pridanie, chatbot použitie)
- [ ] Lokalizácia (prepínanie SK/EN/DE)

## 🚀 Performance Optimizations

### Implementované

- ✅ **Next.js Image Optimization**: Automatické WebP, lazy loading
- ✅ **Static Generation**: Homepage, produktové stránky
- ✅ **Turbopack**: Rýchlejší dev server
- ✅ **Edge Functions**: Middleware pre routing

### Odporúčania pre budúcnosť

- 🔄 **ISR (Incremental Static Regeneration)**: Pre produkty
- 🔄 **Redis Cache**: Pre Knowledge Base context
- 🔄 **CDN**: Pre statické assets (už Vercel CDN)
- 🔄 **pgvector**: Pre efektívnejší RAG

## 🐛 Troubleshooting

### Časté problémy

#### 1. "Module not found: @payloadcms/payload-cloud"
**Riešenie**: Tento modul je pre Payload Cloud hosting. Odstránený z projektu.

#### 2. "SQLITE_ERROR: no such table"
**Riešenie**: Migrácia na PostgreSQL (Neon DB) vyriešila tento problém.

#### 3. "Functions cannot be passed to Client Components"
**Riešenie**: Server Actions musia byť v samostatnom súbore s \`'use server'\`.

#### 4. Chatbot neodpovedá správne
**Kontrola**:
- Je \`OPENAI_API_KEY\` nastavený?
- Sú dáta v Knowledge Base?
- Skontroluj terminal logy (\`Error fetching context\`)

## 📞 Kontakt & Podpora

**Vývojár**: Marian Abrahám  
**Projekt**: Bamida.sk Modernization  
**GitHub**: https://github.com/Abra7abra7/bamida-web-ai

---

**Posledná aktualizácia**: 25.11.2025
