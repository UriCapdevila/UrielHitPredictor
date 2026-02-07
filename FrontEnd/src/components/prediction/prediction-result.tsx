'use client';

import type { PredictionState } from '@/app/(dashboard)/page';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type PredictionResultProps = {
  state: PredictionState;
  isPending: boolean;
  onReset: () => void;
};

export function PredictionResult({ state, isPending, onReset }: PredictionResultProps) {
  const hasResult = state.prediction !== undefined;
  const score = state.prediction ?? 0;

  const getBadgeVariant = (score: number) => {
    if (score > 75) return "default";
    if (score > 50) return "secondary";
    return "destructive";
  }

  const getBadgeLabel = (score: number) => {
    if (score > 85) return "Smash Hit";
    if (score > 70) return "Likely Hit";
    if (score > 50) return "Potential Hit";
    if (score > 30) return "Niche Appeal";
    return "Unlikely Hit";
  }

  const chartData = [{ name: 'popularity', value: score }];

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Prediction Result</CardTitle>
        <CardDescription>The model's predicted popularity score for the song.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        {isPending ? (
          <div className="flex flex-col items-center justify-center space-y-4 w-full h-[250px]">
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        ) : hasResult ? (
          <div className="flex flex-col items-center justify-center space-y-2 w-full">
            <div className="relative h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="80%"
                  outerRadius="100%"
                  barSize={12}
                  data={chartData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                    className="fill-primary"
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-4xl font-bold text-primary">{score.toFixed(0)}</span>
                 <span className="text-sm text-muted-foreground">/ 100</span>
              </div>
            </div>
            <Badge variant={getBadgeVariant(score)} className="text-lg py-1 px-4">{getBadgeLabel(score)}</Badge>
          </div>
        ) : (
          <div className="flex h-[250px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 text-center">
            <p className="text-muted-foreground">Your prediction will appear here.</p>
          </div>
        )}

        {state.explanation && (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Model Interpretation</AlertTitle>
            <AlertDescription className="prose prose-sm dark:prose-invert max-w-none">
              {state.explanation.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </AlertDescription>
          </Alert>
        )}

         {state.error && (
            <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )}

      </CardContent>
      {hasResult &&
        <CardFooter>
            <Button variant="outline" className="w-full" onClick={onReset}>Predict Another Song</Button>
        </CardFooter>
      }
    </Card>
  );
}
