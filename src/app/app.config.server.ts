import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';   
import { routes } from './app.routes';            
import { filesReducer } from './store/files.reducer';
import { FilesEffects } from './store/files.effects';

export const serverConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),                        
    provideHttpClient(withFetch()),
    provideStore({ files: filesReducer }),
    provideEffects([FilesEffects])
  ]
};
