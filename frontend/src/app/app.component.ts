import { Component, Renderer2, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from './core/services/theme.service';
import { LayoutComponent } from './main/layout/layout.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutComponent,
    MatToolbar,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatFormField,
    MatLabel,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatInput
  ],
  providers: [provideLuxonDateAdapter()],
  templateUrl: './app.component.html'
})
export class AppComponent {
  #themeService: ThemeService = inject(ThemeService);
  #document: Document = inject(DOCUMENT);
  #renderer: Renderer2 = inject(Renderer2);

  constructor() {
    effect((): void => {
      this.#renderer.setAttribute(this.#document.documentElement, 'class', this.#themeService.theme());
    });
  }
}
