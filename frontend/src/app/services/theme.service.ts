// theme.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private themeClass: string = 'light-theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initializeTheme(rootElement: HTMLElement): void {
    this.applyThemeClass(rootElement, this.themeClass);
  }

  toggleTheme(rootElement: HTMLElement): void {
    this.themeClass = this.themeClass === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.applyThemeClass(rootElement, this.themeClass);
  }

  private applyThemeClass(element: HTMLElement, themeClass: string): void {
    this.renderer.removeClass(element, 'light-theme');
    this.renderer.removeClass(element, 'dark-theme');
    this.renderer.addClass(element, themeClass);
  }
}
