import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthComponent } from '../auth.component';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    standalone: true,
    imports: [AuthComponent]
})
export class SignUpComponent {
  errorMessage: string = "";
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }
  signUp({email, password}: any) {
    this.authService.signup(email, password).subscribe({
      next: () => {
        let snackBarRef: MatSnackBarRef<TextOnlySnackBar> = this.snackBar.open("Sign up successful!", "Close");
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['/sign-in']);
        });
      },
      error: err => {
          this.errorMessage = err.error.message || "Failed to sign up";
          this.snackBar.open(err.message, "Close", {
        });
        console.error(err);
      }
    });
  }
}
