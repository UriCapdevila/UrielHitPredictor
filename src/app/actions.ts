'use server';

import type { SongFeatures } from '@/lib/types';
import { songFeaturesSchema } from '@/lib/types';
import { interpretModelOutput } from '@/ai/flows/model-interpretation';
import { generateInitialData as generateInitialDataAI } from '@/ai/flows/initial-data-prompt';
import { suggestFeatures as suggestFeaturesAI } from '@/ai/flows/feature-engineering-assistance';
import type { SuggestFeaturesInput } from '@/ai/flows/feature-engineering-assistance';

// A simple weighted model to simulate a real prediction
const calculatePopularity = (features: SongFeatures): number => {
  const weights = {
    danceability: 15,
    energy: 10,
    loudness: 20, // Loudness is often a strong indicator
    speechiness: -10, // Less speech is often better for hits
    acousticness: -20, // Less acoustic is often more popular
    instrumentalness: -15, // Non-instrumental is generally more popular
    liveness: -5,
    valence: 10, // Positive tracks are slightly more popular
    tempo: 5,
    duration_ms: -5, // Very long songs can be less popular
    key: 1,
    mode: 2,
  };

  // Normalize loudness from [-60, 0] to [0, 1]
  const normalizedLoudness = (features.loudness + 60) / 60;
  // Normalize tempo from [50, 250] to [0, 1]
  const normalizedTempo = (features.tempo - 50) / 200;
  // Normalize duration from [60000, 600000] to [0, 1]
  const normalizedDuration = (features.duration_ms - 60000) / 540000;

  let score = 0;
  score += features.danceability * weights.danceability;
  score += features.energy * weights.energy;
  score += normalizedLoudness * weights.loudness;
  score += features.speechiness * weights.speechiness;
  score += features.acousticness * weights.acousticness;
  score += features.instrumentalness * weights.instrumentalness;
  score += features.liveness * weights.liveness;
  score += features.valence * weights.valence;
  score += normalizedTempo * weights.tempo;
  score += normalizedDuration * weights.duration_ms;

  // Add a base score to bring the range up
  const baseScore = 40;
  let finalScore = baseScore + score;

  // Clamp the score between 0 and 100
  finalScore = Math.max(0, Math.min(100, finalScore));

  return finalScore;
};

export async function predictPopularity(features: SongFeatures): Promise<{ prediction?: number, explanation?: string, error?: string }> {
  const validation = songFeaturesSchema.safeParse(features);
  if (!validation.success) {
    return { error: 'Invalid input features.' };
  }

  try {
    const prediction = calculatePopularity(features);
    const { explanation } = await interpretModelOutput({ features, prediction });
    return { prediction, explanation };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'An unexpected error occurred during prediction.' };
  }
}

export async function getInitialData(input: { numberOfSongs: number }): Promise<{ trainingData?: string, error?: string }> {
    try {
        const { trainingData } = await generateInitialDataAI(input);
        return { trainingData };
    } catch (e: any) {
        console.error(e);
        return { error: e.message || 'An unexpected error occurred while generating data.' };
    }
}

export async function getFeatureSuggestions(input: SuggestFeaturesInput): Promise<{ suggestedFeatures?: string, error?: string }> {
    try {
        const { suggestedFeatures } = await suggestFeaturesAI(input);
        return { suggestedFeatures };
    } catch (e: any) {
        console.error(e);
        return { error: e.message || 'An unexpected error occurred while getting suggestions.' };
    }
}
