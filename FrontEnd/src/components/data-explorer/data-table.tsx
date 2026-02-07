'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


export type CsvData = {
  headers: string[];
  rows: { [key: string]: string }[];
};

type DataTableProps = {
  data: CsvData;
};

export function DataTable({ data }: DataTableProps) {
  if (!data || data.rows.length === 0) {
    return <p>No data to display.</p>;
  }

  const displayedHeaders = data.headers.slice(0, 7);

  return (
    <ScrollArea className="whitespace-nowrap rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                {displayedHeaders.map((header) => (
                    <TableHead key={header} className="capitalize">{header.replace(/_/g, ' ')}</TableHead>
                ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                    {displayedHeaders.map((header) => (
                    <TableCell key={`${rowIndex}-${header}`}>{row[header]}</TableCell>
                    ))}
                </TableRow>
                ))}
            </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
