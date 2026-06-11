export const SITE_CONFIG = {
  name: 'Casa dos Duques',
  tagline: 'Your Holiday Home in Central Portugal',
  url: 'https://casadosduques.pt',
  description: 'A meticulously renovated 90-year-old holiday home in Abiul, Pombal. Sleeps 8 guests with pool, 450m² garden, and stunning views of Central Portugal.',
  contact: {
    email: 'fernando@casadosduques.pt',
    phone: '+31 631 683 221',
    whatsapp: '+31 631 683 221',
  },
  address: {
    street: 'Rua D. Afonso Henriques n 9',
    town: 'Abiul',
    postcode: '3100-012',
    district: 'Pombal',
    region: 'Leiria',
    country: 'Portugal',
  },
  coordinates: {
    lat: 39.8726,
    lng: -8.5386,
  },
  alRegistration: '128717/AL',
  airbnbUrl: 'https://www.airbnb.com/rooms/655043259718365192',
  social: {
    instagram: '#',
    facebook: '#',
  },
  rating: 4.97,
  reviewCount: 30,
} as const;

export const NAV_LINKS: Record<string, Array<{ label: string; path: string }>> = {
  en: [
    { label: 'Home', path: '/' },
    { label: 'The House', path: '/the-house/' },
    { label: 'Rooms', path: '/rooms/' },
    { label: 'Location', path: '/location/' },
    { label: 'Things to Do', path: '/things-to-do/' },
    { label: 'Gallery', path: '/garden/' },
    { label: 'Rates', path: '/rates/' },
    { label: 'Contact', path: '/contact/' },
    { label: 'Blog', path: '/blog/' },
  ],
  pt: [
    { label: 'Início', path: '/pt/' },
    { label: 'A Casa', path: '/pt/a-casa/' },
    { label: 'Quartos', path: '/pt/quartos/' },
    { label: 'Localização', path: '/pt/localizacao/' },
    { label: 'O Que Fazer', path: '/pt/o-que-fazer/' },
    { label: 'Jardim', path: '/pt/jardim/' },
    { label: 'Preços', path: '/pt/precos/' },
    { label: 'Contacto', path: '/pt/contato/' },
    { label: 'Blog', path: '/pt/blog/' },
  ],
  nl: [
    { label: 'Home', path: '/nl/' },
    { label: 'Het Huis', path: '/nl/het-huis/' },
    { label: 'Kamers', path: '/nl/kamers/' },
    { label: 'Locatie', path: '/nl/locatie/' },
    { label: 'Wat te Doen', path: '/nl/wat-te-doen/' },
    { label: 'Tuin', path: '/nl/tuin/' },
    { label: 'Prijzen', path: '/nl/prijzen/' },
    { label: 'Contact', path: '/nl/contact/' },
    { label: 'Blog', path: '/nl/blog/' },
  ],
  fr: [
    { label: 'Accueil', path: '/fr/' },
    { label: 'La Maison', path: '/fr/la-maison/' },
    { label: 'Chambres', path: '/fr/chambres/' },
    { label: 'Emplacement', path: '/fr/emplacement/' },
    { label: 'Activités', path: '/fr/choses-a-faire/' },
    { label: 'Jardin', path: '/fr/jardin/' },
    { label: 'Tarifs', path: '/fr/tarifs/' },
    { label: 'Contact', path: '/fr/contact/' },
    { label: 'Blog', path: '/fr/blog/' },
  ],
};

export const LOCALES = [
  { code: 'en', label: 'English', path: '' },
  { code: 'pt', label: 'Português', path: 'pt' },
  { code: 'nl', label: 'Nederlands', path: 'nl' },
  { code: 'fr', label: 'Français', path: 'fr' },
] as const;

export const WP_REDIRECTS: Array<{ from: string; to: string }> = [
  { from: '/a-casa/', to: '/the-house/' },
  { from: '/a-casa-2/', to: '/pt/a-casa/' },
  { from: '/comodidades/', to: '/amenities/' },
  { from: '/galeria/', to: '/garden/' },
  { from: '/localizacao/', to: '/location/' },
  { from: '/actividades/', to: '/things-to-do/' },
  { from: '/reservas/', to: '/booking/' },
  { from: '/contactos/', to: '/contact/' },
  { from: '/politica-de-privacidade/', to: '/privacy/' },
];
