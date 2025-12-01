'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SongFeatures } from '@/lib/types';
import { songFeaturesSchema } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type PredictionFormProps = {
  onPredict: (data: SongFeatures) => void;
  isPending: boolean;
};

const featureDetails = {
    danceability: "How suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.",
    energy: "A perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy.",
    key: "The key the track is in. Integers map to pitches using standard Pitch Class notation.",
    loudness: "The overall loudness of a track in decibels (dB).",
    mode: "Indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.",
    speechiness: "Detects the presence of spoken words in a track.",
    acousticness: "A confidence measure from 0.0 to 1.0 of whether the track is acoustic.",
    instrumentalness: "Predicts whether a track contains no vocals. 'Ooh' and 'aah' sounds are treated as instrumental in this context.",
    liveness: "Detects the presence of an audience in the recording.",
    valence: "A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric).",
    tempo: "The overall estimated tempo of a track in beats per minute (BPM).",
    duration_ms: "The duration of the track in milliseconds.",
};

export function PredictionForm({ onPredict, isPending }: PredictionFormProps) {
  const form = useForm<SongFeatures>({
    resolver: zodResolver(songFeaturesSchema),
    defaultValues: {
      danceability: 0.6,
      energy: 0.7,
      key: 7,
      loudness: -5,
      mode: 1,
      speechiness: 0.08,
      acousticness: 0.1,
      instrumentalness: 0.0,
      liveness: 0.15,
      valence: 0.5,
      tempo: 120,
      duration_ms: 200000,
    },
  });

  const onSubmit = (data: SongFeatures) => {
    onPredict(data);
  };
  
  const formatDuration = (ms: number) => {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audio Features</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <FormField
                    control={form.control}
                    name="danceability"
                    render={({ field }) => (
                    <FormItem>
                        <TooltipProvider><Tooltip><TooltipTrigger asChild><FormLabel>Danceability ({field.value.toFixed(2)})</FormLabel></TooltipTrigger><TooltipContent><p>{featureDetails.danceability}</p></TooltipContent></Tooltip></TooltipProvider>
                        <FormControl>
                        <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            max={1}
                            step={0.01}
                            disabled={isPending}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="energy"
                    render={({ field }) => (
                    <FormItem>
                        <TooltipProvider><Tooltip><TooltipTrigger asChild><FormLabel>Energy ({field.value.toFixed(2)})</FormLabel></TooltipTrigger><TooltipContent><p>{featureDetails.energy}</p></TooltipContent></Tooltip></TooltipProvider>
                        <FormControl>
                        <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            max={1}
                            step={0.01}
                            disabled={isPending}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="valence"
                    render={({ field }) => (
                    <FormItem>
                        <TooltipProvider><Tooltip><TooltipTrigger asChild><FormLabel>Valence ({field.value.toFixed(2)})</FormLabel></TooltipTrigger><TooltipContent><p>{featureDetails.valence}</p></TooltipContent></Tooltip></TooltipProvider>
                        <FormControl>
                        <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            max={1}
                            step={0.01}
                            disabled={isPending}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="loudness"
                    render={({ field }) => (
                    <FormItem>
                        <TooltipProvider><Tooltip><TooltipTrigger asChild><FormLabel>Loudness ({field.value.toFixed(1)} dB)</FormLabel></TooltipTrigger><TooltipContent><p>{featureDetails.loudness}</p></TooltipContent></Tooltip></TooltipProvider>
                        <FormControl>
                        <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            min={-60}
                            max={0}
                            step={0.1}
                            disabled={isPending}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="tempo"
                    render={({ field }) => (
                    <FormItem>
                        <TooltipProvider><Tooltip><TooltipTrigger asChild><FormLabel>Tempo ({field.value.toFixed(0)} BPM)</FormLabel></TooltipTrigger><TooltipContent><p>{featureDetails.tempo}</p></TooltipContent></Tooltip></TooltipProvider>
                        <FormControl>
                        <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            min={50}
                            max={250}
                            step={1}
                            disabled={isPending}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration_ms"
                    render={({ field }) => (
                    <FormItem>
                        <TooltipProvider><Tooltip><TooltipTrigger asChild><FormLabel>Duration ({formatDuration(field.value)})</FormLabel></TooltipTrigger><TooltipContent><p>{featureDetails.duration_ms}</p></TooltipContent></Tooltip></TooltipProvider>
                        <FormControl>
                        <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            min={60000}
                            max={600000}
                            step={1000}
                            disabled={isPending}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="acousticness"
                    render={({ field }) => (
                    <FormItem>
                        <TooltipProvider><Tooltip><TooltipTrigger asChild><FormLabel>Acousticness ({field.value.toFixed(2)})</FormLabel></TooltipTrigger><TooltipContent><p>{featureDetails.acousticness}</p></TooltipContent></Tooltip></TooltipProvider>
                        <FormControl>
                        <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            max={1}
                            step={0.01}
                            disabled={isPending}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="speechiness"
                    render={({ field }) => (
                    <FormItem>
                        <TooltipProvider><Tooltip><TooltipTrigger asChild><FormLabel>Speechiness ({field.value.toFixed(2)})</FormLabel></TooltipTrigger><TooltipContent><p>{featureDetails.speechiness}</p></TooltipContent></Tooltip></TooltipProvider>
                        <FormControl>
                        <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            max={1}
                            step={0.01}
                            disabled={isPending}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="key"
                    render={({ field }) => (
                    <FormItem>
                        <TooltipProvider><Tooltip><TooltipTrigger asChild><FormLabel>Key ({field.value})</FormLabel></TooltipTrigger><TooltipContent><p>{featureDetails.key}</p></TooltipContent></Tooltip></TooltipProvider>
                        <FormControl>
                        <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            min={0}
                            max={11}
                            step={1}
                            disabled={isPending}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="mode"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-4">
                            <div className="space-y-0.5">
                                <TooltipProvider><Tooltip><TooltipTrigger asChild><FormLabel>Mode ({field.value === 1 ? 'Major' : 'Minor'})</FormLabel></TooltipTrigger><TooltipContent><p>{featureDetails.mode}</p></TooltipContent></Tooltip></TooltipProvider>
                            </div>
                            <FormControl>
                                <Switch
                                checked={field.value === 1}
                                onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                                disabled={isPending}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Predicting...
            </>
          ) : (
            'Predict Hit Potential'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
