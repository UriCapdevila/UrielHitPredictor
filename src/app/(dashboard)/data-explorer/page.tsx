'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { DataTable, type CsvData } from '@/components/data-explorer/data-table';
import { getInitialData } from '@/app/actions';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DataExplorerPage() {
  const [data, setData] = useState<CsvData | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [numSongs, setNumSongs] = useState(20);

  const handleGenerateData = async () => {
    setIsPending(true);
    setError(null);
    setData(null);

    const result = await getInitialData({ numberOfSongs: numSongs });

    if (result.error) {
      setError(result.error);
    } else if (result.trainingData) {
      const parseCsv = (csv: string): CsvData => {
        const lines = csv.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const rows = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          const rowObject: { [key: string]: string } = {};
          headers.forEach((header, index) => {
            rowObject[header] = values[index];
          });
          return rowObject;
        });
        return { headers, rows };
      };
      setData(parseCsv(result.trainingData));
    }
    setIsPending(false);
  };

  return (
    <div className="container mx-auto max-w-7xl">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Data Explorer</h1>
        <p className="mt-2 text-muted-foreground">
          Generate synthetic training data to understand the structure of the data used for model training.
        </p>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>Generate Sample Data</CardTitle>
          <CardDescription>
            Click the button to have the AI generate a sample dataset of songs and their audio features.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="w-full sm:w-auto">
                    <Label htmlFor="num-songs">Number of Songs</Label>
                    <Input 
                        id="num-songs" 
                        type="number" 
                        value={numSongs}
                        onChange={(e) => setNumSongs(Math.min(100, Math.max(5, parseInt(e.target.value, 10))))}
                        min={5}
                        max={100}
                        className="w-full sm:w-32"
                        disabled={isPending}
                    />
                </div>
                 <Button onClick={handleGenerateData} disabled={isPending}>
                    {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                    </>
                    ) : (
                    'Generate Data'
                    )}
                </Button>
            </div>
        </CardContent>
        <CardContent>
            {data && <DataTable data={data} />}
            {isPending && 
                <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                                </th>
                                 <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                           {[...Array(5)].map((_, i) => (
                             <tr key={i} className="border-b transition-colors hover:bg-muted/50">
                                <td className="p-4 align-middle"><div className="h-4 w-24 bg-muted rounded animate-pulse"></div></td>
                                <td className="p-4 align-middle"><div className="h-4 w-20 bg-muted rounded animate-pulse"></div></td>
                                <td className="p-4 align-middle"><div className="h-4 w-16 bg-muted rounded animate-pulse"></div></td>
                            </tr>
                           ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            }
            {error && <p className="text-destructive">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
