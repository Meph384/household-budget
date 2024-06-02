import { ApplicationConfig } from "@angular/core";
import { provideRouter, withPreloading, withViewTransitions } from '@angular/router';
import { routes } from './app.route';
import { provideAnimations } from '@angular/platform-browser/animations';
import { quicklinkProviders, QuicklinkStrategy } from 'ngx-quicklink';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideCharts, withDefaultRegisterables } from "ng2-charts";
import { AuthInterceptor } from "./core/interceptors/Auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes, withPreloading(QuicklinkStrategy), withViewTransitions({ skipInitialTransition: true })),
    provideAnimations(),
    quicklinkProviders,
    provideCharts(withDefaultRegisterables()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};
