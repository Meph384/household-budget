import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthComponent } from '../auth.component';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    standalone: true,
    imports: [AuthComponent]
})
export class SignInComponent {
  errorMessage: string = "";
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }
  signIn({email, password}: any) {
    if(email && password) {
      this.authService.signin(email, password).subscribe({
        next: ({ message }) => {
          let snackBarRef: MatSnackBarRef<TextOnlySnackBar> = this.snackBar.open(message, "Close");
          snackBarRef.afterDismissed().subscribe(() => {
            this.router.navigate(['/dashboard']);
          })
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.message || "Failed to sign up";
          this.snackBar.open(this.errorMessage, "Close");
          console.error(err);
        }
      });
    }
  }
}
