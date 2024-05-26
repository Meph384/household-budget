import { Injectable, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ThemeClass } from "../../features/theme/types";
import { THEME_CLASSES } from "../../features/theme/theme-options";

const THEME_COOKIE_NAME = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  #cookieService: CookieService = inject(CookieService);
  #themeCookie: string = this.#cookieService.get(THEME_COOKIE_NAME);

  #theme: WritableSignal<ThemeClass> = signal<ThemeClass>(this.#getCurrentTheme());
  theme: Signal<ThemeClass> = this.#theme.asReadonly();

  constructor() {
    effect((): void => {
      this.#saveThemeCookie();
    });
  }

  changeTheme(newTheme: ThemeClass): void {
    this.#theme.set(newTheme);
  }

  #getCurrentTheme(): ThemeClass {
    return this.#validateThemeCookie(this.#themeCookie) ? this.#themeCookie : 'Summer-light';
  }

  #validateThemeCookie(theme: string): theme is ThemeClass {
    return THEME_CLASSES.includes(theme as ThemeClass);
  }

  #saveThemeCookie(): void {
    this.#cookieService.set(THEME_COOKIE_NAME, this.#theme());
  }
}
