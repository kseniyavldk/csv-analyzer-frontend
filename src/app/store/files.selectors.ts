import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilesState } from './files.reducer';

export const selectFilesState = createFeatureSelector<FilesState>('files');

export const selectAllFiles = createSelector(selectFilesState, state => state.files);
export const selectLoading = createSelector(selectFilesState, state => state.loading);
export const selectError = createSelector(selectFilesState, state => state.error);
export const selectCurrentFile = createSelector(selectFilesState, state => state.currentFile);
