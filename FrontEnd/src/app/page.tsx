'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

// Definición de tipos
interface SongFeatures {
  danceability: number;
  energy: number;
  valence: number;
  tempo: number;
  acousticness: number;
  instrumentalness: number;
  speechiness: number; // Añadido
  liveness: number;    // Añadido
}

interface PredictionResult {
  prediction: 0 | 1;
  probability: number;
}

// Iconos (puedes reemplazarlos con lucide-react si lo tienes instalado)
const CheckCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const XCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

const Loader = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);


export default function HitPredictorPage() {
  const [features, setFeatures] = useState<SongFeatures>({
    danceability: 0.5,
    energy: 0.7,
    valence: 0.5,
    tempo: 120,
    acousticness: 0.2,
    instrumentalness: 0.0,
    speechiness: 0.1, // Valor inicial
    liveness: 0.15,   // Valor inicial
  });
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFeatures(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(features),
      });

      if (!response.ok) {
        throw new Error('El servidor no está disponible. Inténtalo de nuevo más tarde.');
      }

      const data = await response.json();
      setResult(data);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
    } finally {
      setIsLoading(false);
    }
  };

  const FeatureSlider = ({ name, label, min, max, step, value }: { name: keyof SongFeatures, label: string, min: number, max: number, step: number, value: number }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label htmlFor={name} className="font-medium text-gray-300">{label}</label>
        <span className="text-sm font-mono px-2 py-1 rounded-md bg-gray-700 text-white">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        id={name}
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-green-500"
      />
    </div>
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 selection:bg-green-500/30">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Spotify Hit Predictor
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Ajusta las características de la canción y predice si será un HIT.
          </p>
        </header>

        <main className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-green-500/10 border border-gray-700">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeatureSlider name="danceability" label="Bailabilidad" min={0} max={1} step={0.01} value={features.danceability} />
              <FeatureSlider name="energy" label="Energía" min={0} max={1} step={0.01} value={features.energy} />
              <FeatureSlider name="valence" label="Positividad (Valence)" min={0} max={1} step={0.01} value={features.valence} />
               <FeatureSlider name="speechiness" label="Palabras Habladas" min={0} max={1} step={0.01} value={features.speechiness} />
              <FeatureSlider name="acousticness" label="Acústica" min={0} max={1} step={0.01} value={features.acousticness} />
              <FeatureSlider name="instrumentalness" label="Instrumental" min={0} max={1} step={0.01} value={features.instrumentalness} />
              <FeatureSlider name="liveness" label="Directo (Liveness)" min={0} max={1} step={0.01} value={features.liveness} />
               <div className="md:col-span-2">
                 <FeatureSlider name="tempo" label="Tempo (BPM)" min={50} max={200} step={1} value={features.tempo} />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 text-lg"
            >
              {isLoading ? <Loader /> : null}
              <span>{isLoading ? 'Analizando...' : '¡Predecir Hit!'}</span>
            </button>
          </form>

          {error && (
            <div className="px-8 pb-8">
              <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg flex items-center space-x-2">
                <XCircle />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {result && (
            <div className="px-8 pb-8">
              <div className={`rounded-lg p-6 border ${result.prediction === 1 ? 'bg-green-900/50 border-green-500' : 'bg-gray-700/50 border-gray-600'}`}>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${result.prediction === 1 ? 'bg-green-500/20' : 'bg-gray-600/50'}`}>
                    {result.prediction === 1 ? <CheckCircle /> : <XCircle />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {result.prediction === 1 ? '¡Es un HIT!' : 'Es un FLOP.'}
                    </h3>
                    <p className="text-3xl font-mono mt-1">
                      {(result.probability * 100).toFixed(1)}%
                      <span className="text-lg font-sans text-gray-400 ml-2">de probabilidad</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
        
        <footer className="text-center mt-10 text-gray-500 text-sm">
          <p>Desarrollado con ❤️ por un Desarrollador Senior Frontend.</p>
        </footer>
      </div>
    </div>
  );
}
