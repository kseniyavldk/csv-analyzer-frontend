import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { UploadComponent } from './app/components/upload/upload.component';
import { UploadHistoryComponent } from './app/components/upload-history/upload-history.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'history', component: UploadHistoryComponent },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
