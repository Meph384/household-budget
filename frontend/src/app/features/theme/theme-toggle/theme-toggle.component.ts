import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: 'theme-toggle.component.html',
  standalone: true,
  imports: [MatIcon, MatIconButton, MatTooltip]
})
export class ThemeToggleComponent {
  #dialog: MatDialog = inject(MatDialog);

  openThemePicker(): void {
    this.#dialog.open(ThemePickerComponent);
  }
}
