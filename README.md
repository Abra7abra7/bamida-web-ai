# Bamida.sk - Modern Industrial E-commerce Platform

Moderná webová aplikácia pre Bamida.sk s AI chatbotom, 3D konfigurátorom a headless CMS.

## 🚀 Technológie

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Jazyk**: TypeScript
- **Styling**: Tailwind CSS 4, Shadcn/UI
- **CMS**: Payload CMS 3 (Headless)
- **Databáza**: PostgreSQL (Neon DB)
- **AI**: OpenAI GPT-4o, Vercel AI SDK
- **3D**: Three.js, React Three Fiber
- **Lokalizácia**: next-intl (SK, EN, DE)

## 📋 Predpoklady

- Node.js 20+
- npm alebo yarn
- Neon DB účet (alebo iný PostgreSQL provider)
- OpenAI API kľúč

## 🔧 Inštalácia

1. **Klonuj repozitár**
\`\`\`bash
git clone https://github.com/Abra7abra7/bamida-web-ai.git
cd bamida-web-ai
\`\`\`

2. **Nainštaluj závislosti**
\`\`\`bash
npm install
\`\`\`

3. **Nastav environment variables**
\`\`\`bash
cp .env.example .env
\`\`\`

Uprav \`.env\`:
\`\`\`env
DATABASE_URI=postgresql://user:password@host/database
PAYLOAD_SECRET=your-secret-key-min-32-chars
OPENAI_API_KEY=sk-...
\`\`\`

4. **Spusti development server**
\`\`\`bash
npm run dev
\`\`\`

Aplikácia beží na \`http://localhost:3000\`

## 📁 Štruktúra projektu

\`\`\`
bamida-web-ai/
├── app/
│   ├── [locale]/          # Lokalizované stránky (SK, EN, DE)
│   │   ├── page.tsx       # Homepage
│   │   ├── products/      # Produktový katalóg
│   │   ├── configurator/  # 3D konfigurátor
│   │   └── ...
│   ├── (payload)/         # Payload CMS admin
│   │   ├── admin/         # Admin panel
│   │   └── collections/   # CMS kolekcie
│   └── api/
│       └── chat/          # AI chatbot endpoint
├── components/
│   ├── ai/                # AI komponenty (ChatInterface)
│   ├── configurator/      # 3D konfigurátor
│   ├── layout/            # Header, Footer
│   └── ui/                # Shadcn/UI komponenty
├── lib/
│   ├── rag.ts             # RAG implementácia
│   └── utils.ts           # Utility funkcie
├── messages/              # Preklady (SK, EN, DE)
└── public/                # Statické súbory

\`\`\`

## 🎯 Hlavné funkcie

### 1. AI Chatbot (Bamida Expert)
- **Technológia**: OpenAI GPT-4o + RAG
- **Kontext**: Knowledge Base + Produktový katalóg
- **Jazyk**: Slovenčina
- **Umiestnenie**: Floating button na každej stránke

### 2. Knowledge Base (Firemné vedomosti)
- **Admin panel**: \`/admin\` → Knowledge Bases
- **Funkcia**: Majiteľ môže pridávať informácie o firme
- **Použitie**: AI chatbot automaticky používa tieto dáta

### 3. 3D Konfigurátor
- **Produkt**: Pergoly
- **Funkcie**: Zmena rozmerov, farby, materiálu
- **Technológia**: Three.js + React Three Fiber

### 4. Produktový katalóg
- **CMS**: Payload CMS (headless)
- **Kategórie**: Priemysel, Tienenie, Branding, Materiály
- **Funkcie**: Dynamické stránky, filtrovanie, vyhľadávanie

## 🔐 Správa obsahu

### Prístup do admin panelu
1. Choď na \`https://your-domain.com/admin\`
2. Prihlás sa (prvý používateľ sa vytvorí pri prvom spustení)

### Pridanie vedomostí do AI
1. Admin panel → **Knowledge Bases**
2. **Create New**
3. **Title**: Názov (napr. "Otváracie hodiny")
4. **Content**: Text, ktorý AI použije na odpoveď
5. **Save**

### Pridanie produktu
1. Admin panel → **Products**
2. **Create New**
3. Vyplň polia (názov, kategória, cena, obrázky...)
4. **Save**

## 🚀 Deployment (Vercel)

### 1. Priprav databázu
- Vytvor Neon DB projekt na [neon.tech](https://neon.tech)
- Skopíruj Connection String

### 2. Deploy na Vercel
\`\`\`bash
vercel
\`\`\`

### 3. Nastav Environment Variables
V Vercel dashboarde:
- \`DATABASE_URI\` = tvoj Neon DB connection string
- \`PAYLOAD_SECRET\` = náhodný 32+ znakový reťazec
- \`OPENAI_API_KEY\` = tvoj OpenAI kľúč

### 4. Redeploy
\`\`\`bash
vercel --prod
\`\`\`

## 📚 Dokumentácia

Detailná technická dokumentácia: [TECHNICAL.md](./TECHNICAL.md)

## 🛠️ Development

### Spustenie dev servera
\`\`\`bash
npm run dev
\`\`\`

### Build pre produkciu
\`\`\`bash
npm run build
\`\`\`

### Lint
\`\`\`bash
npm run lint
\`\`\`

### Generovanie TypeScript typov
\`\`\`bash
npm run generate:types
\`\`\`

## 🌍 Lokalizácia

Podporované jazyky:
- 🇸🇰 Slovenčina (predvolený)
- 🇬🇧 Angličtina
- 🇩🇪 Nemčina

Preklady: \`messages/sk.json\`, \`messages/en.json\`, \`messages/de.json\`

## 📝 Licencia

Proprietary - Bamida.sk

## 👥 Autor

Vytvoril: Marian Abrahám
Projekt: Bamida.sk Modernization
