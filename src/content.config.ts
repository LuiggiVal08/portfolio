import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    repo: z.string().url(),
    demo: z.string().url().optional(),
    stars: z.number().optional(),
    status: z.enum(['published', 'in-development']),
    metrics: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .default([]),
    architecture: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    milestones: z.array(z.object({ label: z.string(), done: z.boolean() })).default([]),
  }),
});

export const collections = { projects };
