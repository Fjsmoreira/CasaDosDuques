import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');

const failures = [];
const warnings = [];

const expectedRoutes = [
  '/',
  '/the-house/', '/rooms/', '/amenities/', '/garden/', '/location/', '/things-to-do/', '/day-trips/', '/beaches/', '/rates/', '/booking/', '/reviews/', '/contact/', '/privacy/', '/faq/', '/blog/', '/blog/discover-abiul-pombal-central-portugal/',
  '/pt/', '/pt/a-casa/', '/pt/quartos/', '/pt/comodidades/', '/pt/jardim/', '/pt/localizacao/', '/pt/o-que-fazer/', '/pt/passeios/', '/pt/praias/', '/pt/precos/', '/pt/reserva/', '/pt/avaliacoes/', '/pt/contato/', '/pt/privacidade/', '/pt/guia/abiul/',
  '/nl/', '/nl/huis/', '/nl/slaapkamers/', '/nl/voorzieningen/', '/nl/tuin/', '/nl/locatie/', '/nl/activiteiten/', '/nl/daguitstapjes/', '/nl/stranden/', '/nl/tarieven/', '/nl/boeking/', '/nl/reviews/', '/nl/contact/', '/nl/privacy/',
  '/fr/', '/fr/la-maison/', '/fr/chambres/', '/fr/equipements/', '/fr/jardin/', '/fr/emplacement/', '/fr/activites/', '/fr/excursions/', '/fr/plages/', '/fr/tarifs/', '/fr/reservation/', '/fr/avis/', '/fr/contact/', '/fr/confidentialite/',
];

// Compatibility aliases people may type or stale links may keep after language switching.
// Each alias must exist and point users to the canonical translated slug.
const expectedRedirectAliases = {
  // Localized pages must also tolerate English/default slugs under locale prefixes.
  // This catches stale/manual URLs such as /pt/garden/.
  '/pt/the-house/': '/pt/a-casa/',
  '/pt/rooms/': '/pt/quartos/',
  '/pt/amenities/': '/pt/comodidades/',
  '/pt/garden/': '/pt/jardim/',
  '/pt/gallery/': '/pt/jardim/',
  '/pt/location/': '/pt/localizacao/',
  '/pt/things-to-do/': '/pt/o-que-fazer/',
  '/pt/day-trips/': '/pt/passeios/',
  '/pt/beaches/': '/pt/praias/',
  '/pt/rates/': '/pt/precos/',
  '/pt/booking/': '/pt/reserva/',
  '/pt/reviews/': '/pt/avaliacoes/',
  '/pt/contact/': '/pt/contato/',
  '/pt/privacy/': '/pt/privacidade/',
  '/nl/the-house/': '/nl/huis/',
  '/nl/rooms/': '/nl/slaapkamers/',
  '/nl/amenities/': '/nl/voorzieningen/',
  '/nl/garden/': '/nl/tuin/',
  '/nl/gallery/': '/nl/tuin/',
  '/nl/location/': '/nl/locatie/',
  '/nl/things-to-do/': '/nl/activiteiten/',
  '/nl/day-trips/': '/nl/daguitstapjes/',
  '/nl/beaches/': '/nl/stranden/',
  '/nl/rates/': '/nl/tarieven/',
  '/nl/booking/': '/nl/boeking/',
  '/fr/the-house/': '/fr/la-maison/',
  '/fr/rooms/': '/fr/chambres/',
  '/fr/amenities/': '/fr/equipements/',
  '/fr/garden/': '/fr/jardin/',
  '/fr/gallery/': '/fr/jardin/',
  '/fr/location/': '/fr/emplacement/',
  '/fr/things-to-do/': '/fr/activites/',
  '/fr/day-trips/': '/fr/excursions/',
  '/fr/beaches/': '/fr/plages/',
  '/fr/rates/': '/fr/tarifs/',
  '/fr/booking/': '/fr/reservation/',
  '/fr/reviews/': '/fr/avis/',
  '/fr/privacy/': '/fr/confidentialite/',
};

const pagePathForRoute = (route) => {
  const normalized = route.split('?')[0].split('#')[0];
  if (normalized === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, normalized.replace(/^\//, ''), 'index.html');
};

const assetPathForUrl = (url) => path.join(distDir, decodeURIComponent(url.replace(/^\//, '')));

const fileExistsForRoute = (route) => existsSync(pagePathForRoute(route));

const walkHtml = (dir) => {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walkHtml(full));
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
};

if (!existsSync(distDir)) {
  failures.push('dist/ does not exist. Run npm run build before npm run test:links.');
} else {
  for (const route of expectedRoutes) {
    if (!fileExistsForRoute(route)) failures.push(`Missing expected route: ${route}`);
  }

  for (const [alias, target] of Object.entries(expectedRedirectAliases)) {
    const file = pagePathForRoute(alias);
    if (!existsSync(file)) {
      failures.push(`Missing compatibility redirect route: ${alias} -> ${target}`);
      continue;
    }
    const html = readFileSync(file, 'utf8');
    if (!html.includes(target)) {
      failures.push(`Compatibility redirect ${alias} does not reference target ${target}`);
    }
  }

  const htmlFiles = walkHtml(distDir);
  const internalUrlPattern = /\b(?:href|src)=(?:"|')([^"']+)(?:"|')/gi;

  for (const htmlFile of htmlFiles) {
    const html = readFileSync(htmlFile, 'utf8');
    const relPage = '/' + path.relative(distDir, htmlFile).replace(/\\/g, '/').replace(/index\.html$/, '');
    const pageRoute = relPage === '/' ? '/' : relPage;

    for (const match of html.matchAll(internalUrlPattern)) {
      const raw = match[1];
      if (!raw || raw.startsWith('#')) continue;
      if (/^(https?:|mailto:|tel:|sms:|whatsapp:|data:|javascript:)/i.test(raw)) continue;
      if (!raw.startsWith('/')) continue;

      const clean = raw.split('?')[0].split('#')[0];
      if (!clean || clean === '/') continue;
      if (clean.match(/\.[a-z0-9]{2,8}$/i)) {
        if (!existsSync(assetPathForUrl(clean))) failures.push(`${pageRoute} references missing asset ${clean}`);
      } else if (!fileExistsForRoute(clean.endsWith('/') ? clean : `${clean}/`)) {
        failures.push(`${pageRoute} links to missing route ${clean}`);
      }
    }
  }

  const gardenPages = ['/garden/', '/pt/jardim/', '/nl/tuin/', '/fr/jardin/'];
  const badGardenAltTerms = ['bedroom', 'chambre', 'quarto', 'slaapkamer', 'kitchen', 'cuisine', 'cozinha', 'keuken', 'bathroom', 'toilet', 'badkamer'];
  for (const route of gardenPages) {
    const html = readFileSync(pagePathForRoute(route), 'utf8').toLowerCase();
    const imageAlts = [...html.matchAll(/<img[^>]+alt="([^"]*)"/g)].map((m) => m[1]);
    const bad = imageAlts.filter((alt) => badGardenAltTerms.some((term) => alt.includes(term)));
    if (bad.length) failures.push(`${route} garden page has interior-looking image alts: ${bad.join('; ')}`);
  }
}

if (warnings.length) console.warn(warnings.map((w) => `WARN: ${w}`).join('\n'));
if (failures.length) {
  console.error('Site link/route checks failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('Site link/route checks passed.');
