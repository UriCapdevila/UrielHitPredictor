'use server';

/**
 * @fileOverview Generates initial training data for the Spotify Hit Predictor project.
 *
 * - generateInitialData - A function that generates initial training data.
 * - InitialDataInput - The input type for the generateInitialData function.
 * - InitialDataOutput - The return type for the generateInitialData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InitialDataInputSchema = z.object({
  numberOfSongs: z
    .number()
    .default(10)
    .describe('The number of songs to generate training data for.'),
});
export type InitialDataInput = z.infer<typeof InitialDataInputSchema>;

const InitialDataOutputSchema = z.object({
  trainingData: z.string().describe('The generated training data in CSV format.'),
});
export type InitialDataOutput = z.infer<typeof InitialDataOutputSchema>;

export async function generateInitialData(input: InitialDataInput): Promise<InitialDataOutput> {
  return initialDataFlow(input);
}

const initialDataPrompt = ai.definePrompt({
  name: 'initialDataPrompt',
  input: {schema: InitialDataInputSchema},
  output: {schema: InitialDataOutputSchema},
  prompt: `You are a data scientist generating training data for a music hit predictor.

  Generate {{numberOfSongs}} rows of CSV data with the following columns: "danceability", "energy", "key", "loudness", "mode", "speechiness", "acousticness", "instrumentalness", "liveness", "valence", "tempo", "duration_ms", "popularity".

  "popularity" should be an integer between 0 and 100, representing the song's popularity.
  The other fields should be numerical values representing audio features of a song.

  Here is the CSV data:\n`,
});

const initialDataFlow = ai.defineFlow(
  {
    name: 'initialDataFlow',
    inputSchema: InitialDataInputSchema,
    outputSchema: InitialDataOutputSchema,
  },
  async input => {
    const {output} = await initialDataPrompt(input);
    return output!;
  }
);
