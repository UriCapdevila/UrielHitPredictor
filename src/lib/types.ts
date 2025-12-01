import { z } from "zod";

export const songFeaturesSchema = z.object({
  danceability: z.number().min(0).max(1),
  energy: z.number().min(0).max(1),
  key: z.number().min(0).max(11),
  loudness: z.number().min(-60).max(0),
  mode: z.number().min(0).max(1),
  speechiness: z.number().min(0).max(1),
  acousticness: z.number().min(0).max(1),
  instrumentalness: z.number().min(0).max(1),
  liveness: z.number().min(0).max(1),
  valence: z.number().min(0).max(1),
  tempo: z.number().min(50).max(250),
  duration_ms: z.number().min(60000).max(600000),
});

export type SongFeatures = z.infer<typeof songFeaturesSchema>;
