# Style Guide — Casa dos Duques Blog Content

## Frontmatter template (Astro file)

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import CTASection from '../../components/CTASection.astro';

const canonicalUrl = 'https://casadosduques.pt/blog/SLUG/';
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'TITLE — Optional Subtitle',
      description: 'SEO description under 160 chars. Include key terms naturally.',
      author: { '@type': 'Person', name: 'Casa dos Duques' },
      datePublished: 'YYYY-MM-DD',
      dateModified: 'YYYY-MM-DD',
      image: 'https://casadosduques.pt/images/FILENAME.jpeg',
      publisher: { '@type': 'Organization', name: 'Casa dos Duques' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://casadosduques.pt/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://casadosduques.pt/blog/' },
        { '@type': 'ListItem', position: 3, name: 'SHORT TITLE', item: canonicalUrl },
      ],
    },
  ],
};
---

<BaseLayout
  title="TITLE — Casa dos Duques | Abiul, Pombal"
  description="SEO description under 160 chars."
  canonical="/blog/SLUG/"
  schema={schema}
>
  <article class="max-w-3xl mx-auto px-4 py-12">
    <div class="mb-8">
      <div class="flex items-center gap-2 text-sm text-muted font-body mb-4">
        <span class="bg-stone-100 text-wood-700 px-3 py-1">CATEGORY</span>
        <span>MONTH YEAR</span>
        <span>&middot; X min read</span>
      </div>
      <h1 class="leading-tight mb-4">TITLE</h1>
      <p class="text-lg text-muted font-body">COMPELLING DEK — 1-2 sentences that earn the click through to keep reading.</p>
    </div>

    <div class="text-muted leading-relaxed space-y-4 font-body">
      <!-- BODY CONTENT HERE -->
    </div>

    <div class="mt-8 p-6 bg-stone-100">
      <p class="text-sm text-muted italic font-body">Sources: ...</p>
    </div>
  </article>

  <CTASection
    title="CONTEXTUAL CTA TITLE"
    subtitle="CONTEXTUAL CTA SUBTITLE"
    primaryCta={{ label: 'Book your stay', href: '/booking/' }}
    variant="terracotta"
  />
</BaseLayout>
```

## Category reference

Use these exact category labels in the badge span:

| Category | Use for |
|---|---|
| `Food & Dining` | Restaurant guides, food recommendations, markets, local cuisine |
| `Central Portugal` | General regional content, area overviews, multi-topic guides |
| `Day Trips` | Itineraries, route suggestions, day-out planning |
| `Beaches & Nature` | Beaches, river beaches, hiking, outdoor activities |
| `History & Culture` | Monuments, museums, heritage sites, local traditions |
| `Local Tips` | Insider advice, seasonal tips, practical guides, packing tips |

## Site page cross-link map

| Page | Path | When to link |
|---|---|---|
| Home | `/` | Always mention Casa dos Duques in intro + CTA |
| The House | `/the-house/` | When describing amenities, rooms, property features |
| Rooms | `/rooms/` | When mentioning sleeping capacity, room details |
| Location | `/location/` | When discussing distances, region access |
| Things to Do | `/things-to-do/` | In any activity/attraction article |
| Day Trips | `/day-trips/` | In multi-stop itinerary articles |
| Beaches | `/beaches/` | In beach/river beach/praia fluvial content |
| Garden | `/garden/` | When mentioning outdoor spaces, BBQ, pool |
| Rates | `/rates/` | When mentioning pricing, value, seasons |
| Booking | `/booking/` | CTA — every article. Also inline when context fits |
| Contact | `/contact/` | When inviting questions, custom recommendations |
| FAQ | `/faq/` | When answering common guest questions |
| Reviews | `/reviews/` | When building trust/social proof |
| Guide: Abiul | `/guide/abiul/` | Local history, Abiul-specific content |
| Guide: Pombal | `/guide/pombal/` | Pombal content, restaurants, castle |
| Guide: Central PT | `/guide/central-portugal/` | Regional overview, UNESCO sites |

### Existing blog posts to cross-link

| Post | Path |
|---|---|
| Best Restaurants in Pombal | `/blog/best-restaurants-pombal-portugal/` |
| Discover Abiul and Pombal | `/blog/discover-abiul-pombal-central-portugal/` |

## PT-PT terminology reference

### Vocabulary — use PT-PT, never PT-BR

| English | PT-PT ✅ | PT-BR ❌ |
|---|---|---|
| Contact | contacto | contato |
| Fact | facto | fato |
| Team | equipa | time |
| Current | atual | atual (same, but context differs) |
| Direct | direto | direto (same) |
| Action | ação | ação (same) |
| Reception | receção | recepção |
| To do (gerund) | estou a fazer | estou fazendo |
| Breakfast | pequeno-almoço | café da manhã |
| Juice | sumo | suco |
| Ice cream | gelado | sorvete |
| Bus | autocarro | ônibus |
| Train | comboio | trem |
| Queue | fila | fila (same) |
| Sandwich | sandes | sanduíche |

### Number & unit formatting
- Decimal comma: `2,5 km` not `2.5 km`
- Thousands separator: `1.500 euros` or `1500 euros`
- Time: `10:00–18:00` (en dash, no space)
- Distances: `10 minutos de carro` (PT), `10 min drive` (EN)
- Temperatures: `30°C` (no space)
- Currency: `15 €` or `€15` — be consistent within a post

## NL terminology reference

### Vocabulary — prefer natural Dutch

| English | Dutch ✅ | Avoid ❌ |
|---|---|---|
| Holiday home | vakantiehuis / vakantiewoning | holiday home (anglicism) |
| To book | boeken | booken |
| Accommodation | accommodatie | accomodatie (spelling) |
| Swimming pool | zwembad | swimming pool (anglicism) |
| Garden | tuin | garden (anglicism) |
| Bedroom | slaapkamer | bedroom (anglicism) |
| Living room | woonkamer | living (anglicism) |
| Fully equipped | volledig uitgerust | fully equipped (anglicism) |
| Within walking distance | op loopafstand | binnen wandelafstand |
| Day trip | daguitstap / dagtrip | day trip (anglicism, though dagtrip is accepted) |
| Things to do | wat te doen / activiteiten | things to do (anglicism) |
| Beach | strand | beach (anglicism) |
| Review | beoordeling / review | review (accepted, but beoordeling is proper Dutch) |
| Guests | gasten | guests (anglicism) |
| Stay | verblijf | stay (anglicism) |
| Reservation | reservering | booking (anglicism, though accepted) |
| Check-in | check-in / inchecken | — (accepted) |
| Check-out | check-out / uitchecken | — (accepted) |

### Dutch grammar & style
- **Diminutives**: Use naturally — `huisje`, `zwembadje`, `tuintje`, `dorpje`.
  Don't force them; Abiul is not "Abiultje".
- **Word order**: verb-final in subordinate clauses.
  ❌ "omdat het is dichtbij" → ✅ "omdat het dichtbij is"
- **"Er" constructions**: get them right.
  ❌ "er zijn vier UNESCO sites in de buurt" → ✅ correct ("er zijn" for existence)
- **Prepositions**: `in de buurt van`, `op loopafstand van`, `op vakantie in`,
  `in het centrum van`, `aan de kust`
- **Avoid te + infinitive overuse**: Dutch uses `om te` more than `te` alone.
  "Een perfecte plek om te ontspannen" not just "een perfecte plek te ontspannen"

### Dutch number & unit formatting
- Decimal comma: `2,5 km` not `2.5 km`
- Thousands: dot separator `1.500 euro` or space `1 500 euro`
- Time: `10:00–18:00 uur` (add "uur" in running text, optional in info boxes)
- Distances: `10 minuten rijden`, `XX min rijden`

## FR terminology reference

### Vocabulary — prefer proper French

| English | French ✅ | Avoid ❌ |
|---|---|---|
| Holiday home | maison de vacances / gîte | holiday home (anglicism) |
| To book | réserver | booker |
| Accommodation | hébergement / logement | accommodation (anglicism) |
| Swimming pool | piscine | swimming pool (anglicism) |
| Garden | jardin | garden (anglicism) |
| Bedroom | chambre | bedroom (anglicism) |
| Living room | salon / séjour | living (anglicism) |
| Fully equipped | entièrement équipé | fully equipped (anglicism) |
| Within walking distance | à distance de marche / à pied | — |
| Day trip | excursion / journée découverte | day trip (anglicism) |
| Things to do | activités / choses à faire | things to do (anglicism) |
| Beach | plage | beach (anglicism) |
| Review | avis / commentaire | review (anglicism, though accepted) |
| Guests | voyageurs / hôtes (guests you host) | guests (anglicism) |
| Stay | séjour | stay (anglicism) |
| Reservation | réservation | booking (anglicism) |
| Check-in | arrivée / check-in | — (check-in accepted) |
| Check-out | départ / check-out | — (check-out accepted) |
| Booking (page) | réservation | booking (anglicism) |

### French grammar & style
- **Vous** (not tu) for all guest-facing copy. Polite, warm, professional.
- **Typographic rules**:
  - Non-breaking space before `! ? ; :` — `Bonjour !` not `Bonjour!`
  - Use `« guillemets »` for quotes, not "English quotes"
  - Euro sign: `15 €` (number + space + €) — French convention
  - En dash for ranges: `10h00–18h00` (no space)
- **Time format**: `10h00–18h00` (French style) or `10:00–18:00`. Be consistent.
- **Avoid unnecessary anglicisms**: `le week-end` is accepted French;
  `le check-in` is accepted. But `faire du shopping` → `faire des courses`
  unless it's specifically leisure shopping.
- **Accents**: always correct, even on capitals — `Église` not `Eglise`,
  `À propos` not `A propos`

### French number & unit formatting
- Decimal comma: `2,5 km` not `2.5 km`
- Thousands: non-breaking space `1 500 €` or `1 500 euros`
- Time: `10h00–18h00` (French style) or `10:00–18:00` — be consistent
- Distances: `10 minutes en voiture`, `à XX min en voiture`
- Temperatures: `30 °C` (space before °C per French convention)

## Source hierarchy

### Primary sources (preferred)
1. **Official venue website** — opening hours, prices, address
2. **Google Maps listing** — hours, rating, reviews, photos, location
3. **Municipal/tourism board sites** — verified attraction info
4. **Direct phone/email confirmation** — for critical details

### Secondary sources (for discovery, cross-check)
5. **TripAdvisor** — reviews, ranking context
6. **Google Maps reviews** — recent visitor experiences
7. **Travel blogs** — for discovering hidden gems (verify independently)
8. **Wikipedia** — historical/background facts only

### Never trust
- Model training data for hours, prices, or addresses
- One source alone for "best" claims
- Outdated blog posts (>2 years old for restaurants/venues)

## Anti-slop checklist (EN)

### Generic openings — BANNED
- "Nestled in the heart of..."
- "Whether you're a history buff, a foodie, or just looking for..."
- "Let's dive into..."
- "In today's fast-paced world..."
- "The perfect blend of old and new..."
- "Welcome to [place], where..."
- "If you're looking for the perfect..."

### Good openings — USE THESE PATTERNS
- Start with a specific fact: "The Monastery of Batalha took over 150 years to build..."
- Start with a personal observation: "The first time you see Nazaré's North Beach from the cliff..."
- Start with practical value: "You don't need to drive to Pombal for a good meal..."
- Start with a surprising claim: "Four UNESCO World Heritage sites sit within 30 minutes of Abiul..."

### Filler phrases — CUT THESE
- "It goes without saying that..."
- "Needless to say..."
- "At the end of the day..."
- "When all is said and done..."
- "It's worth noting that..." → just note it
- "Interestingly enough..." → just say the interesting thing

### Vague claims — REPLACE WITH SPECIFICS
- "Stunning views" → "360° views from the castle ramparts over the Sicó mountain range"
- "Delicious food" → "Crispy-skinned leitão roasted over wood fire, served with orange slices"
- "Rich history" → "Founded in 1167 by royal charter from King Afonso Henriques"
- "Beautiful beach" → "2 km of golden sand with gentle waves, lifeguard-supervised in summer"

### Buzzword bingo — AVOID
- "Hidden gem" (everything called this is on Google Maps)
- "Must-visit" (unless substantiated with evidence)
- "World-class" (is it? Really?)
- "Unforgettable experience" (let the reader decide)
- "Bucket list" (overused)
- "Iconic" (reserve for actual icons)

### Bad closings — BANNED
- "So what are you waiting for?"
- "Book now to avoid disappointment!"
- "In conclusion..."
- "To sum up..."
- "All in all..."
- "At the end of the day..."

### Good closings — USE THESE PATTERNS
- A practical next step: "Browse our guide to Pombal's best restaurants for more dining options."
- A forward-looking thought: "As Central Portugal gains attention, these quiet beaches won't stay secret forever."
- A callback to the opening: "...and that's how a tiny town of 3,000 people ended up with Portugal's oldest bullring."
- A genuine invitation: "Have questions about any of these spots? Drop us a line — we're happy to share more tips."

## Anti-slop checklist (NL)

### Generic openings — BANNED
- "Gelegen in het hart van..."
- "Of u nu een geschiedenisliefhebber bent, een fijnproever, of gewoon..."
- "Laten we erin duiken..."
- "In de snelle wereld van vandaag..."
- "De perfecte mix van oud en nieuw..."
- "Welkom in [plaats], waar..."
- "Als u op zoek bent naar de perfecte..."

### Good openings — USE THESE PATTERNS
- Start with a specific fact: "Het Mosteiro da Batalha heeft meer dan 150 jaar gekost om te bouwen..."
- Start with a personal observation: "De eerste keer dat je vanaf de klif naar Praia do Norte in Nazaré kijkt..."
- Start with practical value: "Je hoeft niet naar Pombal te rijden voor een goede maaltijd..."
- Start with a surprising claim: "Vier UNESCO-werelderfgoedlocaties liggen binnen 30 minuten van Abiul..."

### Filler phrases — CUT THESE
- "Het spreekt voor zich dat..."
- "Vanzelfsprekend..."
- "Aan het einde van de dag..."
- "Het is het vermelden waard dat..." → vermeld het gewoon
- "Interessant genoeg..." → zeg gewoon het interessante

### Vague claims — REPLACE WITH SPECIFICS
- "Adembenemend uitzicht" → "360° uitzicht vanaf de kasteelmuren over het Sicó-gebergte"
- "Heerlijk eten" → "Knapperig geroosterd speenvarken (leitão) van de houtgrill, geserveerd met sinaasappel"
- "Rijke geschiedenis" → "Gesticht in 1167 met een koninklijk handvest van Koning Afonso Henriques"
- "Prachtig strand" → "2 km goudkleurig zand met rustige golven, in de zomer bewaakt door lifeguards"

### Buzzword bingo — AVOID
- "Verborgen parel" (alles wat zo genoemd wordt staat op Google Maps)
- "Must-visit"/"mag je niet missen" (tenzij onderbouwd)
- "Wereldklasse" (is het dat echt?)
- "Onvergetelijke ervaring" (laat de lezer dat beslissen)
- "Bucketlist" (overgebruikt)
- "Iconisch" (reserveer voor echte iconen)

### Bad closings — BANNED
- "Dus waar wacht je nog op?"
- "Boek nu om teleurstelling te voorkomen!"
- "Tot slot..."
- "Samenvattend..."
- "Al met al..."
- "Aan het einde van de dag..."

### Good closings — USE THESE PATTERNS
- A practical next step: "Bekijk onze gids met de beste restaurants in Pombal voor meer eetgelegenheden."
- A forward-looking thought: "Nu Centraal-Portugal steeds meer aandacht krijgt, blijven deze rustige stranden niet eeuwig geheim."
- A callback to the opening: "...en zo kreeg een klein dorpje van 3000 inwoners de oudste arena van Portugal."
- A genuine invitation: "Vragen over een van deze plekken? Stuur ons een berichtje — we delen graag meer tips."

## Anti-slop checklist (FR)

### Generic openings — BANNED
- "Niché au cœur de..."
- "Que vous soyez passionné d'histoire, gourmand, ou simplement..."
- "Plongeons dans..."
- "Dans le monde trépidant d'aujourd'hui..."
- "Le mélange parfait d'ancien et de moderne..."
- "Bienvenue à [lieu], où..."
- "Si vous cherchez le... parfait"

### Good openings — USE THESE PATTERNS
- Start with a specific fact: "Le Monastère de Batalha a nécessité plus de 150 ans de construction..."
- Start with a personal observation: "La première fois que l'on regarde Praia do Norte à Nazaré depuis la falaise..."
- Start with practical value: "Pas besoin d'aller jusqu'à Pombal pour bien manger..."
- Start with a surprising claim: "Quatre sites classés au patrimoine mondial de l'UNESCO se trouvent à moins de 30 minutes d'Abiul..."

### Filler phrases — CUT THESE
- "Il va sans dire que..."
- "Inutile de dire que..."
- "Au final..."
- "À la fin de la journée..."
- "Il est intéressant de noter que..." → notez-le simplement
- "Chose intéressante..." → dites simplement la chose intéressante

### Vague claims — REPLACE WITH SPECIFICS
- "Vues à couper le souffle" → "Vue panoramique à 360° depuis les remparts du château sur la Serra de Sicó"
- "Cuisine délicieuse" → "Leitão rôti au feu de bois, peau croustillante, servi avec des quartiers d'orange"
- "Riche histoire" → "Fondée en 1167 par charte royale du Roi Afonso Henriques"
- "Belle plage" → "2 km de sable doré, vagues douces, surveillance de baignade en été"

### Buzzword bingo — AVOID
- "Perle rare"/"joyau caché" (tout ce qui est ainsi nommé figure sur Google Maps)
- "Incontournable" (sauf si justifié)
- "De classe mondiale" (vraiment ?)
- "Expérience inoubliable" (laissez le lecteur en juger)
- "À faire absolument" (trop galvaudé)
- "Iconique"/"emblématique" (réservez aux véritables icônes)

### Bad closings — BANNED
- "Alors, qu'attendez-vous ?"
- "Réservez maintenant pour ne pas être déçu !"
- "En conclusion..."
- "Pour résumer..."
- "En fin de compte..."
- "Au final..."

### Good closings — USE THESE PATTERNS
- A practical next step: "Consultez notre guide des meilleurs restaurants de Pombal pour plus d'options."
- A forward-looking thought: "Alors que le Centre du Portugal attire l'attention, ces plages tranquilles ne resteront pas secrètes éternellement."
- A callback to the opening: "...et voilà comment un petit village de 3 000 habitants s'est retrouvé avec les plus vieilles arènes du Portugal."
- A genuine invitation: "Des questions sur l'un de ces endroits ? Écrivez-nous — nous serons ravis de partager nos conseils."

## Tone & voice

### The Casa dos Duques voice (all languages)
- **Warm and personal** — like a friend who lives there, not a hotel chain
- **Knowledgeable but not pretentious** — you know the region, but you're not a historian
- **Honest** — if a place is overrated or not worth the drive, say so (gently)
- **Practical** — guests need logistics, not poetry
- **Enthusiastic but not salesy** — you love the region; let that show naturally

### Language-specific tone adjustments
- **EN**: Warm, conversational, direct. "You" and "your". Mix short and long sentences.
- **PT**: Caloroso, conhecedor, de confiança. Portuguese hospitality — welcoming but professional.
  Use "você" or "o(a) senhor(a)" contextually; "tu" only if the overall voice is very informal.
- **NL**: Gezellig, persoonlijk, behulpzaam. Use "je" — it matches the warm host tone.
  Dutch readers appreciate directness: be practical and specific.
- **FR**: Chaleureux, accueillant, personnel. Use "vous" — polite but warm.
  French readers expect a touch more formality and elegance than Dutch or English readers.
  That's fine — just don't let it become stiff.

### Compliance boundaries (what not to say)
- Don't claim to be a licensed tour guide or travel agent
- Don't guarantee weather, availability, or third-party services
- Don't provide legal, tax, or immigration advice
- Don't make promises about third-party venues ("You'll love it!" → "Many guests have enjoyed...")
- Don't publish unverified safety claims about swimming, hiking, or activities
- Add disclaimer when appropriate: "Always check current opening hours before visiting."

## Anti-patterns

| Anti-pattern | Why it's bad | Better approach |
|---|---|---|
| AI-slop intro | Generic, trust-destroying, obvious to readers | Specific fact or personal observation |
| No practical info | Guests must Google everything themselves | Info box with hours, price, distance, tips |
| No cross-links | Missed opportunity to keep readers on site | 2-4 contextual inline links |
| Vague claims | No substance, no SEO value, no trust | Specific numbers, names, comparisons |
| Orphan post | No reciprocal links pointing back | Add cross-links to previous related posts |
| Wall of text | Hard to scan, high bounce rate | H2s every 3-4 paragraphs, info boxes, varied paragraph length |
| No CTA | Reader leaves without taking action | Contextual CTA linking to booking or related content |
| No sources | Unverifiable claims, no trust | Brief sources note at bottom |
| Unverified hours/prices | Wrong info = frustrated guests | Web search + official site confirmation |
| Brazilian PT | Wrong audience, looks careless | PT-PT vocabulary and grammar check |
| Invented "best" claims | Damages credibility when discovered | Cite reviews, awards, local reputation |
| No seasonal context | Guest arrives to find closed attraction | Note seasonal availability, best time to visit |
