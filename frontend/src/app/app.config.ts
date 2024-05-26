import { ApplicationConfig } from "@angular/core";
import { provideRouter, withPreloading, withViewTransitions } from '@angular/router';
import { routes } from './app.route';
import { provideAnimations } from '@angular/platform-browser/animations';
import { quicklinkProviders, QuicklinkStrategy } from 'ngx-quicklink';
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withPreloading(QuicklinkStrategy), withViewTransitions({ skipInitialTransition: true })),
    provideAnimations(),
    quicklinkProviders
  ]
};
