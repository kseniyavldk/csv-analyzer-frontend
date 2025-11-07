import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { UploadHistoryComponent } from './components/upload-history/upload-history.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'history', component: UploadHistoryComponent },
  { path: '**', redirectTo: '' }
];
