'use server';

/**
 * @fileOverview An AI agent for suggesting new audio features or transformations to improve model predictive power.
 *
 * - suggestFeatures - A function that suggests new audio features or transformations.
 * - SuggestFeaturesInput - The input type for the suggestFeatures function.
 * - SuggestFeaturesOutput - The return type for the suggestFeatures function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFeaturesInputSchema = z.object({
  existingFeatures: z
    .string()
    .describe('A description of the existing audio features in the dataset.'),
  modelType: z
    .string()
    .describe(
      'The type of machine learning model being used (e.g., logistic regression, random forest).' + 'Include the loss function and regularization if applicable.'
    ),
  targetVariable: z.string().describe('Description of the target variable being predicted.'),
  datasetSize: z.string().describe('The size of the dataset being used.'),
});
export type SuggestFeaturesInput = z.infer<typeof SuggestFeaturesInputSchema>;

const SuggestFeaturesOutputSchema = z.object({
  suggestedFeatures: z
    .string()
    .describe(
      'A list of suggested new audio features or transformations of existing features that might improve the model.' + 'Explain why these new features will improve the model.'
    ),
});
export type SuggestFeaturesOutput = z.infer<typeof SuggestFeaturesOutputSchema>;

export async function suggestFeatures(input: SuggestFeaturesInput): Promise<SuggestFeaturesOutput> {
  return suggestFeaturesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFeaturesPrompt',
  input: {schema: SuggestFeaturesInputSchema},
  output: {schema: SuggestFeaturesOutputSchema},
  prompt: `You are an expert data scientist. You are helping a colleague improve the predictive power of their machine learning model for song popularity.

  They have provided the following information about their project:

  Existing audio features: {{{existingFeatures}}}
  Model type: {{{modelType}}}
  Target variable: {{{targetVariable}}}
  Dataset size: {{{datasetSize}}}

  Suggest a list of new audio features or transformations of existing features that might improve the model. Explain why these features will improve the model.  Focus on audio feature engineering that can be extracted from the Spotify API using Spotipy. The Spotify API provides a variety of audio features such as danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, tempo, duration_ms, time_signature.
  Do not suggest techniques unrelated to feature engineering.
  Return the output in a well structured manner.
  `,
});

const suggestFeaturesFlow = ai.defineFlow(
  {
    name: 'suggestFeaturesFlow',
    inputSchema: SuggestFeaturesInputSchema,
    outputSchema: SuggestFeaturesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
