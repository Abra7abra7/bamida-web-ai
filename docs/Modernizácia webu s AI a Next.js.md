

# **Strategický plán digitálnej transformácie: Modernizácia Bamida.sk s využitím Next.js 15+ a integrovanej umelej inteligencie**

## **1\. Exekutívny súhrn a strategická vízia**

Súčasné prostredie priemyselnej výroby a e-commerce prechádza fundamentálnou zmenou, ktorá sa posúva od statických katalógov k dynamickým, inteligentným platformám. Pre spoločnosť **Bamida s.r.o.**, etablovaného lídra v oblasti technických textílií, veľkoformátovej reklamy a tieniacej techniky na slovenskom trhu 1, predstavuje táto zmena príležitosť nielen na vizuálnu modernizáciu, ale na celkovú rekonfiguráciu spôsobu, akým interaguje so zákazníkmi. Tradičné obchodné modely v tomto sektore, ktoré sa spoliehajú na manuálne spracovanie dopytov a osobnú konzultáciu pre každý jeden produkt, narážajú na limity škálovateľnosti. Digitálna transformácia, ktorú navrhujeme v tomto reporte, cieli na odstránenie týchto úzkych hrdiel prostredníctvom nasadenia najmodernejších webových technológií a aplikovanej umelej inteligencie.

Cieľom tejto správy je navrhnúť komplexnú stratégiu prechodu webovej platformy bamida.sk na architektúru postavenú na frameworku **Next.js 15+**. Tento prechod nie je samoúčelný; je nevyhnutný pre dosiahnutie výkonu, ktorý vyžadujú moderné SEO štandardy a očakávania používateľov. Súčasná webová prezentácia, hoci funkčná, pôsobí ako pasívny informačný kanál, ktorý nedokáže aktívne kvalifikovať leady ani poskytovať pokročilé vizualizácie produktov, ktoré sú v segmente tienenia a architektúry čoraz bežnejšie.3

Navrhovaná stratégia sa opiera o tri kľúčové piliere. Prvým je **technologická robustnosť**, ktorú zabezpečí Next.js 15 s využitím React Server Components (RSC) a Server Actions, čo umožní bleskové načítanie stránok aj pri náročnom obsahu a zabezpečí bezpečnú manipuláciu s dátami. Druhým pilierom je **dizajnová revolúcia**, ktorá zjednotí vizuálnu identitu pre dva odlišné svety Bamidy – drsný priemyselný sektor a luxusný rezidenčný sektor – do koherentného dizajnového jazyka inšpirovaného "Industrial Lifestyle" estetikou. Tretím a najinovatívnejším pilierom je **integrácia umelej inteligencie**, ktorá transformuje web na aktívneho obchodného zástupcu. Navrhujeme nasadenie agentov na báze Retrieval-Augmented Generation (RAG) pre automatickú kvalifikáciu dopytov a 3D konfigurátorov, ktoré zákazníkom umožnia vizualizovať produkty v reálnom čase.

Táto transformácia je navrhnutá tak, aby reflektovala špecifické potreby Bamidy, ktorá obsluhuje široké spektrum klientov od nadnárodných korporácií ako Heineken a Pepsi až po individuálnych majiteľov domov.1 Výsledná platforma nebude len digitálnym katalógom, ale sofistikovaným nástrojom na generovanie tržieb, ktorý posilní pozíciu Bamidy ako technologického inovátora v regióne strednej Európy.

---

## **2\. Hĺbková analýza súčasného stavu Bamida.sk**

Predtým, než je možné definovať budúci stav, je nevyhnutné detailne porozumieť východiskovej situácii. Analýza súčasného webu bamida.sk odhaľuje silné základy v oblasti obsahu a dôveryhodnosti, ale zároveň identifikuje kritické technické a UX dlhy, ktoré brzdia rast.

### **2.1. Architektonické a technické obmedzenia**

Súčasná infraštruktúra webu vykazuje znaky zastaraného prístupu k tvorbe webových stránok. Funguje primárne ako statická brožúra, čo je model, ktorý bol efektívny v minulej dekáde, ale v súčasnosti nedokáže konkurovať dynamickým aplikáciám.

Primárnym problémom je **spôsob doručovania obsahu**. Web pravdepodobne beží na staršej verzii CMS (pravdepodobne WordPress alebo proprietárny PHP systém), čo sa prejavuje nutnosťou plného načítania stránky pri každom prechode medzi sekciami.2 Tento "full page reload" narúša plynulosť používateľského zážitku, zvyšuje kognitívnu záťaž a, čo je kritické, negatívne vplýva na metriku Core Web Vitals, ktorú Google používa ako hodnotiaci faktor. Pre používateľa na mobilnom zariadení v teréne – napríklad stavbyvedúceho hľadajúceho špecifikácie pre "autoplachty" – to znamená zbytočné čakanie a spotrebu dát.

Ďalším významným nedostatkom je **absencia štruktúrovaných dát**. Hoci web obsahuje rozsiahle zoznamy produktov od "Deliacich stien" až po "Atypické prekrytia" 1, tieto informácie sú v kóde reprezentované len ako netypovaný HTML text. Vyhľadávače ako Google tak nedokážu efektívne "pochopiť" vzťahy medzi produktmi, cenami a parametrami, čo znemožňuje využitie pokročilých funkcií vo výsledkoch vyhľadávania (Rich Snippets). To priamo znižuje viditeľnosť Bamidy v organickom vyhľadávaní v porovnaní s konkurenciou, ktorá môže využívať schémy Product alebo Offer.

Navigácia webu taktiež trpí **hlbokým zanorovaním bez kontextu**. Používateľ, ktorý hľadá špecifický produkt ako "Číre fólie – zip systém" 2, sa musí preklikať cez viacero úrovní menu bez možnosti využiť prediktívne vyhľadávanie alebo filtrovanie. V modernom e-commerce je štandardom fazetové vyhľadávanie (napr. filtrovanie podľa použitia, materiálu, ceny), ktoré na súčasnom webe úplne absentuje.

### **2.2. Nedostatky v používateľskej skúsenosti (UX) a dizajne**

Dizajn súčasného webu odráža mentalitu orientovanú na ponuku ("máme toto") namiesto mentality orientovanej na dopyt ("riešime váš problém"). Tento prístup vytvára trecie plochy v konverznom lieviku.

**Konverzný lievik** je v súčasnosti príliš strmý a binárny. Hlavnou výzvou k akcii (CTA) je generické "Kontaktujte nás" alebo "Zavolať".1 Chýbajú medzikroky, ktoré by umožnili používateľom s nižšou mierou okamžitého záujmu (top-of-funnel) zapojiť sa do interakcie. Neexistuje možnosť stiahnuť si produktový katalóg výmenou za email, vykonať rýchlu kalkuláciu ceny alebo si vizualizovať produkt. To núti používateľa buď k okamžitému záväzku (telefonát), alebo k odchodu zo stránky. Pre B2B segment, kde rozhodovací proces trvá dlhšie, je absencia týchto "mäkkých" konverzií kritickou chybou.

Vizuálna stránka webu, hoci čistá, neodráža **prémiovú kvalitu**, ktorú Bamida deklaruje spoluprácou s partnermi ako Heineken, Mattoni či Pepsi.1 Typografia a rozloženie prvkov sú funkčné, ale chýba im estetická nadstavba, ktorá by predávala drahšie produkty, ako sú bioklimatické pergoly. V segmente "Tienenie" je vizuálna emócia kľúčová – zákazník nekupuje len hliníkovú konštrukciu, ale životný štýl. Súčasný dizajn nedokáže túto emóciu efektívne sprostredkovať.

**Mobilná responzivita** je ďalšou oblasťou, ktorá vyžaduje pozornosť. Priemyselní nákupcovia aj majitelia domov čoraz častejšie využívajú smartfóny na prvotný prieskum. Súčasné husté bloky textu a malé dotykové plochy v navigačnom menu sťažujú ovládanie na dotykových obrazovkách. Navigácia v komplexných kategóriách ako "Technické textílie pre priemysel" 1 sa na mobile stáva frustrujúcou, čo zvyšuje "bounce rate" (mieru okamžitých odchodov).

### **2.3. Analýza obsahu a SEO stratégie**

Súčasná obsahová stratégia sa javí ako pozostatok starších SEO praktík zameraných na hustotu kľúčových slov.

Analýza textov odhaľuje prítomnosť **keyword stuffing**, kde sú kľúčové slová ako "Polepy exteriér", "Svetelná reklama" a "Autoplachty" uvádzané v tesnej blízkosti bez dostatočného sémantického kontextu.1 Moderné algoritmy vyhľadávačov (ako Google BERT alebo MUM) penalizujú takýto prístup a uprednostňujú obsah, ktorý je užitočný a kontextuálne bohatý. Namiesto zoznamu kľúčových slov by mal web ponúkať odpovede na otázky, ktoré používatelia reálne kladú.

Chýba tu tiež **edukačný lievik**. Pri komplexných produktoch, ako sú "Priemyselné závesy" alebo "Lamelové PVC závesy" 1, web neposkytuje dostatočné informácie o tom, ako si vybrať správny typ (napríklad podľa teplotného rozsahu, priehľadnosti alebo odolnosti voči ohňu). To presúva bremeno edukácie na obchodné oddelenie, ktoré musí odpovedať na opakujúce sa základné otázky, čím sa znižuje ich efektivita pri uzatváraní obchodov.

---

## **3\. Stratégia architektúry: Next.js 15+ a Headless Composable Stack**

Na dosiahnutie cieľov modernizácie a prípravu pôdy pre implementáciu AI je nevyhnutný prechod na modernú, kompozitnú architektúru. Ako základný kameň navrhujeme framework **Next.js 15 (App Router)**. Táto voľba nie je náhodná; Next.js predstavuje v súčasnosti zlatý štandard pre výkonné webové aplikácie a ponúka natívnu integráciu s nástrojmi potrebnými pre AI a 3D vizualizáciu.

### **3.1. Prečo Next.js 15 pre priemyselný e-commerce?**

Next.js 15 prináša niekoľko paradigmatických zmien, ktoré sú pre projekt Bamida kritické.4

#### **3.1.1. React Server Components (RSC)**

Bamida ponúka produkty s tisíckami potenciálnych variantov (rozmery x materiály x farby). V tradičnej React aplikácii by sa všetok JavaScript potrebný na vykreslenie týchto variantov posielal do prehliadača používateľa, čo by viedlo k pomalému načítaniu a vysokej spotrebe pamäte.  
S využitím React Server Components (RSC) sa ťažká práca – vykresľovanie popisov produktov, technických tabuliek a spracovanie logiky – deje na serveri. Klient (prehliadač) dostáva len výsledné HTML a minimálne množstvo JavaScriptu potrebného pre interaktivitu. To je kľúčové pre používateľov na pomalších sieťach, napríklad v priemyselných zónach alebo na staveniskách, kde potrebujú rýchly prístup k informáciám o "deliacich stenách" bez čakania na načítanie masívneho kódu.

#### **3.1.2. Partial Prerendering (PPR)**

Web Bamidy bude kombinovať statický obsah (O nás, základné popisy produktov) s dynamickým obsahom (aktuálna dostupnosť, cenové odhady generované AI).  
Technológia Partial Prerendering (PPR) umožňuje predrenderovať statickú "škrupinu" stránky (napríklad hlavičku, pätku a obrázok produktu), zatiaľ čo dynamické časti (napríklad personalizovaná cena alebo odporúčanie AI agenta) sa "streamujú" zo servera paralelne.4 Používateľ tak vidí obsah okamžite, čo výrazne zlepšuje vnímanú rýchlosť webu (Perceived Performance) a znižuje pravdepodobnosť odchodu.

#### **3.1.3. Server Actions pre generovanie leadov**

Next.js 15 zavádza **Server Actions**, ktoré umožňujú spracovávať formuláre (napr. "Žiadosť o cenovú ponuku") priamo na serveri bez nutnosti vytvárať separátne API endpointy. To zjednodušuje kód a zvyšuje bezpečnosť. Dáta z formulárov môžu byť validované (napríklad pomocou knižnice Zod) a sanitizované predtým, než sa dotknú databázy alebo CRM systému, čím sa eliminuje riziko útokov typu injection. Pre spoločnosť pracujúcu s B2B klientmi je bezpečnosť dát prioritou.

### **3.2. Headless Content Management System (CMS)**

Keďže Next.js slúži "len" ako prezentačná vrstva (frontend), Bamida potrebuje robustný backend na správu komplexných produktových dát. Tradičné riešenia tu nestačia; potrebujeme systém, ktorý poskytuje dáta v štruktúrovanej forme pre web aj pre AI agentov.

#### **3.2.1. Odporúčanie: Payload CMS (Code-First prístup)**

Na základe porovnania dostupných riešení 5 odporúčame Payload CMS. Na rozdiel od systémov ako Strapi, ktoré sa spoliehajú na konfiguráciu cez grafické rozhranie, Payload je "code-first". To znamená, že dátová schéma sa definuje priamo v kóde (TypeScript).  
Tento prístup má obrovskú výhodu pre integráciu AI. Ak pridáme do definície produktu pole požiarnaOdolnosť, táto zmena sa automaticky a typovo bezpečne prejaví v celej aplikácii – od administrácie cez frontend až po vedomostnú bázu AI agenta. Payload navyše natívne podporuje lokalizáciu, čo je nevyhnutné pre správu slovenskej, anglickej a nemeckej verzie webu 8, a ponúka moderný editor, ktorý zjednoduší prácu marketingovému tímu.  
Porovnanie Payload CMS vs. Strapi pre potreby Bamidy:

| Funkcia | Payload CMS | Strapi | Výhoda pre Bamidu |
| :---- | :---- | :---- | :---- |
| **Definícia schémy** | Code-first (TypeScript) | GUI / JSON | Payload: Rýchlejšia iterácia a typová bezpečnosť pre AI. |
| **Databáza** | MongoDB / Postgres (Natívne) | SQL (cez abstraktnú vrstvu) | Payload: Lepšia práca s neštruktúrovanými dátami produktov. |
| **Výkon administrácie** | React (Rýchly, moderný) | React (Pomalší pri veľa dátach) | Payload: Efektívnejšia správa tisícok variantov. |
| **Lokalizácia** | Natívna, na úrovni poľa | Plugin / Natívna | Payload: Flexibilnejšia správa pre SK/EN/DE verzie. |

### **3.3. Dátová vrstva: Sémantické jadro**

Pre pohon AI funkcií sa nemôžeme spoliehať len na tradičnú relačnú databázu. Potrebujeme hybridný prístup, ktorý kombinuje transakčnú integritu so sémantickým vyhľadávaním.

* **Transakčné dáta (PostgreSQL cez Supabase):** Tu budú uložené objednávky, zákaznícke účty a štruktúrované atribúty produktov (napr. cena, rozmery, skladové zásoby).  
* **Vektorová databáza (Pinecone alebo Supabase pgvector):** Tu budú uložené "embeddingy" (vektorové reprezentácie) produktových popisov, prípadových štúdií a technických manuálov. Táto vrstva umožní AI agentovi vykonávať sémantické vyhľadávanie 9 – teda nájsť "riešenie pre prievan v hangári", aj keď používateľ nepoužije presný názov produktu "PVC lamelové závesy".

---

## **4\. Modernizácia UX/UI dizajnu: Estetika "Industrial Lifestyle"**

Dizajn nového webu musí zvládnuť náročnú úlohu: premostiť priepasť medzi ťažkým priemyslom (autoplachty, haly) a luxusným bývaním (pergoly, terasy). Navrhujeme dizajnovú filozofiu nazvanú **"Industrial Lifestyle"**, ktorá kombinuje inžiniersku precíznosť s estetickou čistotou.

### **4.1. Princípy dizajnového systému (Atomic Design)**

Vytvoríme komponentovú knižnicu založenú na **Shadcn/UI** (postavenom na Radix Primitives) a **Tailwind CSS**. Toto riešenie zabezpečí konzistenciu, prístupnosť a rýchlosť vývoja.

* **Typografia:** Navrhujeme párovanie technického bezpätkového písma (napr. *Inter* alebo *Geist*) pre špecifikácie a texty UI, s výrazným pätkovým písmom (napr. *Playfair Display*) pre nadpisy v sekcii "Tienenie", čo dodá pocit luxusu a elegancie.  
* **Farebná paleta:**  
  * **Primárna:** Hlboká námornícka modrá (Deep Navy Blue) – zachováva odkaz na súčasnú modrú farbu Bamidy, ale v tmavšom, korporátnejšom odtieni, ktorý evokuje dôveru a stabilitu.  
  * **Sekundárna:** Brúsená oceľ / Bridlicová sivá – reprezentuje priemyselnú spoľahlivosť a technickú precíznosť.  
  * **Akcentová:** Bezpečnostná oranžová – použitá veľmi striedmo, len pre primárne konverzné tlačidlá (CTA) ako "Získať ponuku", aby okamžite upútala pozornosť.  
  * **Biely priestor (Whitespace):** Výrazne zväčšenie okrajov a rozostupov pre zníženie kognitívnej záťaže a zlepšenie čitateľnosti obsahu.

### **4.2. Reštrukturalizácia navigácie**

Súčasná navigácia je preplnená a neprehľadná. Navrhujeme jej reorganizáciu do systému **Mega Menu**, ktorý bude kategorizovaný podľa zámeru používateľa (User Intent), nie len podľa produktových radov.

| Súčasná položka menu | Navrhovaná štruktúra Mega Menu | Cielený zámer používateľa |
| :---- | :---- | :---- |
| Reklama | **Pre podnikanie (B2B)** \> Branding & Signmaking | Marketingoví manažéri hľadajúci polepy a reklamu. |
| Technické textílie | **Pre priemysel (B2B)** \> Priemyselné riešenia | Manažéri výroby a logistiky hľadajúci funkčné riešenia. |
| Tienenie | **Pre domov (B2C)** \> Outdoor Living | Majitelia domov a architekti hľadajúci estetiku. |
| Číre fólie | **Materiály & Príslušenstvo** | Domáci majstri a menšie firmy hľadajúci suroviny. |

**Kľúčová vlastnosť:** Sekcia "Pre domov" bude využívať dynamické prepínanie tém (Theme Switching). Po vstupe do tejto sekcie sa farebnosť webu jemne zmení na svetlejšie, teplejšie tóny, zatiaľ čo sekcia "Pre priemysel" zostane technická a strohá. Toto dynamické prispôsobenie, podporované natívne v Next.js cez CSS premenné, zosúladí UX s očakávaniami konkrétnej persóny.

### **4.3. Produktová stránka formou "Scrollytelling"**

Pre produkty s vysokou hodnotou a vizuálnym potenciálom, ako sú pergoly, nahradíme statické obrázky interaktívnym zážitkom nazývaným **Scrollytelling**.10

* **Mechanizmus:** Ako používateľ scrolluje stránkou nadol, 3D model pergoly zostáva fixovaný v strede obrazovky (sticky positioning). Okolitý text a prvky sa plynule menia a zvýrazňujú konkrétne vlastnosti modelu – napríklad pri texte o "integrovanom odvode vody" sa kamera modelu priblíži k odkvapovému systému a zobrazí animáciu toku vody.  
* **Technológie:** Na realizáciu využijeme knižnicu framer-motion pre animácie spúšťané scrollovaním a React Three Fiber pre manipuláciu s 3D modelom. Tento prístup udrží pozornosť používateľa a efektívnejšie vysvetlí technické výhody produktu.

---

## **5\. Stratégia implementácie AI 1: Konzultatívny obchodný agent**

Najväčší potenciál pre zvýšenie efektivity a úsporu nákladov v Bamide leží v automatizácii počiatočnej fázy konzultácie. V súčasnosti musí obchodník tráviť čas vysvetľovaním základných parametrov každému záujemcovi o "deliaciu stenu". Navrhujeme nasadenie **AI Agenta založeného na RAG architektúre**.

### **5.1. Architektúra agenta "Bamida Expert"**

Nejde o jednoduchého chatbota s preddefinovanými odpoveďami. "Bamida Expert" bude doménovo špecifický AI model, vytrénovaný na 20 rokoch skúseností spoločnosti.

* **Framework:** Využijeme **Vercel AI SDK** s rozhraním streamUI 11, ktoré umožňuje streamovať nielen text, ale aj interaktívne UI komponenty.  
* **Model:** Ako základný model odporúčame **GPT-4o** alebo **Claude 3.5 Sonnet**, ktoré excelujú v logickom uvažovaní a chápaní kontextu.  
* **Vedomostná báza:** Do vektorovej databázy "ingestujeme" všetky PDF brožúry, technické listy (ISO 9001 špecifikácie) a popisy minulých realizácií Bamidy. To zabezpečí, že agent bude odpovedať fakticky správne a v súlade s ponukou firmy.

### **5.2. Používateľský tok: "Konzultatívne naceňovanie"**

Namiesto statického formulára "Napíšte nám správu", agent aktívne vedie používateľa procesom špecifikácie.

1. **Používateľ:** "Potrebujem oddeliť zváračskú dielňu od lakovne v mojej hale."  
2. **AI Agent (Interný myšlienkový proces):** *Používateľ potrebuje priemyselné oddelenie. Zváranie implikuje iskry (riziko požiaru). Lakovanie implikuje výpary (potreba ventilácie/utesnenia).*  
3. **AI Agent (Odpoveď):** "Pre oddelenie priestorov so zváraním a lakovaním odporúčam naše **Ohňovzdorné PVC deliace steny** s priehľadnými vizormi pre bezpečnosť. Potrebujete, aby bola táto stena posuvná (na koľajniciach) alebo fixná?"  
4. **Používateľ:** "Posuvná."  
5. **AI Agent:** "Rozumiem. Posuvný koľajnicový systém bude ideálny. Aké sú približné rozmery otvoru (Šírka x Výška)?"

**Pridaná hodnota:** Agent kvalifikuje lead *predtým*, než sa dostane k živému obchodníkovi. Zozbiera rozmery, obmedzenia a špecifické požiadavky, čím obchodníkovi ušetrí desiatky minút pri každom dopyte.

### **5.3. Integrácia s Next.js a Generative UI**

Pomocou hooku useChat z Vercel AI SDK prebieha táto konverzácia v reálnom čase priamo na webe. Kľúčovou inováciou je Generative UI.12  
Keď agent odporučí "PVC deliacu stenu", nepopíše ju len textom. Priamo v chate vykreslí React Komponent – interaktívnu kartu produktu s obrázkom, technickými parametrami a tlačidlom "Zobraziť 3D model" alebo "Pridať do ponuky". Tým sa stiera hranica medzi chatom a tradičným prehliadaním webu.

---

## **6\. Stratégia implementácie AI 2: 3D vizualizácia a AR**

Pre segmenty "Tienenie" a "Reklama" je vizuálny dôkaz primárnym spúšťačom nákupu. Zákazníci potrebujú vidieť, ako bude produkt vyzerať v ich prostredí.

### **6.1. Konfigurátor pergol v reálnom čase**

Vytvoríme pokročilý konfigurátor s využitím **React Three Fiber (R3F)** a knižnice **Drei**.13 Tento nástroj umožní používateľom prispôsobiť si produkt do najmenších detailov.

* **Funkcionalita:**  
  * **Rozmery:** Používateľ zadáva rozmery pomocou posuvníkov, pričom 3D model sa procedurálne mení v reálnom čase.  
  * **Lamely:** Možnosť otvárať a zatvárať lamely (animácia), čím sa demonštruje regulácia svetla.  
  * **Simulácia slnka:** Posuvník "Čas dňa" mení polohu virtuálneho slnka v scéne, čím vrhá reálne tiene. Zákazník tak presne vidí, ako bude tienenie fungovať o 16:00 v júli oproti 12:00 v septembri.  
  * **Kontext:** Integrácia WebXR (Augmented Reality) umožní používateľovi cez mobilné zariadenie "položiť" nakonfigurovanú pergolu priamo na svoju terasu a vidieť ju v mierke 1:1.15

### **6.2. Generatívna AI pre "Reklamu"**

Pre klientov objednávajúcich polepy áut ("Autoplachty", "Polepy") môžeme integrovať generatívne modely ako **OpenAI DALL-E 3** alebo **Stable Diffusion**.

* **Funkcia "Vizualizujte svoju značku":** Používateľ nahrá svoje logo. AI vygeneruje mockup dodávky alebo kamiónu v farbách značky s umiestneným logom, prekrytým na 3D modeli vozidla.  
* **Výhoda:** Okamžitá vizualizácia "Maľovanej reklamy" bez nutnosti čakať dni na grafický návrh od dizajnéra. Zákazník vidí potenciál svojej reklamy okamžite, čo urýchľuje schvaľovací proces.

---

## **7\. Stratégia implementácie AI 3: Prevádzková a SEO automatizácia**

### **7.1. Automatizované generovanie SEO metadát**

Bamida potrebuje pokryť stovky potenciálnych vstupných stránok (napr. "Autoplachty Prešov", "Autoplachty Košice", "Pergoly Poprad"). Písanie unikátnych meta popisov pre každú z nich je časovo náročné.

* **Riešenie:** V rámci funkcie generateMetadata v Next.js 16 využijeme OpenAI API na generovanie unikátnych, SEO optimalizovaných titulkov a popisov na základe obsahu stránky a aktuálnych vyhľadávacích trendov.  
* **Implementácia:** Tieto metadáta budú cachované pomocou unstable\_cache v Next.js, takže API sa zavolá len raz pri builde alebo revalidácii, nie pri každej návšteve, čo šetrí náklady a zachováva rýchlosť načítania.

### **7.2. Inteligentné predpovedanie zásob (Interný nástroj)**

Pre výrobnú časť firmy navrhujeme implementovať dashboard pre manažérov Bamidy.

* **Dáta:** Historické dáta o predaji PVC roliek, krúžkov a hliníkových profilov.  
* **AI Model:** Model na predikciu časových radov (Time-Series Forecasting, napr. pomocou knižníc ako Prophet alebo špecializovaných SaaS 17) integrovaný do administrácie Payload CMS.  
* **Výstup:** "Upozornenie: Na základe sezónnych trendov (blížiaca sa sezóna letných terás) vám dôjdu zásoby 'Čírej fólie 0.5mm' o 3 týždne. Odporúčaná objednávka: 50 roliek." Toto pomôže predísť výpadkom vo výrobe a optimalizovať skladové zásoby.

---

## **8\. Plán technickej implementácie**

Transformácia je rozdelená do troch fáz, aby sa minimalizovalo riziko a zabezpečila kontinuita podnikania.

### **Fáza 1: "Headless" Základy (Mesiace 1-3)**

* **Cieľ:** Prechod z legacy CMS na Next.js 15 \+ Payload CMS.  
* **Úlohy:**  
  * Nastavenie štruktúry Next.js 15 App Router.  
  * Migrácia existujúceho obsahu do Payload CMS.  
  * Implementácia "Mega Menu" a responzívneho dizajnového systému.  
  * Nasadenie na Vercel pre globálne edge cachovanie.  
  * **Výstup:** Rýchly, SEO optimalizovaný web, ktorý odráža súčasný obsah, ale na modernej infraštruktúre.

### **Fáza 2: Vizuálna revolúcia (Mesiace 4-6)**

* **Cieľ:** Spustenie konfigurátorov a 3D zážitkov.  
* **Úlohy:**  
  * Modelovanie kľúčových produktov (Pergoly, Haly) do formátu GLTF.  
  * Vytvorenie scén v React Three Fiber pre sekciu "Tienenie".  
  * Implementácia "Scrollytelling" produktových stránok.  
  * **Výstup:** Interaktívne produktové stránky, ktoré zvyšujú čas strávený na webe a angažovanosť.

### **Fáza 3: AI Mozog (Mesiace 7-9)**

* **Cieľ:** Nasadenie agentov a automatizácie.  
* **Úlohy:**  
  * Ingestovanie technickej dokumentácie do Pinecone Vector DB.  
  * Vývoj "Bamida Expert" RAG agenta pomocou Vercel AI SDK.  
  * Integrácia agenta s backendom pre "Žiadosť o ponuku" (Server Actions).  
  * **Výstup:** Automatizovaný systém kvalifikácie leadov, ktorý funguje 24/7.

---

## **9\. Detailná analýza dizajnu a implementácie**

### **9.1. Koncept redizajnu domovskej stránky**

Súčasný stav: Preplnený text, malé obrázky, dominancia sekcie "Novinky".2  
Návrh (Next.js 15):

* **Hero Sekcia:** Celoobrazovkové video pozadie (využívajúce optimalizovaný komponent \<Video\> v Next.js) zobrazujúce časozber inštalácie haly alebo pohyb pergoly so slnkom. Video okamžite komunikuje dynamiku a škálu projektov.  
* **Nadpis:** "Inžinierstvo vášho priestoru." (Posun od jednoduchého "Výroba textílií").  
* **AI Vyhľadávací panel:** Namiesto malej lupy, prominentné centrálne pole: "Aký projekt plánujete? (napr. 'Zimná záhrada pre reštauráciu' alebo 'Branding flotily kamiónov')." Tento vstup vedie priamo do konverzácie s AI agentom.

### **9.2. Technický pohľad: "Smart" kontaktný formulár**

Štandardný kontaktný formulár 19 je často miestom odpadu používateľov.  
Nová implementácia:

* **Viac-krokový sprievodca:** Postavený na react-hook-form a framer-motion.  
* **Krok 1:** "Som..." (Firma / Jednotlivec).  
* **Krok 2:** "Zaujímam sa o..." (Výber vizuálov).  
* **Krok 3:** "Nahrať fotku" (Voliteľné).  
* **AI Validácia a Sentiment:** Keď používateľ zadáva telefónne číslo, AI na pozadí kontroluje formát. Keď píše správu, AI "analýza sentimentu" označí lead ako "Vysoká priorita", ak deteguje slová ako "súrne", "veľký projekt" alebo "tender". Takýto lead okamžite pošle notifikáciu riaditeľovi obchodu cez Slack alebo Teams.

### **9.3. Stratégia lokalizácie**

Bamida pôsobí na trhoch SK, EN, DE.8

* **Next.js Middleware:** Využijeme next-intl spolu s Middleware na detekciu lokality používateľa podľa IP adresy alebo hlavičiek prehliadača.  
* **AI Preklad:** Obsah v Payload CMS môže byť tvorený v slovenčine. Tlačidlo "Preložiť" v CMS (poháňané DeepL API) vytvorí návrh anglickej a nemeckej verzie, ktorý následne schváli človek. To dramaticky zrýchli tvorbu obsahu pre zahraničné trhy (referencie z Rakúska, Švédska 1).

---

## **10\. Platby a integrácia platobnej brány**

Pre e-commerce funkcionalitu, najmä pri predaji menších doplnkov alebo náhradných dielov (krúžky, lepidlá, čistiace prostriedky), je nutná spoľahlivá platobná brána.  
Pre slovenský trh odporúčame integráciu GoPay alebo Stripe, prípadne TrustPay ako lokálnu alternatívu.

* **Implementácia:** Využijeme **Inline Gateway** (v prípade GoPay alebo Stripe Elements). To znamená, že platobný formulár sa otvorí priamo v okne webu (cez iframe alebo React komponent) a používateľ nie je presmerovaný na externú stránku banky.21 Tento "seamless" zážitok zvyšuje dôveru a konverzný pomer.  
* **Prepojenie s Next.js:** Platobný proces bude riadený cez API Routes v Next.js, ktoré bezpečne komunikujú s API platobnej brány, generujú platobné tokeny a spracúvajú webhooky o úspešnej platbe.

---

## **11\. Záver**

Modernizácia bamida.sk nie je len kozmetickou úpravou; je to strategické repoziciovanie spoločnosti. Nasadením **Next.js 15** získa Bamida výkon a škálovateľnosť globálnej technologickej firmy. Integráciou **generatívnej AI a 3D konfigurátorov** demokratizuje svoje technické know-how, umožní zákazníkom samoedukáciu a vizualizáciu komplexných priemyselných riešení.

Tento prechod posúva Bamidu z pozície "dodávateľa plachiet" do pozície "partnera pre priestorové inžinierstvo". Navrhovaný plán transformuje webovú stránku na 24/7 dostupného obchodného inžiniera, ktorý je schopný zvládať nuansy zákazkovej výroby v digitálnom svete, čím priamo ovplyvňuje vnímanie značky a obhájiteľnosť prémiovej cenotvorby.

---

# **Detailná technická príloha**

### **A. Odporúčaná štruktúra priečinkov Next.js 15**

app/  
├── (marketing)/           \# Route Group pre statické stránky (O nás, Referencie)  
│   ├── about/  
│   ├── referencie/  
│   └── page.tsx           \# Domovská stránka  
├── (shop)/                \# Route Group pre E-commerce časť  
│   ├── products/  
│   │   ├── \[category\]/  
│   │   └── \[slug\]/        \# Detail produktu (RSC \- Server Component)  
│   └── configurator/      \# Client-side 3D Konfigurátor  
├── api/  
│   ├── chat/              \# Endpoint pre AI Agenta (Edge Runtime)  
│   ├── payment/           \# Webhooky pre platobnú bránu  
│   └── revalidate/        \# Hooky pre ISR (Incremental Static Regeneration)  
└── layout.tsx             \# Root Layout (Fonty, Metadáta, Providers)

### **B. Stratégia "System Prompt" pre AI Agenta**

Aby sa agent "Bamida Expert" správal korektne, vyžaduje robustný systémový prompt. Príklad definície:

"Si Senior Technický Konzultant pre spoločnosť Bamida s.r.o. Špecializuješ sa na priemyselné textílie a tieniacu techniku. Si nápomocný, profesionálny a presný. NIKDY si nevymýšľaj technické špecifikácie. Ak nepoznáš požiarnu triedu, povedz 'Overím to s naším technickým oddelením'. Prioritizuješ bezpečnostné odporúčania. Vždy sa pýtaj na rozmery v milimetroch alebo centimetroch. Pri diskusii o pergolách zdôrazňuj 'bioklimatické' vlastnosti a výhody regulácie teploty..."

Tento prompt zabezpečuje, že AI bude komunikovať hlasom spoločnosti a dodržiavať bezpečnostné štandardy, ktoré sú v priemyselnom sektore kritické.

#### **Citované práce**

1. Referencie – Bamida, otvorené novembra 25, 2025, [https://www.bamida.sk/referencie/](https://www.bamida.sk/referencie/)  
2. Bamida – Profesionálna potlač, otvorené novembra 25, 2025, [https://www.bamida.sk/](https://www.bamida.sk/)  
3. Renson: Pioneers in indoor climate for 110+ years | Renson US, otvorené novembra 25, 2025, [https://www.renson.net/en-us](https://www.renson.net/en-us)  
4. Next.js by Vercel \- The React Framework, otvorené novembra 25, 2025, [https://nextjs.org/](https://nextjs.org/)  
5. Compare Payload to Strapi | Strapi Alternatives \- Payload CMS, otvorené novembra 25, 2025, [https://payloadcms.com/compare/strapi](https://payloadcms.com/compare/strapi)  
6. Strapi vs Payload, otvorené novembra 25, 2025, [https://strapi.io/headless-cms/comparison/strapi-vs-payload](https://strapi.io/headless-cms/comparison/strapi-vs-payload)  
7. Payload CMS vs Strapi \- DEV Community, otvorené novembra 25, 2025, [https://dev.to/webbycrownsolutions/payload-cms-vs-strapi-cn0](https://dev.to/webbycrownsolutions/payload-cms-vs-strapi-cn0)  
8. Obchod – Bamida, otvorené novembra 25, 2025, [https://www.bamida.sk/de/obchod/](https://www.bamida.sk/de/obchod/)  
9. The 10 Best Semantic Search APIs in 2025 | Shaped Blog, otvorené novembra 25, 2025, [https://www.shaped.ai/blog/the-10-best-semantic-search-apis-in-2025](https://www.shaped.ai/blog/the-10-best-semantic-search-apis-in-2025)  
10. Ecommerce Design Trends 2025: Top Trends to Boost Sales \- UI UX Design Agency, otvorené novembra 25, 2025, [https://www.designstudiouiux.com/blog/ecommerce-web-design-trends/](https://www.designstudiouiux.com/blog/ecommerce-web-design-trends/)  
11. AI SDK by Vercel, otvorené novembra 25, 2025, [https://ai-sdk.dev/docs/introduction](https://ai-sdk.dev/docs/introduction)  
12. How to build AI Agents with Vercel and the AI SDK, otvorené novembra 25, 2025, [https://vercel.com/guides/how-to-build-ai-agents-with-vercel-and-the-ai-sdk](https://vercel.com/guides/how-to-build-ai-agents-with-vercel-and-the-ai-sdk)  
13. Learn Next.js 15, GSAP, Three.js and Prismic to build a 3D skateboard website\! \- YouTube, otvorené novembra 25, 2025, [https://www.youtube.com/watch?v=LBOhVng5rk8](https://www.youtube.com/watch?v=LBOhVng5rk8)  
14. React Three Fiber tutorial \- 3D Table Configurator \- YouTube, otvorené novembra 25, 2025, [https://www.youtube.com/watch?v=wW0XwNhrDFQ](https://www.youtube.com/watch?v=wW0XwNhrDFQ)  
15. MyWebAR by DEVAR \- create augmented reality on web | Web-Based AR Platform, otvorené novembra 25, 2025, [https://mywebar.com/](https://mywebar.com/)  
16. Getting Started: Metadata and OG images \- Next.js, otvorené novembra 25, 2025, [https://nextjs.org/docs/app/getting-started/metadata-and-og-images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)  
17. Top 10 AI-Powered Demand Forecasting Tools For Inventory \- EasyReplenish, otvorené novembra 25, 2025, [https://www.easyreplenish.com/blog/top-10-ai-powered-demand-forecasting-tools-for-inventory](https://www.easyreplenish.com/blog/top-10-ai-powered-demand-forecasting-tools-for-inventory)  
18. AI Methods for Forecasting Consumable Demand in Printing \- First Line Software, otvorené novembra 25, 2025, [https://firstlinesoftware.com/blog/ai-methods-for-forecasting-consumable-demand-in-printing/](https://firstlinesoftware.com/blog/ai-methods-for-forecasting-consumable-demand-in-printing/)  
19. Kontakt \- Bamida, otvorené novembra 25, 2025, [https://www.bamida.sk/kontakt/](https://www.bamida.sk/kontakt/)  
20. Obchod – Bamida, otvorené novembra 25, 2025, [https://www.bamida.sk/en/obchod/](https://www.bamida.sk/en/obchod/)  
21. Implementing a New Design of the Payment Gateway \- GoPay \- Help, otvorené novembra 25, 2025, [https://help.gopay.com/en/knowledge-base/integration-of-payment-gateway/integration-of-payment-gateway-1/implementing-a-new-design-of-the-payment-gateway](https://help.gopay.com/en/knowledge-base/integration-of-payment-gateway/integration-of-payment-gateway-1/implementing-a-new-design-of-the-payment-gateway)  
22. How Do I Integrate the Payment Gateway? \- GoPay \- Help, otvorené novembra 25, 2025, [https://help.gopay.com/en/knowledge-base/integration-of-payment-gateway/integration-of-payment-gateway-1/how-do-i-integrate-the-payment-gateway](https://help.gopay.com/en/knowledge-base/integration-of-payment-gateway/integration-of-payment-gateway-1/how-do-i-integrate-the-payment-gateway)