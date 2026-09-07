import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    // Browser-only: kept out of appConfig so the server bootstrap does not
    // receive it and attempt to attach window listeners during prerender.
    provideBrowserGlobalErrorListeners(),
  ]
})
  .catch((err) => console.error(err));
