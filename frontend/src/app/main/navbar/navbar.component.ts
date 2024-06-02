import { Component } from '@angular/core';
import { ThemeToggleComponent } from '../../features/theme/theme-toggle/theme-toggle.component';
import { MatIcon } from "@angular/material/icon";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.scss',
  imports: [ThemeToggleComponent, ThemeToggleComponent, MatIcon]
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
