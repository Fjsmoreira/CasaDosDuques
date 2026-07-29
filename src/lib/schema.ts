import { SITE_CONFIG } from '../data/site-config';
import { ROUTE_GROUPS, type LocaleCode } from '../data/routes';

const HERO_IMAGE = '/images/airbnb/467c6107-9824-44ec-98f5-fcc2d62cb186.jpeg';

/**
 * Builds a Schema.org VacationRental object for the property homepage.
 *
 * Intentionally omits `aggregateRating`: Google requires review markup to be
 * backed by reviews visible on the same page, which the homepage does not have.
 * The rating is still shown as plain text in the quick-facts bar.
 */
export function buildVacationRentalSchema(
  locale: LocaleCode = 'en',
  description: string = SITE_CONFIG.description
) {
  const homePath = ROUTE_GROUPS.home[locale] ?? '/';

  return {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    name: SITE_CONFIG.name,
    description,
    url: `${SITE_CONFIG.url}${homePath}`,
    image: `${SITE_CONFIG.url}${HERO_IMAGE}`,
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
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Swimming pool' },
      { '@type': 'LocationFeatureSpecification', name: 'Garden' },
      { '@type': 'LocationFeatureSpecification', name: 'Free parking' },
      { '@type': 'LocationFeatureSpecification', name: 'WiFi' },
      { '@type': 'LocationFeatureSpecification', name: 'Kitchen' },
    ],
  };
}
