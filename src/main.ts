import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app/app.routes';
import { filesReducer } from './app/store/files.reducer';
import { FilesEffects } from './app/store/files.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),      
    provideStore({ files: filesReducer }),
    provideEffects([FilesEffects]),
    provideStoreDevtools({ maxAge: 25 })
  ]
}).catch(err => console.error(err));
