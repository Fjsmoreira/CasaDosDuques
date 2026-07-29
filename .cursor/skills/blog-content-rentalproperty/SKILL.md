---
name: blog-content-rentalproperty
description: Writes and edits Casa dos Duques blog posts and travel guides in all four site languages — European Portuguese (PT-PT), English (EN), Dutch (NL), and French (FR) — with mandatory fact verification (distances, hours, prices, quality claims), always-on internal cross-links, and photo planning. Every post must be created in all four languages. Use when drafting, rewriting, or fact-checking blog articles under `src/pages/blog/`, or when the user asks for blog content, travel guides, restaurant recommendations, day-trip ideas, or editorial copy for the rental property site.
---

# Blog & Travel Content Writing (PT-PT, EN, NL, FR)

Guidance for writing and editing Casa dos Duques blog posts and travel guides.
Casa dos Duques is a holiday rental in Abiul, Pombal, Central Portugal — a meticulously
renovated 90-year-old house sleeping up to 8 guests with pool and garden.
Every article must help guests discover the region, build trust, and drive bookings.

- **Blog posts** live in `src/pages/blog/` as `.astro` files.
- **Guide pages** live in `src/pages/guide/` as `.astro` files.
- **Site pages** to cross-link: `the-house`, `rooms`, `location`, `things-to-do`, `day-trips`, `beaches`, `garden`, `rates`, `booking`, `contact`, `faq`, `reviews`.

See [style-guide.md](style-guide.md) for frontmatter templates, terminology,
source hierarchy, cross-link rules, and category reference.

## Non-negotiable rules

1. **Every blog post is created in all four languages** — EN, PT, NL, FR.
   Never ship a post in just one language. Create all four versions together.
2. **Every factual claim is verified against a primary or credible secondary source**
   before publishing — distances, opening hours, prices, addresses, and quality claims.
3. **Every blog post includes internal cross-links** to related blog posts,
   guide pages, and relevant site pages — in the same language as the post.
4. **Correct language for each version** — PT-PT (never Brazilian), warm conversational
   English, natural Dutch with "je", and correct French with "vous". No AI-slop intros in any language.

Do not deliver a draft that fails any of these three gates.

## Workflow

Copy this checklist and track progress on every piece:

```
Task Progress:
- [ ] Clarify topic + angle (restaurant guide, destination highlight, day trip, "best of" list, seasonal guide)
- [ ] Check for existing post on topic (new vs update — prefer update if facts changed)
- [ ] All posts: create EN, PT, NL, and FR versions (4 files per article + update each blog index)
- [ ] Plan photos: ask user for photos (how many, of what); check `src/data/photo-manifest.ts` for existing images
- [ ] Research & verify facts:
      - [ ] Addresses and GPS coordinates correct
      - [ ] Opening hours current (check official website, not memory)
      - [ ] Prices / price ranges verified
      - [ ] Driving distances from Casa dos Duques (use Google Maps / OSRM)
      - [ ] "Best" or "top" claims substantiated (reviews, awards, local consensus)
      - [ ] Phone numbers and websites correct and live
- [ ] Find related posts/guides/site pages for cross-links
- [ ] Draft in target language
- [ ] Add structured data (Article + BreadcrumbList schema)
- [ ] Add 2–4 contextual cross-links
- [ ] Add practical info box for each venue/attraction (hours, price, distance, family-friendly)
- [ ] CTA block at end → booking, contact, or related content
- [ ] Sources / verification note at bottom
- [ ] Final accuracy + link pass (check all internal links resolve)
```

## 1. Language: PT-PT, EN, NL, FR

### Portuguese (PT-PT)
- Write all body copy, title, description in português europeu.
- Prefer PT-PT vocabulary/spelling: `contacto` (not `contato`), `facto` (fact),
  `equipa` (not `time`), `atual`, `direto`. Use the decimal comma.
- Avoid Brazilian defaults and gerund-heavy phrasing (`estou fazendo` → `estou a fazer`).
- Tone: warm, trustworthy, knowledgeable — like a local host, not a corporation.

### English (EN)
- Write in clear, warm, conversational English. Avoid stiff/formal hotel-copy tone.
- Avoid AI-slop phrases: "Nestled in the heart of...", "Whether you're a...", "Let's dive in",
  "In today's fast-paced world", "The perfect blend of...".
- Address the reader directly ("you", "your stay") — be the helpful host, not the brochure.
- Vary sentence length. Mix short, punchy sentences with longer descriptive ones.

### Dutch (NL)
- Write in natural, conversational Dutch. Avoid stiff, overly formal language —
  this is a holiday home, not a corporate rental.
- Use "je" (not "u") — warm and personal matches the Casa dos Duques tone.
- Avoid anglicisms where good Dutch alternatives exist:
  `boeken` not `booken`, `e-mail` is fine, `check-in` is accepted.
- Watch for common Dutch-as-a-second-language errors:
  - Correct use of "er", "daar", "waar" compounds
  - Correct word order in subordinate clauses (inversion)
  - Proper use of diminutives where natural (`huisje`, `zwembadje`, `tuintje`)
- Avoid Dutch AI-slop: "Gelegen in het hart van...", "Of u nu een...",
  "Laten we erin duiken...", "De perfecte mix van..."
- Tone: gezellig, persoonlijk, behulpzaam — like a friendly host, not a travel agency.

### French (FR)
- Write in correct, warm French. French copy can be slightly more formal than EN/NL
  while still feeling personal.
- Use "vous" (not "tu") — polite but friendly is the norm for hospitality.
- Follow French typographic rules:
  - Non-breaking spaces before `! ? ; :` and inside `« »`
  - Use `« guillemets »` for quotes, not "English quotes"
  - Euro sign after the number with a space: `15 €`
- Avoid anglicisms where good French equivalents exist:
  `réservation` not `booking`, `hébergement` not `accommodation`,
  `annonce` is acceptable for listing, `check-in` / `check-out` are accepted.
- Avoid French AI-slop: "Niché au cœur de...", "Que vous soyez un...",
  "Plongeons dans...", "Le mélange parfait de..."
- Tone: chaleureux, accueillant, personnel — like a thoughtful host, not a hotel chain.

See [style-guide.md](style-guide.md) for terminology, anti-slop, and language-specific reference.

## 2. Fact verification (hard gate)

Before finalizing any draft:

### Distances & locations
1. Verify driving times from Casa dos Duques (Rua D. Afonso Henriques n 9, Abiul 3100-012)
   using Google Maps or OpenStreetMap/OSRM. Never guess.
2. Check that the place actually exists at the stated address. Use Google Maps
   Street View or the venue's official website for confirmation.
3. For walkable locations, note walking time separately from driving time.

### Venues & attractions
4. Verify opening hours on the official website or Google Maps listing.
   Do not use model memory — hours change seasonally.
5. Check if the venue is still open/in business. Restaurants close, attractions
   get renovated. A quick web search saves embarrassment.
6. Verify phone numbers and websites are live (fetch the URL, don't just assume).

### Quality & "best" claims
7. If claiming something is "the best", "top-rated", or "a must-visit", substantiate it:
   - Google Maps rating (with number of reviews)
   - TripAdvisor ranking/category
   - Local recommendation or award
   - Personal experience disclosed as such ("We recommend...", "Our favourite...")
8. Never call something "the best" based on model training data alone.

### Practical info
9. Verify ticket prices / price ranges. Note if free entry.
10. Check parking availability and cost.
11. Note family-friendliness, accessibility, and pet policies where relevant.
12. For restaurants: verify cuisine type, price range (€-€€€), and whether
    reservations are needed.

### Attribution
13. End every article with a brief sources note (see existing posts for format).
14. If a claim cannot be verified, remove it or attribute it clearly
    ("According to reviews...", "Locals say...").

## 3. Blog post structure & patterns

Mirror the patterns in existing posts:
- `src/pages/blog/best-restaurants-pombal-portugal.astro`
- `src/pages/blog/discover-abiul-pombal-central-portugal.astro`

### Frontmatter + Schema
Each `.astro` file starts with:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import CTASection from '../../components/CTASection.astro';

const canonicalUrl = 'https://casadosduques.pt/blog/slug-here/';
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: '...',
      description: '...',
      author: { '@type': 'Person', name: 'Casa dos Duques' },
      datePublished: 'YYYY-MM-DD',
      dateModified: 'YYYY-MM-DD',
      image: 'https://casadosduques.pt/images/...',
      publisher: { '@type': 'Organization', name: 'Casa dos Duques' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://casadosduques.pt/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://casadosduques.pt/blog/' },
        { '@type': 'ListItem', position: 3, name: '...', item: canonicalUrl },
      ],
    },
  ],
};
---
```

### Content structure
- **Hero section**: Category badge + date + read time + H1 + compelling dek (1-2 sentences)
- **Body**: Rich HTML in `<article class="max-w-3xl mx-auto px-4 py-12">`
  - Lead paragraph with the hook — a specific observation, surprising fact, or local insight
  - Short H2 sections (4-6 paragraphs max per section)
  - **Practical info boxes** for each venue (use `bg-stone-100 p-4` divs like existing posts)
  - Mix of paragraph lengths — never a wall of text
- **Cross-links inline** in body text, not dumped at the end
- **CTA section**: `<CTASection>` component with booking CTA or related content
- **Sources note**: `<div class="mt-8 p-6 bg-stone-100">` at the bottom

### Category badge
Use one of these (match existing style):
- `Central Portugal` — general region content
- `Food & Dining` — restaurant guides
- `Day Trips` — itinerary/route content
- `Beaches & Nature` — beach, river beach, nature content
- `History & Culture` — monuments, museums, heritage
- `Local Tips` — insider advice, seasonal tips, practical guides

### Slug conventions
- Kebab-case, English keywords (primary language of the site)
- Be specific: `best-restaurants-pombal-portugal` not `restaurants-guide`
- Include location when relevant: `best-day-trips-from-abiul-central-portugal`

### Practical info box template
For each venue/attraction, include:
```html
<div class="bg-stone-100 p-4 mb-4 text-sm">
  <p><strong>📍 Distance from Casa dos Duques:</strong> XX min drive</p>
  <p><strong>📍 Address:</strong> Rua ..., Pombal</p>
  <p><strong>🕐 Hours:</strong> Tue–Sun 10:00–18:00 (Closed Mon)</p>
  <p><strong>💶 Price:</strong> €X entry / Free</p>
  <p><strong>👨‍👩‍👧‍👦 Family-friendly:</strong> Yes / With supervision / Not suitable for young children</p>
  <p><strong>🌐 Web:</strong> <a href="https://..." class="text-terracotta-500 hover:text-terracotta-600 underline"> website.com</a></p>
</div>
```

## 4. Mandatory cross-links (hard gate)

Every blog post must include internal cross-links. Do not ship a draft without them.

### Link targets (priority order)
1. **Related blog posts** — `src/pages/blog/` — previous articles on same region/topic
2. **Guide pages** — `/guide/central-portugal/`, `/guide/pombal/`, `/guide/abiul/`
3. **Site pages** — `/the-house/`, `/things-to-do/`, `/day-trips/`, `/beaches/`, `/location/`
4. **Booking page** — `/booking/` — always mention at least once (usually in CTA + one inline)

### Link rules
- Aim for **2–4 contextual inline links** per post. Relevance beats the quota.
- Place links inline in the body where the reader needs context — not as a dump at the end.
- Use descriptive anchor text: "our guide to Pombal Castle" not "click here".
- Verify every internal link resolves. Check slugs against existing pages.
- When editing an existing post, consider adding a reciprocal link from a related post.

### CTA links
- Always end with a `<CTASection>` linking to `/booking/` or related content.
- The CTA should be natural and contextual — match the article's topic.

## 5. Seasonal & practical considerations

Rental property content must help guests plan their actual stay:

- **Seasonal relevance**: Note if an attraction is seasonal (e.g., river beaches
  are summer-only, some restaurants close in winter). Mention best time of year to visit.
- **Weather context**: Central Portugal has hot summers (30°C+) and mild winters.
  Indoor alternatives for rainy days are valuable.
- **Booking necessities**: If an attraction requires advance booking, say so.
- **Family logistics**: Note stroller access, changing facilities, shade for hot days,
  nearby playgrounds.
- **Combining attractions**: Suggest natural groupings for day trips
  ("Combine Batalha Monastery with a seafood lunch in Nazaré — 30 min apart").
- **Local rhythm**: Mention Portuguese meal times (lunch 12:00–15:00, dinner 19:30–22:00),
  Sunday/Monday closures, and August holiday crowds.

## 6. What makes great rental property content

Beyond the basics, great content for a rental property:

1. **Answers the "what's in it for me?" question** — every article should make the
   reader think "I want to stay there to experience this."
2. **Feels like insider knowledge** — recommendations that feel personal and curated,
   not scraped from a tourist board website. If you don't know, say so.
3. **Saves the guest research time** — they shouldn't need to Google each place
   after reading. Give them everything: hours, prices, distance, parking, tips.
4. **Builds trust in the host** — accurate, honest, well-researched content signals
   that the hosts care about their guests' experience.
5. **Drives action** — every article ends with a clear next step (book, explore
   more guides, contact us with questions).

## 7. Photo integration

Blog posts about travel, food, and destinations need photos. Don't write a draft
without addressing images.

### Ask for photos upfront
Before drafting, ask the user:
- **"Do you have photos for this article?"** — original photos from the host are best
- **"How many photos do you have?"** — helps plan placement
- **"What do they show?"** — so you can reference them in the text

### How many photos per article type
| Article type | Minimum | Ideal | Notes |
|---|---|---|---|
| Restaurant guide (5+ venues) | 3 | 5–8 | One per featured venue if possible; hero + 2-3 venue shots minimum |
| Destination/attraction highlight | 2 | 3–5 | Hero + venue exterior + interior/detail |
| Day-trip itinerary | 3 | 5–8 | One per stop; map screenshot helpful |
| "Best of" list | 3 | 5–8 | One per listed item; hero image essential |
| Local tips / practical guide | 1 | 2–3 | Hero + illustrative detail shots |
| Beach/nature guide | 2 | 3–5 | Hero + beach/landscape shot + detail |

### Image sources (priority order)
1. **Original photos by the host** — best for authenticity and trust. No licensing issues.
2. **Existing site images** — check `src/data/photo-manifest.ts` for already-available images.
3. **Free stock / public domain** — Unsplash, Pexels, Pixabay, Wikimedia Commons.
   Verify license. Credit when required.
4. **Venue's own press/media kit** — some attractions provide press photos.
   Check terms; credit appropriately.

### Image rules
- **Hero image** (used in schema + potentially at top of post): must be high-quality,
  landscape orientation, relevant to the article topic.
- **Body images**: use the `<OptimizedImage>` component from
  `src/components/OptimizedImage.astro`. Check its props before using.
- **Alt text**: descriptive, useful, no keyword stuffing. For venue photos,
  describe what the photo shows: "Interior of Casa das Gatas restaurant showing
  the bar area and exposed stone walls" not "restaurant pombal food".
- **Photo-manifest.ts**: after adding new images, update `src/data/photo-manifest.ts`
  so images are tracked and optimized.
- **External images**: if hotlinking from a CDN or external source, ensure the URL
  is stable and the image won't disappear.
- **No placeholder images in final draft** — every image reference must resolve
  to an actual file or URL.

## 8. Anti-slop enforcement

Before delivering any draft, check:

- [ ] No AI-slop openings ("Nestled in...", "Whether you're a...", "Let's dive in")
- [ ] No filler closings ("In conclusion", "To sum up", "So what are you waiting for?")
- [ ] Paragraph length varies (mix 1-sentence with 3-4 sentence paragraphs)
- [ ] Concrete details beat vague claims — specific distances, prices, names
- [ ] No buzzwords-as-substance ("stunning", "breathtaking", "hidden gem" — show, don't just label)
- [ ] Every "must-visit" or "best" claim is backed by evidence
- [ ] Tone is warm and personal, not corporate or brochure-like

See [style-guide.md](style-guide.md) for the full anti-slop checklist.

## Additional resources

- For frontmatter templates, category reference, cross-link map, and anti-patterns,
  see [style-guide.md](style-guide.md).
- For verified facts about Abiul, Pombal, and the region, see
  `src/content/facts/facts.yaml` and `src/content/destinations/destinations.yaml`.
