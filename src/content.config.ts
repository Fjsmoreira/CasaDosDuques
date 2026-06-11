import { defineCollection, z } from 'astro:content';

const amenities = defineCollection({
  type: 'data',
  schema: z.object({
    category: z.string(),
    name: z.string(),
    icon: z.string(),
    available: z.boolean(),
    description: z.string().optional(),
    safety_note: z.string().optional(),
  }),
});

const rooms = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    bed_type: z.string(),
    ensuite: z.boolean(),
    max_guests: z.number(),
    description: z.string(),
    photos: z.array(z.string()).optional(),
    floor: z.number().optional(),
  }),
});

const destinations = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    types: z.array(z.string()),
    significance: z.string(),
    drive_from_pombal: z.string(),
    drive_from_abiul: z.string().optional(),
    unesco: z.boolean(),
    wikipedia_url: z.string().optional(),
    description: z.string(),
    image: z.string().optional(),
  }),
});

const facts = defineCollection({
  type: 'data',
  schema: z.object({
    topic: z.enum(['abiul', 'pombal', 'region']),
    title: z.string(),
    body: z.string(),
    source_url: z.string().optional(),
    verified: z.boolean(),
  }),
});

const reviews = defineCollection({
  type: 'data',
  schema: z.object({
    guest_name: z.string(),
    date: z.string(),
    rating: z.number(),
    text: z.string(),
    source: z.enum(['airbnb', 'direct']),
    language: z.enum(['en', 'pt', 'nl', 'fr']),
    featured: z.boolean(),
  }),
});

const faq = defineCollection({
  type: 'data',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.enum(['booking', 'house', 'location', 'pool', 'parking']),
    priority: z.number(),
  }),
});

export const collections = {
  amenities,
  rooms,
  destinations,
  facts,
  reviews,
  faq,
};
