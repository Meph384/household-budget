import { Component } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { Router } from "@angular/router";

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss'],
    standalone: true,
  imports: [MatCard, MatCardTitle, MatCardContent, MatLabel, MatFormField, MatInput, FormsModule, MatButton]
})
export default class LogInComponent {
  user = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.authService.login(this.user).subscribe(
      () => {
        this.router.navigate(['/table']);
      }
    );
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
