import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { authInterceptor } from './core/interceptors/auth.interceptor';
import { initializeApp } from './core/initialization/app.initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        authInterceptor,
      ]),
    ),

    provideAppInitializer(initializeApp),
  ],
};