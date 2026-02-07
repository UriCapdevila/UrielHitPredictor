'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { getFeatureSuggestions } from '@/app/actions';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles } from "lucide-react";

const formSchema = z.object({
  existingFeatures: z.string().min(10, 'Please describe the features in more detail.'),
  modelType: z.string().min(3, 'Please specify the model type.'),
  targetVariable: z.string().min(3, 'Please specify the target variable.'),
  datasetSize: z.string().min(1, 'Please specify the dataset size.'),
});

type SuggestionFormValues = z.infer<typeof formSchema>;

export default function FeatureEngineeringPage() {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SuggestionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      existingFeatures: 'Audio features from Spotify API: danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, tempo, duration_ms.',
      modelType: 'Random Forest Classifier',
      targetVariable: 'Song popularity score (0-100), binarized as "hit" ( > 70) or "not a hit".',
      datasetSize: '10,000 songs',
    },
  });

  const onSubmit = async (values: SuggestionFormValues) => {
    setIsPending(true);
    setSuggestion(null);
    setError(null);
    const result = await getFeatureSuggestions(values);
    if (result.error) {
      setError(result.error);
    } else {
      setSuggestion(result.suggestedFeatures ?? null);
    }
    setIsPending(false);
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Feature Engineering Assistant</h1>
        <p className="mt-2 text-muted-foreground">
          Leverage AI to get suggestions on new features or transformations that could improve your model's performance.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Model Context</CardTitle>
            <CardDescription>Provide details about your current model and data.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="existingFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Existing Features</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="e.g., danceability, energy, tempo..." {...field} disabled={isPending}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="modelType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Logistic Regression, Random Forest" {...field} disabled={isPending}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetVariable"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Variable</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Popularity Score" {...field} disabled={isPending}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="datasetSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dataset Size</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 10,000 samples" {...field} disabled={isPending}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Getting Suggestions...
                    </>
                  ) : (
                    'Get Suggestions'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Suggestions</CardTitle>
             <CardDescription>Suggestions for new features will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
             {isPending && (
                <div className="space-y-4">
                    <div className="h-6 w-1/2 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-4/5 bg-muted rounded animate-pulse"></div>
                     <div className="h-6 w-1/3 bg-muted rounded animate-pulse mt-6"></div>
                    <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
                </div>
             )}
            {suggestion && (
              <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertTitle>Feature Ideas</AlertTitle>
                <AlertDescription className="prose prose-sm dark:prose-invert max-w-none">
                  {suggestion.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                </AlertDescription>
              </Alert>
            )}
             {error && <p className="text-destructive">{error}</p>}
             {!isPending && !suggestion && !error && (
                <div className="flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 text-center">
                    <p className="text-muted-foreground">AI-powered suggestions will appear here.</p>
                </div>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
