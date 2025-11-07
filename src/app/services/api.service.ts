import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CsvStatistics {
  totalLines: number;
  invalidLines: number;
  min: number;
  max: number;
  mean: number;
  stdDev: number;
  uniqueValues: number;
  invalidLinesDetails?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api'; 
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<CsvStatistics> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<CsvStatistics>(`${this.baseUrl}/upload`, formData);
  }

  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history`);
  }

  getDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/history/${id}`);
  }

  deleteFile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/history/${id}`);
  }
}
