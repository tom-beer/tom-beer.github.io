import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    thumb: z.string().optional(),
    draft: z.boolean().optional()
  }),
});

const publications = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    date: z.coerce.date(),
    doi: z.string().optional(),
    abstract: z.string().optional(),
    venue: z.string().optional(),
    url_pdf: z.string().optional(),
    url_code: z.string().optional(),
    url_project: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = { blog, publications };
