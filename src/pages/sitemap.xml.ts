import type { APIRoute } from 'astro';
import { ROUTE_GROUPS, LOCALE_CODES, type RouteKey } from '../data/routes';

export const prerender = true;

const FALLBACK_ORIGIN = 'https://casadosduques.pt';

export const GET: APIRoute = ({ site }) => {
  const origin = (site?.origin ?? FALLBACK_ORIGIN).replace(/\/$/, '');
  const abs = (path: string) => `${origin}${path}`;
  const lastmod = new Date().toISOString().split('T')[0];

  const entries: string[] = [];

  for (const key of Object.keys(ROUTE_GROUPS) as RouteKey[]) {
    const group = ROUTE_GROUPS[key];
    const locales = LOCALE_CODES.filter((locale) => group[locale]);

    const alternates = locales
      .map(
        (locale) =>
          `    <xhtml:link rel="alternate" hreflang="${locale}" href="${abs(group[locale]!)}" />`
      )
      .join('\n');

    const xDefault = group.en
      ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(group.en)}" />`
      : '';

    for (const locale of locales) {
      entries.push(
        `  <url>\n    <loc>${abs(group[locale]!)}</loc>\n${alternates}${xDefault}\n    <lastmod>${lastmod}</lastmod>\n  </url>`
      );
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
