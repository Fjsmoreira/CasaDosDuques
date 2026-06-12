export type LocaleCode = 'en' | 'pt' | 'nl' | 'fr';
export type RouteKey =
  | 'home'
  | 'house'
  | 'rooms'
  | 'amenities'
  | 'garden'
  | 'location'
  | 'thingsToDo'
  | 'dayTrips'
  | 'beaches'
  | 'rates'
  | 'booking'
  | 'reviews'
  | 'contact'
  | 'privacy';

export const LOCALE_CODES: LocaleCode[] = ['en', 'pt', 'nl', 'fr'];

export const ROUTE_GROUPS: Record<RouteKey, Record<LocaleCode, string>> = {
  home: {
    en: '/',
    pt: '/pt/',
    nl: '/nl/',
    fr: '/fr/',
  },
  house: {
    en: '/the-house/',
    pt: '/pt/a-casa/',
    nl: '/nl/huis/',
    fr: '/fr/la-maison/',
  },
  rooms: {
    en: '/rooms/',
    pt: '/pt/quartos/',
    nl: '/nl/slaapkamers/',
    fr: '/fr/chambres/',
  },
  amenities: {
    en: '/amenities/',
    pt: '/pt/comodidades/',
    nl: '/nl/voorzieningen/',
    fr: '/fr/equipements/',
  },
  garden: {
    en: '/garden/',
    pt: '/pt/jardim/',
    nl: '/nl/tuin/',
    fr: '/fr/jardin/',
  },
  location: {
    en: '/location/',
    pt: '/pt/localizacao/',
    nl: '/nl/locatie/',
    fr: '/fr/emplacement/',
  },
  thingsToDo: {
    en: '/things-to-do/',
    pt: '/pt/o-que-fazer/',
    nl: '/nl/activiteiten/',
    fr: '/fr/activites/',
  },
  dayTrips: {
    en: '/day-trips/',
    pt: '/pt/passeios/',
    nl: '/nl/daguitstapjes/',
    fr: '/fr/excursions/',
  },
  beaches: {
    en: '/beaches/',
    pt: '/pt/praias/',
    nl: '/nl/stranden/',
    fr: '/fr/plages/',
  },
  rates: {
    en: '/rates/',
    pt: '/pt/precos/',
    nl: '/nl/tarieven/',
    fr: '/fr/tarifs/',
  },
  booking: {
    en: '/booking/',
    pt: '/pt/reserva/',
    nl: '/nl/boeking/',
    fr: '/fr/reservation/',
  },
  reviews: {
    en: '/reviews/',
    pt: '/pt/avaliacoes/',
    nl: '/nl/reviews/',
    fr: '/fr/avis/',
  },
  contact: {
    en: '/contact/',
    pt: '/pt/contato/',
    nl: '/nl/contact/',
    fr: '/fr/contact/',
  },
  privacy: {
    en: '/privacy/',
    pt: '/pt/privacidade/',
    nl: '/nl/privacy/',
    fr: '/fr/confidentialite/',
  },
};

const normalizePath = (path: string) => {
  if (!path) return '/';
  const withoutQuery = path.split('?')[0].split('#')[0];
  if (withoutQuery === '/') return '/';
  return withoutQuery.endsWith('/') ? withoutQuery : `${withoutQuery}/`;
};

export const getLocaleFromPath = (path: string): LocaleCode => {
  const match = normalizePath(path).match(/^\/(pt|nl|fr)(?:\/|$)/);
  return (match?.[1] as LocaleCode | undefined) || 'en';
};

export const getRouteKeyFromPath = (path: string): RouteKey | undefined => {
  const normalized = normalizePath(path);
  return (Object.entries(ROUTE_GROUPS).find(([, paths]) =>
    Object.values(paths).includes(normalized)
  )?.[0] || undefined) as RouteKey | undefined;
};

export const getLocalizedPath = (path: string, targetLocale: LocaleCode): string => {
  const routeKey = getRouteKeyFromPath(path);
  if (routeKey) return ROUTE_GROUPS[routeKey][targetLocale];

  // Unknown pages do not have translated equivalents. Send language-switch clicks
  // to the locale homepage instead of inventing 404 paths such as /nl/blog/.
  return ROUTE_GROUPS.home[targetLocale];
};
