'use server';
/**
 * @fileOverview A flow to interpret the output of the model and explain feature importance.
 *
 * - interpretModelOutput - A function that handles the model output interpretation process.
 * - InterpretModelOutputInput - The input type for the interpretModelOutput function.
 * - InterpretModelOutputOutput - The return type for the interpretModelOutput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InterpretModelOutputInputSchema = z.object({
  features: z.record(z.number()).describe('A record of song features and their corresponding values.'),
  prediction: z.number().describe('The predicted popularity score of the song.'),
});
export type InterpretModelOutputInput = z.infer<typeof InterpretModelOutputInputSchema>;

const InterpretModelOutputOutputSchema = z.object({
  explanation: z.string().describe('An explanation of which features are most important for the prediction.'),
});
export type InterpretModelOutputOutput = z.infer<typeof InterpretModelOutputOutputSchema>;

export async function interpretModelOutput(input: InterpretModelOutputInput): Promise<InterpretModelOutputOutput> {
  return interpretModelOutputFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interpretModelOutputPrompt',
  input: {schema: InterpretModelOutputInputSchema},
  output: {schema: InterpretModelOutputOutputSchema},
  prompt: `You are a data scientist explaining the output of a song popularity prediction model.

The model predicted a popularity score of {{prediction}} based on the following features:

{{#each features}}
  {{@key}}: {{this}}
{{/each}}

Explain which features were most important for this prediction and why.`,
});

const interpretModelOutputFlow = ai.defineFlow(
  {
    name: 'interpretModelOutputFlow',
    inputSchema: InterpretModelOutputInputSchema,
    outputSchema: InterpretModelOutputOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
