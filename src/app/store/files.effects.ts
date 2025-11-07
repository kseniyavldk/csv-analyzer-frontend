import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of, EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as FilesActions from './files.actions';
import { CsvAnalysisRecord } from '../models/csv-analysis-record.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class FilesEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private baseUrl = 'http://localhost:8080/api';

  uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesActions.uploadFile),
      mergeMap(({ file }) => {
        if (!isPlatformBrowser(this.platformId)) return EMPTY;
        const fd = new FormData();
        fd.append('file', file);
        return this.http.post<CsvAnalysisRecord>(`${this.baseUrl}/upload`, fd).pipe(
          map(record => FilesActions.uploadFileSuccess({ record })),
          catchError(err => of(FilesActions.uploadFileFailure({ error: err.message || 'Upload error' })))
        );
      })
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesActions.loadHistory),
      mergeMap(() => {
        if (!isPlatformBrowser(this.platformId)) return EMPTY;
        return this.http.get<CsvAnalysisRecord[]>(`${this.baseUrl}/history`).pipe(
          map(files => FilesActions.loadHistorySuccess({ files })),
          catchError(err => of(FilesActions.loadHistoryFailure({ error: err.message || 'Load history error' })))
        );
      })
    )
  );

  loadDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesActions.loadDetails),
      mergeMap(({ id }) => {
        if (!isPlatformBrowser(this.platformId)) return EMPTY;
        return this.http.get<CsvAnalysisRecord>(`${this.baseUrl}/history/${id}`).pipe(
          map(record => FilesActions.loadDetailsSuccess({ record })),
          catchError(err => of(FilesActions.loadDetailsFailure({ error: err.message || 'Load details error' })))
        );
      })
    )
  );

  deleteFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesActions.deleteFile),
      mergeMap(({ id }) => {
        if (!isPlatformBrowser(this.platformId)) return EMPTY;
        return this.http.delete(`${this.baseUrl}/history/${id}`).pipe(
          map(() => FilesActions.deleteFileSuccess({ id })),
          catchError(err => of(FilesActions.deleteFileFailure({ error: err.message || 'Delete error' })))
        );
      })
    )
  );
}
