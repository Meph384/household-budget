import { ApplicationConfig } from "@angular/core";
import { provideRouter, withPreloading, withViewTransitions } from '@angular/router';
import { routes } from './app.route';
import { provideAnimations } from '@angular/platform-browser/animations';
import { quicklinkProviders, QuicklinkStrategy } from 'ngx-quicklink';
import { provideHttpClient } from "@angular/common/http";
import { provideCharts, withDefaultRegisterables } from "ng2-charts";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withPreloading(QuicklinkStrategy), withViewTransitions({ skipInitialTransition: true })),
    provideAnimations(),
    quicklinkProviders,
    provideCharts(withDefaultRegisterables())
  ]
};
