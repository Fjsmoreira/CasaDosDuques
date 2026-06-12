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
  | 'interior/detail'
  | 'surroundings/unknown'
  | 'airbnb-unknown';
export interface PropertyPhoto {
  filename: string;
  src: string;
  sourceUrl: string;
  airbnbId: string;
  airbnbLabel: string;
  category: PhotoCategory;
  room?: string;
  alt: string;
  confidence: 'high' | 'medium' | 'low';
  notes: string;
  source: string;
}
const AIRBNB_SOURCE = 'Airbnb public listing HTML/photo tour for https://www.airbnb.com/rooms/655043259718365192, extracted without AI vision; labels/grouping are Airbnb accessibility labels and sleeping-arrangement text.';
const photo = (
  filename: string,
  airbnbId: string,
  airbnbLabel: string,
  category: PhotoCategory,
  room: string,
  alt: string,
  notes: string,
  confidence: PropertyPhoto['confidence'] = 'high',
): PropertyPhoto => ({
  filename,
  src: `/images/airbnb/${filename}`,
  sourceUrl: `https://a0.muscache.com/im/pictures/miso/Hosting-655043259718365192/original/${filename}`,
  airbnbId,
  airbnbLabel,
  category,
  room,
  alt,
  confidence,
  notes,
  source: AIRBNB_SOURCE,
});
// Durable Airbnb-only photo manifest. Do not infer room/category from old local filenames.
// Classification source of truth: Airbnb public photo-tour accessibility labels such as 'Bedroom 2 image 1', 'Full bathroom 1 image 2', 'Pool image 1'.
// Bedroom 1 is categorized as kids/bunk because Airbnb's public sleeping-arrangement section says 'Bedroom 1 — 1 bunk bed'.
// Airbnb labels all outdoor terrace/garden images simply as 'Backyard'; those are kept as garden unless Airbnb explicitly says Pool/Exterior. Outdoor dining/BBQ remains unclear from public labels.
export const propertyPhotos: PropertyPhoto[] = [
  photo('1a43a296-ac44-498b-86ee-c004d600177c.jpeg', '1466383985', 'Living room image 1', 'living/interior', 'Living room', 'Living room photo 1 from Airbnb gallery', 'Airbnb label: Living room image 1. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('b4215093-be7a-472d-a49c-f39938807710.jpeg', '1466383947', 'Living room image 2', 'living/interior', 'Living room', 'Living room photo 2 from Airbnb gallery', 'Airbnb label: Living room image 2. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('3fb15595-5eb5-493a-a2db-acccf3593d74.jpeg', '1466383989', 'Living room image 3', 'living/interior', 'Living room', 'Living room photo 3 from Airbnb gallery', 'Airbnb label: Living room image 3. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('f5eb62e5-b50f-438e-ae96-8c6188e75ad9.jpeg', '1466383991', 'Living room image 4', 'living/interior', 'Living room', 'Living room photo 4 from Airbnb gallery', 'Airbnb label: Living room image 4. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('f4cbf764-26d3-48bc-9128-ed4ef90bdbc8.jpeg', '1467153206', 'Full kitchen image 1', 'kitchen', 'Full kitchen', 'Full kitchen photo 1 from Airbnb gallery', 'Airbnb label: Full kitchen image 1. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('3c344b84-9df6-466c-a31b-4d5a116ee6e3.jpeg', '1466383935', 'Full kitchen image 2', 'kitchen', 'Full kitchen', 'Full kitchen photo 2 from Airbnb gallery', 'Airbnb label: Full kitchen image 2. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('e6d96cd5-9736-4c30-a293-367d8b4cd757.jpeg', '1466383972', 'Full kitchen image 3', 'kitchen', 'Full kitchen', 'Full kitchen photo 3 from Airbnb gallery', 'Airbnb label: Full kitchen image 3. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('6ad793f2-00b0-4b33-9dd1-50c95412e783.jpeg', '1466384030', 'Full kitchen image 4', 'kitchen', 'Full kitchen', 'Full kitchen photo 4 from Airbnb gallery', 'Airbnb label: Full kitchen image 4. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('99676dc0-f6e7-4874-9043-3c6e996dc460.jpeg', '1466383979', 'Dining area image 1', 'living/interior', 'Dining area', 'Dining area photo 1 from Airbnb gallery', 'Airbnb label: Dining area image 1. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('9c380723-8989-4b59-b95e-46486192237b.jpeg', '1466383912', 'Dining area image 2', 'living/interior', 'Dining area', 'Dining area photo 2 from Airbnb gallery', 'Airbnb label: Dining area image 2. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('a972d33d-086b-46ea-a63d-934ec57827ff.jpeg', '1466383913', 'Bedroom 1 image 1', 'bedroom/kids room', 'Bedroom 1 — Airbnb sleeping arrangement: 1 bunk bed', 'Bedroom 1 photo 1 from Airbnb gallery (bunk-bed room per sleeping arrangement)', 'Airbnb label: Bedroom 1 image 1. Grouped by Airbnb public photo tour; no AI/vision classification used. Sleeping-arrangement section identifies Bedroom 1 as 1 bunk bed.'),
  photo('0697bfa9-a8f7-4847-93d7-8155ecbb030a.jpeg', '1466383915', 'Bedroom 1 image 2', 'bedroom/kids room', 'Bedroom 1 — Airbnb sleeping arrangement: 1 bunk bed', 'Bedroom 1 photo 2 from Airbnb gallery (bunk-bed room per sleeping arrangement)', 'Airbnb label: Bedroom 1 image 2. Grouped by Airbnb public photo tour; no AI/vision classification used. Sleeping-arrangement section identifies Bedroom 1 as 1 bunk bed.'),
  photo('9dbb9841-e49d-4a5a-883c-194a3c74997b.jpeg', '1466384010', 'Bedroom 1 image 3', 'bedroom/kids room', 'Bedroom 1 — Airbnb sleeping arrangement: 1 bunk bed', 'Bedroom 1 photo 3 from Airbnb gallery (bunk-bed room per sleeping arrangement)', 'Airbnb label: Bedroom 1 image 3. Grouped by Airbnb public photo tour; no AI/vision classification used. Sleeping-arrangement section identifies Bedroom 1 as 1 bunk bed.'),
  photo('c1eb8904-37f7-4f82-99e7-cd539bafd98a.jpeg', '1466383901', 'Bedroom 2 image 1', 'bedroom/double', 'Bedroom 2', 'Bedroom 2 photo 1 from Airbnb gallery', 'Airbnb label: Bedroom 2 image 1. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('8f58fe7c-43b4-4dd7-aaf6-9e7c07521903.jpeg', '1466383902', 'Bedroom 2 image 2', 'bedroom/double', 'Bedroom 2', 'Bedroom 2 photo 2 from Airbnb gallery', 'Airbnb label: Bedroom 2 image 2. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('1b5f5cec-a4ff-402a-b6a8-ac852df5f7a3.jpeg', '1466383905', 'Bedroom 2 image 3', 'bedroom/double', 'Bedroom 2', 'Bedroom 2 photo 3 from Airbnb gallery', 'Airbnb label: Bedroom 2 image 3. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('f48f0984-a176-4bf0-8a72-289b652a8c2a.jpeg', '1466383908', 'Bedroom 2 image 4', 'bedroom/double', 'Bedroom 2', 'Bedroom 2 photo 4 from Airbnb gallery', 'Airbnb label: Bedroom 2 image 4. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('6cbce955-d2e0-480c-b318-7eb5e027eb85.jpeg', '1466383903', 'Bedroom 3 image 1', 'bedroom/double', 'Bedroom 3', 'Bedroom 3 photo 1 from Airbnb gallery', 'Airbnb label: Bedroom 3 image 1. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('d9b3dddf-d32c-4f9d-b466-b682a127f4a4.jpeg', '1466383909', 'Bedroom 3 image 2', 'bedroom/double', 'Bedroom 3', 'Bedroom 3 photo 2 from Airbnb gallery', 'Airbnb label: Bedroom 3 image 2. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('04be686a-a4fe-484c-be4e-590aa81cf11a.jpeg', '1466383997', 'Bedroom 3 image 3', 'bedroom/double', 'Bedroom 3', 'Bedroom 3 photo 3 from Airbnb gallery', 'Airbnb label: Bedroom 3 image 3. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('eba59c3f-e9bc-4479-85b3-9b71460df598.jpeg', '1429458604', 'Bedroom 3 image 4', 'bedroom/double', 'Bedroom 3', 'Bedroom 3 photo 4 from Airbnb gallery', 'Airbnb label: Bedroom 3 image 4. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('f74a9a09-e91d-4d49-b205-f50e9d5bbe40.jpeg', '1466383904', 'Bedroom 4 image 1', 'bathroom', 'Bedroom 4 ensuite bathroom', 'Bedroom 4 ensuite shower/bath photo from Airbnb gallery', 'Airbnb label says Bedroom 4 image 1, but visual QA confirms this is a bathroom shower/bathtub image, not a bedroom.'),
  photo('ba9a905b-2d7b-4741-ac8f-ceafe2288cf6.jpeg', '1466383921', 'Bedroom 4 image 2', 'bedroom/double', 'Bedroom 4', 'Bedroom 4 photo 2 from Airbnb gallery', 'Airbnb label: Bedroom 4 image 2. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('83b04082-dc26-4260-aa7c-4b894b9377ea.jpeg', '1466383931', 'Bedroom 4 image 3', 'bathroom', 'Bedroom 4 ensuite bathroom', 'Bedroom 4 ensuite vanity/toilet photo from Airbnb gallery', 'Airbnb label says Bedroom 4 image 3, but visual QA confirms this is a bathroom vanity/toilet image, not a bedroom.'),
  photo('a5bf17db-4423-4bbd-b565-5ddf4391110d.jpeg', '1466384018', 'Bedroom 4 image 4', 'bedroom/double', 'Bedroom 4', 'Bedroom 4 photo 4 from Airbnb gallery', 'Airbnb label: Bedroom 4 image 4. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('caac1c63-2ec3-40e0-ab60-8ffac86d6a4f.jpeg', '1466384022', 'Bedroom 4 image 5', 'bedroom/double', 'Bedroom 4', 'Bedroom 4 photo 5 from Airbnb gallery', 'Airbnb label: Bedroom 4 image 5. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('574169fe-28ed-4cf5-a856-fe60fe2e2d92.jpeg', '1466383907', 'Full bathroom 1 image 1', 'bathroom', 'Full bathroom 1', 'Full bathroom 1 photo 1 from Airbnb gallery', 'Airbnb label: Full bathroom 1 image 1. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('3421b389-d232-4fcd-831a-910850539d44.jpeg', '1466383964', 'Full bathroom 1 image 2', 'bathroom', 'Full bathroom 1', 'Full bathroom 1 photo 2 from Airbnb gallery', 'Airbnb label: Full bathroom 1 image 2. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('aa5ccbfd-b90b-4beb-94ef-47bb2793d886.jpeg', '1466384006', 'Full bathroom 1 image 3', 'bathroom', 'Full bathroom 1', 'Full bathroom 1 photo 3 from Airbnb gallery', 'Airbnb label: Full bathroom 1 image 3. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('1a376321-6b91-452b-b36a-14ed0d4f14eb.jpeg', '1466383911', 'Full bathroom 2 image 1', 'bathroom', 'Full bathroom 2', 'Full bathroom 2 photo 1 from Airbnb gallery', 'Airbnb label: Full bathroom 2 image 1. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('a880a2a5-2a4c-4a69-bbf3-ee8b217829ae.jpeg', '1466383927', 'Full bathroom 2 image 2', 'bathroom', 'Full bathroom 2', 'Full bathroom 2 photo 2 from Airbnb gallery', 'Airbnb label: Full bathroom 2 image 2. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('52f77659-d47c-4b83-9823-6762fbb714a9.jpeg', '1466383938', 'Full bathroom 2 image 3', 'bathroom', 'Full bathroom 2', 'Full bathroom 2 photo 3 from Airbnb gallery', 'Airbnb label: Full bathroom 2 image 3. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('467c6107-9824-44ec-98f5-fcc2d62cb186.jpeg', '1466384040', 'Backyard image 1', 'garden', 'Backyard / garden area', 'Backyard photo 1 from Airbnb gallery', 'Airbnb label: Backyard image 1. Grouped by Airbnb public photo tour; no AI/vision classification used. Airbnb does not distinguish garden vs terrace/outdoor dining/BBQ in the label.'),
  photo('67eb1ea5-e048-4ace-a621-f97f213052bf.jpeg', '1466384056', 'Backyard image 2', 'garden', 'Backyard / garden area', 'Backyard photo 2 from Airbnb gallery', 'Airbnb label: Backyard image 2. Grouped by Airbnb public photo tour; no AI/vision classification used. Airbnb does not distinguish garden vs terrace/outdoor dining/BBQ in the label.'),
  photo('d1b8dc3d-257c-4b3a-99f6-ec0ae3c76544.jpeg', '1466384061', 'Backyard image 3', 'garden', 'Backyard / garden area', 'Backyard photo 3 from Airbnb gallery', 'Airbnb label: Backyard image 3. Grouped by Airbnb public photo tour; no AI/vision classification used. Airbnb does not distinguish garden vs terrace/outdoor dining/BBQ in the label.'),
  photo('7a941336-07dc-4aaf-a5c7-b2b6263acce8.jpeg', '1429458504', 'Backyard image 4', 'garden', 'Backyard / garden area', 'Backyard photo 4 from Airbnb gallery', 'Airbnb label: Backyard image 4. Grouped by Airbnb public photo tour; no AI/vision classification used. Airbnb does not distinguish garden vs terrace/outdoor dining/BBQ in the label.'),
  photo('4f5427af-54d4-4841-8b24-2bda8d41ac1b.jpeg', '1429458444', 'Backyard image 5', 'garden', 'Backyard / garden area', 'Backyard photo 5 from Airbnb gallery', 'Airbnb label: Backyard image 5. Grouped by Airbnb public photo tour; no AI/vision classification used. Airbnb does not distinguish garden vs terrace/outdoor dining/BBQ in the label.'),
  photo('2f21c46e-f9c5-41eb-9b22-264e8158eb9b.jpeg', '1466384035', 'Backyard image 6', 'garden', 'Backyard / garden area', 'Backyard photo 6 from Airbnb gallery', 'Airbnb label: Backyard image 6. Grouped by Airbnb public photo tour; no AI/vision classification used. Airbnb does not distinguish garden vs terrace/outdoor dining/BBQ in the label.'),
  photo('586cc2f2-d73e-46c6-b613-024fa6889014.jpeg', '1466384051', 'Backyard image 7', 'garden', 'Backyard / garden area', 'Backyard photo 7 from Airbnb gallery', 'Airbnb label: Backyard image 7. Grouped by Airbnb public photo tour; no AI/vision classification used. Airbnb does not distinguish garden vs terrace/outdoor dining/BBQ in the label.'),
  photo('fbe29248-4838-4933-8a45-8cb4fa287fbf.jpeg', '1466384067', 'Backyard image 8', 'garden', 'Backyard / garden area', 'Backyard photo 8 from Airbnb gallery', 'Airbnb label: Backyard image 8. Grouped by Airbnb public photo tour; no AI/vision classification used. Airbnb does not distinguish garden vs terrace/outdoor dining/BBQ in the label.'),
  photo('c4a0d1e5-d45e-435f-947f-75224253c085.jpeg', '1466384072', 'Backyard image 9', 'garden', 'Backyard / garden area', 'Backyard photo 9 from Airbnb gallery', 'Airbnb label: Backyard image 9. Grouped by Airbnb public photo tour; no AI/vision classification used. Airbnb does not distinguish garden vs terrace/outdoor dining/BBQ in the label.'),
  photo('2eccd20c-17ee-4072-8a05-bd5d2359ddd2.jpeg', '1466384103', 'Backyard image 10', 'garden', 'Backyard / garden area', 'Backyard photo 10 from Airbnb gallery', 'Airbnb label: Backyard image 10. Grouped by Airbnb public photo tour; no AI/vision classification used. Airbnb does not distinguish garden vs terrace/outdoor dining/BBQ in the label.'),
  photo('1e2a954f-adf1-4b6a-8df9-1e23ff619dc4.jpeg', '1466384108', 'Backyard image 11', 'garden', 'Backyard / garden area', 'Backyard photo 11 from Airbnb gallery', 'Airbnb label: Backyard image 11. Grouped by Airbnb public photo tour; no AI/vision classification used. Airbnb does not distinguish garden vs terrace/outdoor dining/BBQ in the label.'),
  photo('a7be8d24-1c80-44c6-98b9-0a2da7019da9.jpeg', '1429458675', 'Backyard image 12', 'garden', 'Backyard / garden area', 'Backyard photo 12 from Airbnb gallery', 'Airbnb label: Backyard image 12. Grouped by Airbnb public photo tour; no AI/vision classification used. Airbnb does not distinguish garden vs terrace/outdoor dining/BBQ in the label.'),
  photo('5fa97bc7-031e-4407-8799-c465c5b5d772.jpeg', '1429458509', 'Backyard image 13', 'garden', 'Backyard / garden area', 'Backyard photo 13 from Airbnb gallery', 'Airbnb label: Backyard image 13. Grouped by Airbnb public photo tour; no AI/vision classification used. Airbnb does not distinguish garden vs terrace/outdoor dining/BBQ in the label.'),
  photo('07b9108e-9496-4e8b-a883-0ada355917af.jpeg', '1429458592', 'Backyard image 14', 'interior/detail', 'Blue-and-white ceramic tile detail', 'Architectural tile detail from Airbnb gallery', 'Airbnb label says Backyard image 14, but visual QA confirms this is a blue-and-white ceramic tile/wall detail and should not be shown in Pool & Garden.'),
  photo('bce96ce7-bdf5-4cc2-9662-018f3054904f.jpeg', '1432302239', 'Exterior image 1', 'hero/exterior', 'Exterior / arrival area', 'Exterior photo 1 from Airbnb gallery', 'Airbnb label: Exterior image 1. Grouped by Airbnb public photo tour; no AI/vision classification used. Exterior/arrival grouping is used for house/exterior context, not room interiors.'),
  photo('d5facc44-501a-445c-8eb4-94cf90e682dc.jpeg', '1466383951', 'Exterior image 2', 'hero/exterior', 'Exterior / arrival area', 'Exterior photo 2 from Airbnb gallery', 'Airbnb label: Exterior image 2. Grouped by Airbnb public photo tour; no AI/vision classification used. Exterior/arrival grouping is used for house/exterior context, not room interiors.'),
  photo('3470c83a-e010-42ef-b4ea-316344bc69e9.jpeg', '1466383959', 'Exterior image 3', 'hero/exterior', 'Exterior / arrival area', 'Exterior photo 3 from Airbnb gallery', 'Airbnb label: Exterior image 3. Grouped by Airbnb public photo tour; no AI/vision classification used. Exterior/arrival grouping is used for house/exterior context, not room interiors.'),
  photo('1dd5fdd0-afd8-486b-a733-b5b538999d2a.jpeg', '1466384095', 'Exterior image 4', 'hero/exterior', 'Exterior / arrival area', 'Exterior photo 4 from Airbnb gallery', 'Airbnb label: Exterior image 4. Grouped by Airbnb public photo tour; no AI/vision classification used. Exterior/arrival grouping is used for house/exterior context, not room interiors.'),
  photo('d4c8ef4b-2fa0-495b-baba-57104867048a.jpeg', '1430032093', 'Exterior image 5', 'hero/exterior', 'Exterior / arrival area', 'Exterior photo 5 from Airbnb gallery', 'Airbnb label: Exterior image 5. Grouped by Airbnb public photo tour; no AI/vision classification used. Exterior/arrival grouping is used for house/exterior context, not room interiors.'),
  photo('30ecfe34-26b5-45b5-b729-3a338987a597.jpeg', '1429458460', 'Exterior image 6', 'interior/detail', 'Window view detail', 'Inside-looking-out window view from Airbnb gallery', 'Airbnb label says Exterior image 6, but visual QA confirms this is an inside-looking-out window/view photo and should not be shown in House Exterior.'),
  photo('16b41c25-33a1-4607-9919-e7076c85ba9c.jpeg', '1466384078', 'Pool image 1', 'pool', 'Pool area', 'Pool photo 1 from Airbnb gallery', 'Airbnb label: Pool image 1. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('c00d422d-c41f-40e8-bf01-21eeaef3c621.jpeg', '1466384084', 'Pool image 2', 'pool', 'Pool area', 'Pool photo 2 from Airbnb gallery', 'Airbnb label: Pool image 2. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('92a74fc0-5f5a-456c-885c-a1d3a1f67171.jpeg', '1466384088', 'Pool image 3', 'pool', 'Pool area', 'Pool photo 3 from Airbnb gallery', 'Airbnb label: Pool image 3. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('12a0aa1f-692f-4fe2-ad23-0a52059ce32c.jpeg', '1466384098', 'Pool image 4', 'pool', 'Pool area', 'Pool photo 4 from Airbnb gallery', 'Airbnb label: Pool image 4. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
  photo('32bbb262-1336-420a-9f25-403d9a993b80.jpeg', '1429458424', 'Pool image 5', 'pool', 'Pool area', 'Pool photo 5 from Airbnb gallery', 'Airbnb label: Pool image 5. Grouped by Airbnb public photo tour; no AI/vision classification used.'),
];

export const photosByCategory = (category: PhotoCategory) => propertyPhotos.filter((photo) => photo.category === category);

export const poolGardenPhotos = propertyPhotos.filter((photo) =>
  ['pool', 'garden', 'outdoor dining/BBQ'].includes(photo.category),
);

export const exteriorPhotos = propertyPhotos.filter((photo) => photo.category === 'hero/exterior');

export const roomInteriorPhotos = propertyPhotos.filter((photo) =>
  ['bedroom/kids room', 'bedroom/double', 'living/interior', 'kitchen', 'bathroom', 'interior/detail'].includes(photo.category),
);

export const bedroomPhotos = propertyPhotos.filter((photo) =>
  ['bedroom/kids room', 'bedroom/double'].includes(photo.category),
);

export const bathroomPhotos = photosByCategory('bathroom');

export const airbnbUnknownPhotos = photosByCategory('airbnb-unknown');

export const featuredRoomPhotos = {
  bedroom1: propertyPhotos.find((photo) => photo.airbnbLabel === 'Bedroom 1 image 1')!,
  bedroom2: propertyPhotos.find((photo) => photo.airbnbLabel === 'Bedroom 2 image 1')!,
  bedroom3: propertyPhotos.find((photo) => photo.airbnbLabel === 'Bedroom 3 image 1')!,
  bedroom4: propertyPhotos.find((photo) => photo.airbnbLabel === 'Bedroom 4 image 2')!,
};

export const featuredBedroomGallery = [
  featuredRoomPhotos.bedroom1,
  featuredRoomPhotos.bedroom2,
  featuredRoomPhotos.bedroom3,
  featuredRoomPhotos.bedroom4,
  propertyPhotos.find((photo) => photo.airbnbLabel === 'Bedroom 3 image 3')!,
  propertyPhotos.find((photo) => photo.airbnbLabel === 'Bedroom 2 image 3')!,
];

export const homeFeaturePhotos = {
  hero: propertyPhotos.find((photo) => photo.filename === '467c6107-9824-44ec-98f5-fcc2d62cb186.jpeg')!,
  houseExterior: propertyPhotos.find((photo) => photo.filename === 'd5facc44-501a-445c-8eb4-94cf90e682dc.jpeg')!,
  backyard: propertyPhotos.find((photo) => photo.airbnbLabel === 'Backyard image 1')!,
  pool: propertyPhotos.find((photo) => photo.airbnbLabel === 'Pool image 1')!,
  terrace: propertyPhotos.find((photo) => photo.airbnbLabel === 'Backyard image 8')!,
  garden: propertyPhotos.find((photo) => photo.airbnbLabel === 'Backyard image 11')!,
};
