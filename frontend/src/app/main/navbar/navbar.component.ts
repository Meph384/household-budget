import { Component } from '@angular/core';
import { ThemeToggleComponent } from '../../features/theme/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.scss',
  imports: [ThemeToggleComponent, ThemeToggleComponent]
})
export class NavbarComponent {}
