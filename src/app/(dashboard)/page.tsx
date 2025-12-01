'use client';

import { useState } from 'react';
import type { SongFeatures } from '@/lib/types';
import { PredictionForm } from '@/components/prediction/prediction-form';
import { PredictionResult } from '@/components/prediction/prediction-result';
import { predictPopularity } from '@/app/actions';

export type PredictionState = {
  prediction?: number;
  explanation?: string;
  error?: string;
};

export default function PredictionPage() {
  const [state, setState] = useState<PredictionState>({});
  const [formKey, setFormKey] = useState(Date.now());
  const [isPending, setIsPending] = useState(false);

  const handlePrediction = async (data: SongFeatures) => {
    setIsPending(true);
    setState({});
    const result = await predictPopularity(data);
    setState(result);
    setIsPending(false);
  };
  
  const handleReset = () => {
    setFormKey(Date.now());
    setState({});
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Song Popularity Prediction</h1>
        <p className="mt-2 text-muted-foreground">
          Use the sliders to input a song's audio features and let our AI model predict its popularity score.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <PredictionForm key={formKey} onPredict={handlePrediction} isPending={isPending} />
        </div>
        <div className="lg:col-span-2">
          <PredictionResult state={state} isPending={isPending} onReset={handleReset} />
        </div>
      </div>
    </div>
  );
}
