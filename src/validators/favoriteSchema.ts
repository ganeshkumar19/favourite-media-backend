import { z } from "zod";

export const favoriteSchema = z.object({
  title: z.string().min(1),
  type: z.enum(["Movie", "TV Show"]),
  director: z.string().min(1),
  budget: z.string(),
  location: z.string(),
  duration: z.string(),
  yearOrTime: z.string(),
});

export type FavoriteInput = z.infer<typeof favoriteSchema>;