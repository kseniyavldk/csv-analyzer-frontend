import { createReducer, on } from '@ngrx/store';
import * as FilesActions from './files.actions';
import { CsvAnalysisRecord } from '../models/csv-analysis-record.model';

export interface FilesState {
  files: CsvAnalysisRecord[];
  currentFile: CsvAnalysisRecord | null;
  loading: boolean;
  error: string | null;
}

export const initialState: FilesState = {
  files: [],
  currentFile: null,
  loading: false,
  error: null
};

export const filesReducer = createReducer(
  initialState,
  on(FilesActions.uploadFile, state => ({ ...state, loading: true, error: null })),
  on(FilesActions.uploadFileSuccess, (state, { record }) => ({
    ...state,
    files: [record, ...state.files],
    loading: false
  })),
  on(FilesActions.uploadFileFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(FilesActions.loadHistory, state => ({ ...state, loading: true, error: null })),
  on(FilesActions.loadHistorySuccess, (state, { files }) => ({ ...state, files, loading: false })),
  on(FilesActions.loadHistoryFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(FilesActions.loadDetails, state => ({ ...state, loading: true, error: null })),
  on(FilesActions.loadDetailsSuccess, (state, { record }) => ({ ...state, currentFile: record, loading: false })),
  on(FilesActions.loadDetailsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(FilesActions.deleteFile, state => ({ ...state, loading: true, error: null })),
  on(FilesActions.deleteFileSuccess, (state, { id }) => ({
    ...state,
    files: state.files.filter(f => f.id !== id),
    loading: false,
    currentFile: state.currentFile?.id === id ? null : state.currentFile
  })),
  on(FilesActions.deleteFileFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
