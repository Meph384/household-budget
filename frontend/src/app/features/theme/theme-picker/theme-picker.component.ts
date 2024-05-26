import { Component, inject, Signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { THEME_OPTIONS } from '../theme-options';
import { ThemeClass, ThemeOption } from '../types';
import { ThemeService } from "../../../core/services/theme.service";

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrl: './theme-picker.component.scss',
  standalone: true,
  imports: [MatButton, MatDialogTitle, MatDialogContent, MatIcon]
})
export class ThemePickerComponent {
  #themeService: ThemeService = inject(ThemeService);
  #dialogRef = inject(MatDialogRef);

  themeOptions: ThemeOption[] = THEME_OPTIONS;
  activeTheme: Signal<ThemeClass> = this.#themeService.theme;

  changeTheme(newTheme: ThemeClass): void {
    this.#themeService.changeTheme(newTheme);
    this.#dialogRef.close();
  }
}
