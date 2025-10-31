import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app/app.component';
import { UploadComponent } from './components/upload/upload.component';
import { UploadHistoryComponent } from './components/upload-history/upload-history.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'history', component: UploadHistoryComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
