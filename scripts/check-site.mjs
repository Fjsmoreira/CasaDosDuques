import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');

const failures = [];
const warnings = [];

const expectedRoutes = [
  '/',
  '/the-house/', '/rooms/', '/amenities/', '/garden/', '/location/', '/things-to-do/', '/day-trips/', '/beaches/', '/rates/', '/booking/', '/reviews/', '/contact/', '/privacy/', '/faq/',
  '/blog/', '/blog/discover-abiul-pombal-central-portugal/', '/blog/best-restaurants-pombal-portugal/',
  '/guide/abiul/', '/guide/pombal/', '/guide/central-portugal/',
  '/pt/', '/pt/a-casa/', '/pt/quartos/', '/pt/comodidades/', '/pt/jardim/', '/pt/localizacao/', '/pt/o-que-fazer/', '/pt/passeios/', '/pt/praias/', '/pt/precos/', '/pt/reserva/', '/pt/avaliacoes/', '/pt/contato/', '/pt/privacidade/', '/pt/faq/',
  '/pt/guia/abiul/', '/pt/guia/pombal/', '/pt/guia/central-portugal/',
  '/pt/blog/', '/pt/blog/melhores-restaurantes-pombal-portugal/', '/pt/blog/descobrir-abiul-pombal-centro-portugal/',
  '/nl/', '/nl/huis/', '/nl/slaapkamers/', '/nl/voorzieningen/', '/nl/tuin/', '/nl/locatie/', '/nl/activiteiten/', '/nl/daguitstapjes/', '/nl/stranden/', '/nl/tarieven/', '/nl/boeking/', '/nl/reviews/', '/nl/contact/', '/nl/privacy/', '/nl/faq/',
  '/nl/blog/', '/nl/blog/beste-restaurants-pombal-portugal/', '/nl/blog/ontdek-abiul-pombal-centraal-portugal/',
  '/fr/', '/fr/la-maison/', '/fr/chambres/', '/fr/equipements/', '/fr/jardin/', '/fr/emplacement/', '/fr/activites/', '/fr/excursions/', '/fr/plages/', '/fr/tarifs/', '/fr/reservation/', '/fr/avis/', '/fr/contact/', '/fr/confidentialite/', '/fr/faq/',
  '/fr/blog/', '/fr/blog/meilleurs-restaurants-pombal-portugal/', '/fr/blog/decouvrir-abiul-pombal-centre-portugal/',
];

// Locale alias redirects are handled at the nginx level (301 rewrites).
// See nginx.conf for the full list of English-slug-under-locale-prefix → canonical path redirects.

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
