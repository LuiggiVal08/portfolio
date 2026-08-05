import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    longDescription: z.string().optional(),
    tags: z.array(z.string()),
    repo: z.string().url(),
    demo: z.string().url().optional(),
    stars: z.number().optional(),
    featured: z.boolean().default(false),
    status: z.enum(['published', 'in-development']).default('published'),
  }),
});

export const collections = { projects };
