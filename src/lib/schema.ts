import { SITE_CONFIG } from '../data/site-config';
import { ROUTE_GROUPS, type LocaleCode } from '../data/routes';

const HERO_IMAGE = '/images/airbnb/467c6107-9824-44ec-98f5-fcc2d62cb186.jpeg';

/**
 * Full-resolution images of the property, used for the Schema.org `image`
 * array. The homepage gallery displays these same photos, so the markup is
 * backed by images visible on the page.
 */
const PROPERTY_IMAGES = [
  '/images/airbnb/467c6107-9824-44ec-98f5-fcc2d62cb186.jpeg', // pool & garden (hero)
  '/images/airbnb/d5facc44-501a-445c-8eb4-94cf90e682dc.jpeg', // exterior
  '/images/airbnb/c1eb8904-37f7-4f82-99e7-cd539bafd98a.jpeg', // bedroom
  '/images/airbnb/16b41c25-33a1-4607-9919-e7076c85ba9c.jpeg', // pool area
  '/images/airbnb/1a43a296-ac44-498b-86ee-c004d600177c.jpeg', // living space
  '/images/airbnb/1e2a954f-adf1-4b6a-8df9-1e23ff619dc4.jpeg', // backyard & garden
  '/images/airbnb/fbe29248-4838-4933-8a45-8cb4fa287fbf.jpeg', // barbecue terrace
  '/images/airbnb/12a0aa1f-692f-4fe2-ad23-0a52059ce32c.jpeg', // interior detail
];

/**
 * The review featured on the homepage pull-quote section. `reviewBody` matches
 * the text displayed on the page so the markup is backed by visible content,
 * satisfying Google's self-serving review guidelines.
 */
const FEATURED_REVIEW = {
  author: 'Ana & Miguel',
  datePublished: '2025-09-15',
  reviewBody:
    'An absolutely stunning house. Every detail has been thought of. ' +
    'The garden and pool are incredible, and the location is perfect for ' +
    'exploring central Portugal.',
  ratingValue: 5,
};

/**
 * Builds a Schema.org VacationRental object for the property homepage.
 *
 * `aggregateRating` and `review` are included because the homepage visibly
 * displays the featured review (pull quote with author and date) and the
 * aggregate rating (4.97, 30 reviews) in the quick-facts bar and review
 * section, which Google requires for review markup.
 */
export function buildVacationRentalSchema(
  locale: LocaleCode = 'en',
  description: string = SITE_CONFIG.description
) {
  const homePath = ROUTE_GROUPS.home[locale] ?? '/';
  const pageUrl = `${SITE_CONFIG.url}${homePath}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    additionalType: 'https://schema.org/House',
    '@id': pageUrl,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'AL',
      value: SITE_CONFIG.alRegistration,
    },
    name: SITE_CONFIG.name,
    description,
    url: pageUrl,
    image: PROPERTY_IMAGES.map((img) => `${SITE_CONFIG.url}${img}`),
    telephone: SITE_CONFIG.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.town,
      postalCode: SITE_CONFIG.address.postcode,
      addressRegion: SITE_CONFIG.address.district,
      addressCountry: 'PT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.coordinates.lat,
      longitude: SITE_CONFIG.coordinates.lng,
    },
    numberOfBedrooms: 4,
    numberOfBathroomsTotal: 3,
    occupancy: { '@type': 'QuantitativeValue', value: 8 },
    containsPlace: [
      { '@type': 'Place', name: 'Private swimming pool' },
      { '@type': 'Place', name: 'Garden', description: '450 m² garden with lounge areas' },
      { '@type': 'Place', name: 'Barbecue terrace' },
    ],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Swimming pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Garden', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Kitchen', value: true },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE_CONFIG.rating,
      reviewCount: SITE_CONFIG.reviewCount,
      bestRating: 5,
    },
    review: {
      '@type': 'Review',
      author: { '@type': 'Person', name: FEATURED_REVIEW.author },
      datePublished: FEATURED_REVIEW.datePublished,
      reviewBody: FEATURED_REVIEW.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: FEATURED_REVIEW.ratingValue,
        bestRating: 5,
      },
    },
  };
}
