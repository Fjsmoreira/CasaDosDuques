export type PhotoCategory =
  | 'hero/exterior'
  | 'pool'
  | 'garden'
  | 'outdoor dining/BBQ'
  | 'living/interior'
  | 'kitchen'
  | 'bedroom/kids room'
  | 'bedroom/double'
  | 'bathroom'
  | 'surroundings/unknown';

export interface PropertyPhoto {
  filename: string;
  src: string;
  category: PhotoCategory;
  room?: string;
  alt: string;
  confidence: 'high' | 'medium' | 'low';
  notes: string;
  source?: string;
}

const photo = (
  filename: string,
  category: PhotoCategory,
  alt: string,
  notes: string,
  room?: string,
  confidence: PropertyPhoto['confidence'] = 'high',
  source = 'local visual audit; Airbnb gallery cross-check where noted',
): PropertyPhoto => ({ filename, src: `/images/${filename}`, category, room, alt, confidence, notes, source });

// Durable manifest created from a visual audit of all local images in public/images.
// Important: several legacy semantic filenames are wrong and should not be trusted:
// - room-1.jpg is a window/view detail, not a bedroom.
// - room-2.jpg is a garden pergola path, not a bedroom.
// - room-3.jpg and room-4.jpg are bathrooms, not bedrooms.
// - interior-1.jpg is an exterior village lane; interior-2.jpg is a shower detail.
// Airbnb public listing confirmed Bedroom 1-4 thumbnails as:
// a972d33d... (kids bunk), c1eb8904... (double), 6cbce955... (double), f74a9a09... (double/master).
export const propertyPhotos: PropertyPhoto[] = [
  photo('467c6107-9824-44ec-98f5-fcc2d62cb186.jpeg', 'hero/exterior', 'House exterior with lawn and swimming pool', 'Airbnb lead photo; exterior, pool and lawn.'),
  photo('fbe29248-4838-4933-8a45-8cb4fa287fbf.jpeg', 'outdoor dining/BBQ', 'Covered terrace dining table beside the pool', 'Covered dining terrace with pool behind.'),
  photo('6cbce955-d2e0-480c-b318-7eb5e027eb85.jpeg', 'bedroom/double', 'Double bedroom with wall shelves and woven bedspread', 'Airbnb Bedroom 3 thumbnail.', 'Bedroom 3'),
  photo('16b41c25-33a1-4607-9919-e7076c85ba9c.jpeg', 'pool', 'Swimming pool with trees and countryside beyond', 'Pool close-up from terrace.'),
  photo('32bbb262-1336-420a-9f25-403d9a993b80.jpeg', 'pool', 'Pool edge with flowers in the foreground', 'Portrait pool detail.'),
  photo('c1eb8904-37f7-4f82-99e7-cd539bafd98a.jpeg', 'bedroom/double', 'Bright double bedroom with white walls and striped blanket', 'Airbnb Bedroom 2 thumbnail.', 'Bedroom 2'),
  photo('f4cbf764-26d3-48bc-9128-ed4ef90bdbc8.jpeg', 'kitchen', 'Wooden kitchen cabinets and white countertop', 'Kitchen wide view.'),
  photo('ba9a905b-2d7b-4741-ac8f-ceafe2288cf6.jpeg', 'bedroom/double', 'Double bedroom with mirrored wardrobe', 'Double bedroom detail.'),
  photo('bbq-area.jpg', 'outdoor dining/BBQ', 'Covered outdoor dining and BBQ terrace', 'Semantic legacy filename is correct.'),
  photo('garden-4.jpg', 'outdoor dining/BBQ', 'Covered outdoor dining table beside the garden', 'Legacy garden filename, visually outdoor dining.'),
  photo('room-3.jpg', 'bathroom', 'Bathroom sink and shower mirror detail', 'Legacy filename is wrong: bathroom, not room.'),
  photo('aa5ccbfd-b90b-4beb-94ef-47bb2793d886.jpeg', 'bathroom', 'Glass shower and towels in white bathroom', 'Bathroom shower.'),
  photo('3421b389-d232-4fcd-831a-910850539d44.jpeg', 'bathroom', 'Walk-in shower with glass screen', 'Bathroom shower detail.'),
  photo('3fb15595-5eb5-493a-a2db-acccf3593d74.jpeg', 'living/interior', 'Living room with blue sofa, fireplace and stone wall', 'Living room interior.'),
  photo('garden-7.jpg', 'hero/exterior', 'Sunny terrace with loungers outside the house', 'Exterior lounge terrace.'),
  photo('garden-3.jpg', 'garden', 'Lawn and tree in the enclosed garden', 'Garden lawn.'),
  photo('5fa97bc7-031e-4407-8799-c465c5b5d772.jpeg', 'hero/exterior', 'Exterior wall and tiled roof with flower pots', 'Exterior detail.'),
  photo('garden-8.jpg', 'hero/exterior', 'Sun loungers on terrace outside the house', 'Exterior terrace with loungers.'),
  photo('12a0aa1f-692f-4fe2-ad23-0a52059ce32c.jpeg', 'pool', 'Long view across the swimming pool to trees', 'Pool and garden.'),
  photo('a972d33d-086b-46ea-a63d-934ec57827ff.jpeg', 'bedroom/kids room', 'Kids bunk-bed room with window', 'Airbnb Bedroom 1 thumbnail.', 'Bedroom 1 — kids room'),
  photo('e6d96cd5-9736-4c30-a293-367d8b4cd757.jpeg', 'kitchen', 'Kitchen with wooden cabinetry and open door to terrace', 'Kitchen wide view.'),
  photo('caac1c63-2ec3-40e0-ab60-8ffac86d6a4f.jpeg', 'bedroom/double', 'Double bedroom with blue throw and wall art', 'Double bedroom.'),
  photo('4f5427af-54d4-4841-8b24-2bda8d41ac1b.jpeg', 'hero/exterior', 'Exterior terrace with sun loungers and red-tile roof', 'Exterior terrace.'),
  photo('1a376321-6b91-452b-b36a-14ed0d4f14eb.jpeg', 'bathroom', 'Shower fixture on white bathroom wall', 'Bathroom shower detail.'),
  photo('0697bfa9-a8f7-4847-93d7-8155ecbb030a.jpeg', 'bedroom/kids room', 'Kids bunk-bed room from window side', 'Kids room.'),
  photo('c00d422d-c41f-40e8-bf01-21eeaef3c621.jpeg', 'pool', 'Swimming pool with tree line beyond', 'Pool and garden.'),
  photo('9c380723-8989-4b59-b95e-46486192237b.jpeg', 'living/interior', 'Dining table and living room under exposed stone wall', 'Dining/living interior.'),
  photo('8f58fe7c-43b4-4dd7-aaf6-9e7c07521903.jpeg', 'bedroom/double', 'Double bedroom with striped blanket and cushions', 'Double bedroom.'),
  photo('garden-1.jpg', 'hero/exterior', 'House exterior with lawn and pool', 'Exterior plus pool.'),
  photo('67eb1ea5-e048-4ace-a621-f97f213052bf.jpeg', 'outdoor dining/BBQ', 'Outdoor lounge seating on circular stone terrace', 'Outdoor seating and BBQ-adjacent terrace.'),
  photo('30ecfe34-26b5-45b5-b729-3a338987a597.jpeg', 'surroundings/unknown', 'View from interior window over fields', 'Window/view detail; not a bedroom.', undefined, 'medium'),
  photo('d5facc44-501a-445c-8eb4-94cf90e682dc.jpeg', 'hero/exterior', 'Front facade of Casa dos Duques', 'House front exterior.'),
  photo('1e2a954f-adf1-4b6a-8df9-1e23ff619dc4.jpeg', 'garden', 'Garden lawn with tree and timber fence', 'Garden lawn.'),
  photo('52f77659-d47c-4b83-9823-6762fbb714a9.jpeg', 'bathroom', 'Bathroom sink and mirror', 'Bathroom vanity detail.'),
  photo('a880a2a5-2a4c-4a69-bbf3-ee8b217829ae.jpeg', 'bathroom', 'Bathroom vanity, mirror and shower area', 'Bathroom.'),
  photo('92a74fc0-5f5a-456c-885c-a1d3a1f67171.jpeg', 'hero/exterior', 'House exterior with pool and lawn', 'Exterior and pool.'),
  photo('f48f0984-a176-4bf0-8a72-289b652a8c2a.jpeg', 'bedroom/double', 'Double bedroom with window and striped blanket', 'Double bedroom.'),
  photo('garden-5.jpg', 'outdoor dining/BBQ', 'Covered outdoor dining terrace beside the pool', 'Outdoor dining.'),
  photo('eba59c3f-e9bc-4479-85b3-9b71460df598.jpeg', 'living/interior', 'Reading chair in interior corner', 'Interior chair detail.'),
  photo('83b04082-dc26-4260-aa7c-4b894b9377ea.jpeg', 'bathroom', 'Bathroom sink and toilet', 'Bathroom vanity and toilet.'),
  photo('1b5f5cec-a4ff-402a-b6a8-ac852df5f7a3.jpeg', 'bedroom/double', 'Double bed viewed from doorway', 'Double bedroom.'),
  photo('8e5cd75a-368c-4bbb-ba94-f098a1594aa6.jpg', 'surroundings/unknown', 'Host portrait', 'Airbnb host/profile image; not a property photo. Do not use in property galleries.', undefined, 'high', 'Airbnb host profile'),
  photo('room-4.jpg', 'bathroom', 'Bathroom sink and shower area', 'Legacy filename is wrong: bathroom, not room.'),
  photo('07b9108e-9496-4e8b-a883-0ada355917af.jpeg', 'bathroom', 'Portuguese tile detail in bathroom', 'Bathroom tile detail.', undefined, 'medium'),
  photo('b4215093-be7a-472d-a49c-f39938807710.jpeg', 'living/interior', 'Living room with blue sofa and fireplace', 'Living room.'),
  photo('pool-2.jpg', 'outdoor dining/BBQ', 'Outdoor seating on circular terrace by stone wall', 'Legacy filename says pool, but visually outdoor lounge terrace.'),
  photo('house-exterior.jpg', 'hero/exterior', 'Front facade of Casa dos Duques', 'Semantic legacy filename is correct.'),
  photo('3c344b84-9df6-466c-a31b-4d5a116ee6e3.jpeg', 'kitchen', 'Wooden kitchen with black-framed door and window', 'Kitchen.'),
  photo('interior-2.jpg', 'bathroom', 'Shower fixture in white bathroom', 'Legacy filename is generic/wrong: bathroom shower.'),
  photo('c4a0d1e5-d45e-435f-947f-75224253c085.jpeg', 'outdoor dining/BBQ', 'Covered outdoor dining table under tiled roof', 'Outdoor dining.'),
  photo('04be686a-a4fe-484c-be4e-590aa81cf11a.jpeg', 'bedroom/double', 'Double bedroom with shelf, plants and chair', 'Double bedroom.'),
  photo('garden-2.jpg', 'pool', 'Swimming pool with trees beyond', 'Pool view.'),
  photo('room-2.jpg', 'garden', 'Leafy pergola garden path', 'Legacy filename is wrong: garden path, not room.'),
  photo('hero.jpg', 'hero/exterior', 'Long exterior street-side view of Casa dos Duques', 'Hero/exterior street approach.'),
  photo('outdoor-dining.jpg', 'outdoor dining/BBQ', 'Outdoor lounge seating on circular terrace', 'Semantic legacy filename is correct.'),
  photo('d4c8ef4b-2fa0-495b-baba-57104867048a.jpeg', 'surroundings/unknown', 'Village lane with houses and greenery', 'Exterior surroundings lane.'),
  photo('586cc2f2-d73e-46c6-b613-024fa6889014.jpeg', 'surroundings/unknown', 'View from interior window over countryside', 'Window/countryside view; not bedroom.', undefined, 'medium'),
  photo('room-1.jpg', 'surroundings/unknown', 'Window view over countryside', 'Legacy filename is wrong: window/view detail, not room.'),
  photo('7a941336-07dc-4aaf-a5c7-b2b6263acce8.jpeg', 'hero/exterior', 'Terrace with sun loungers and countryside views', 'Exterior sun terrace.'),
  photo('1dd5fdd0-afd8-486b-a733-b5b538999d2a.jpeg', 'hero/exterior', 'Exterior lane and side of the house with flowers', 'House exterior lane.'),
  photo('a7be8d24-1c80-44c6-98b9-0a2da7019da9.jpeg', 'garden', 'Garden detail with greenery and decorative pots', 'Garden detail.'),
  photo('f74a9a09-e91d-4d49-b205-f50e9d5bbe40.jpeg', 'bedroom/double', 'Master double bedroom with wall art and window', 'Airbnb Bedroom 4 thumbnail.', 'Bedroom 4 — master suite'),
  photo('2eccd20c-17ee-4072-8a05-bd5d2359ddd2.jpeg', 'bathroom', 'Glass shower screen and white bathroom wall', 'Bathroom shower.'),
  photo('1a43a296-ac44-498b-86ee-c004d600177c.jpeg', 'living/interior', 'Living room with blue sofa facing arched doorway', 'Living room.'),
  photo('pool-1.jpg', 'pool', 'Long swimming pool with lawn and trees', 'Semantic legacy filename is correct.'),
  photo('bce96ce7-bdf5-4cc2-9662-018f3054904f.jpeg', 'surroundings/unknown', 'Stone-paved village entrance lane', 'Surroundings/arrival lane.'),
  photo('99676dc0-f6e7-4874-9043-3c6e996dc460.jpeg', 'living/interior', 'Dining table and blue sofa in living area', 'Dining/living interior.'),
  photo('d1b8dc3d-257c-4b3a-99f6-ec0ae3c76544.jpeg', 'outdoor dining/BBQ', 'Outdoor dining table beside stone wall', 'Outdoor dining/terrace.'),
  photo('f5eb62e5-b50f-438e-ae96-8c6188e75ad9.jpeg', 'living/interior', 'Living room with blue sofa and exposed stone wall', 'Living room.'),
  photo('hero-alt.jpg', 'pool', 'Swimming pool and terrace with countryside view', 'Alternate hero; pool focus.'),
  photo('a5bf17db-4423-4bbd-b565-5ddf4391110d.jpeg', 'bedroom/double', 'Double bedroom with wall art and window', 'Double bedroom, same space as master.', 'Bedroom 4 — master suite'),
  photo('2f21c46e-f9c5-41eb-9b22-264e8158eb9b.jpeg', 'hero/exterior', 'Sun loungers with parasol beside the house', 'Exterior sun terrace.'),
  photo('9dbb9841-e49d-4a5a-883c-194a3c74997b.jpeg', 'bedroom/kids room', 'Kids bunk-bed room', 'Kids room.'),
  photo('6ad793f2-00b0-4b33-9dd1-50c95412e783.jpeg', 'kitchen', 'Kitchen hob and wooden cabinets', 'Kitchen detail.'),
  photo('3470c83a-e010-42ef-b4ea-316344bc69e9.jpeg', 'hero/exterior', 'Street-side exterior of the house and garage', 'Exterior street side.'),
  photo('garden-6.jpg', 'hero/exterior', 'Sun loungers and parasol beside the house', 'Exterior sun terrace.'),
  photo('d9b3dddf-d32c-4f9d-b466-b682a127f4a4.jpeg', 'bedroom/double', 'Close-up of double bed in white room', 'Double bedroom detail.'),
  photo('interior-1.jpg', 'surroundings/unknown', 'Village lane lined with greenery', 'Legacy filename is wrong: exterior surroundings, not interior.'),
  photo('574169fe-28ed-4cf5-a856-fe60fe2e2d92.jpeg', 'bathroom', 'Bathroom sink and mirror close-up', 'Bathroom vanity detail.'),
];

export const photosByCategory = (category: PhotoCategory) => propertyPhotos.filter((photo) => photo.category === category);

export const poolGardenPhotos = propertyPhotos.filter((photo) =>
  ['pool', 'garden', 'outdoor dining/BBQ'].includes(photo.category),
);

export const exteriorPhotos = propertyPhotos.filter((photo) => photo.category === 'hero/exterior');

export const roomInteriorPhotos = propertyPhotos.filter((photo) =>
  ['bedroom/kids room', 'bedroom/double', 'living/interior', 'kitchen', 'bathroom'].includes(photo.category),
);

export const bedroomPhotos = propertyPhotos.filter((photo) =>
  ['bedroom/kids room', 'bedroom/double'].includes(photo.category),
);

export const bathroomPhotos = photosByCategory('bathroom');

export const featuredRoomPhotos = {
  bedroom1: propertyPhotos.find((photo) => photo.filename === 'a972d33d-086b-46ea-a63d-934ec57827ff.jpeg')!,
  bedroom2: propertyPhotos.find((photo) => photo.filename === 'c1eb8904-37f7-4f82-99e7-cd539bafd98a.jpeg')!,
  bedroom3: propertyPhotos.find((photo) => photo.filename === '6cbce955-d2e0-480c-b318-7eb5e027eb85.jpeg')!,
  bedroom4: propertyPhotos.find((photo) => photo.filename === 'f74a9a09-e91d-4d49-b205-f50e9d5bbe40.jpeg')!,
};

export const featuredBedroomGallery = [
  featuredRoomPhotos.bedroom1,
  featuredRoomPhotos.bedroom2,
  featuredRoomPhotos.bedroom3,
  featuredRoomPhotos.bedroom4,
  propertyPhotos.find((photo) => photo.filename === '04be686a-a4fe-484c-be4e-590aa81cf11a.jpeg')!,
  propertyPhotos.find((photo) => photo.filename === '1b5f5cec-a4ff-402a-b6a8-ac852df5f7a3.jpeg')!,
];
