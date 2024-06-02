import { Component } from '@angular/core';
import { AuthService } from "../../core/services/auth.service";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { Router } from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
  imports: [MatCard, MatCardTitle, MatCardContent, MatLabel, MatFormField, MatInput, FormsModule, MatButton]
})
export default class RegisterComponent {
  user = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {
    this.authService.register(this.user).subscribe(() => {
      this.router.navigate(['/log-in']);
    });
  }

  redirectToLogin() {
    this.router.navigate(['/log-in']);
  }
}
