// app.component.ts
import { Component, ElementRef } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private themeService: ThemeService, private elRef: ElementRef) {}

  ngOnInit(): void {
    this.themeService.initializeTheme(document.body);
  }
}
