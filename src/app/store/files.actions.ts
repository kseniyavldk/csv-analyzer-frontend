import { createAction, props } from '@ngrx/store';
import { CsvAnalysisRecord } from '../models/csv-analysis-record.model';

export const uploadFile = createAction('[Files] Upload File', props<{ file: File }>());
export const uploadFileSuccess = createAction('[Files] Upload File Success', props<{ record: CsvAnalysisRecord }>());
export const uploadFileFailure = createAction('[Files] Upload File Failure', props<{ error: string }>());

export const loadHistory = createAction('[Files] Load History');
export const loadHistorySuccess = createAction('[Files] Load History Success', props<{ files: CsvAnalysisRecord[] }>());
export const loadHistoryFailure = createAction('[Files] Load History Failure', props<{ error: string }>());

export const loadDetails = createAction('[Files] Load Details', props<{ id: number }>());
export const loadDetailsSuccess = createAction('[Files] Load Details Success', props<{ record: CsvAnalysisRecord }>());
export const loadDetailsFailure = createAction('[Files] Load Details Failure', props<{ error: string }>());

export const deleteFile = createAction('[Files] Delete File', props<{ id: number }>());
export const deleteFileSuccess = createAction('[Files] Delete File Success', props<{ id: number }>());
export const deleteFileFailure = createAction('[Files] Delete File Failure', props<{ error: string }>());
