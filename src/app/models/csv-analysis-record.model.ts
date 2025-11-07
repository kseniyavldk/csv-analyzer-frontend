export interface CsvAnalysisRecord {
  id: number;
  fileName: string;
  fileSize: number;
  processedAt: string;
  totalLines: number;
  invalidLines: number;
  min: number;
  max: number;
  mean: number;
  stdDev: number;
  uniqueValues: number;
}
