import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthComponent } from '../auth.component';
import { TransactionService } from "../../core/services/transaction.service";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    standalone: true,
    imports: [AuthComponent]
})
export class SignInComponent implements OnInit {
  errorMessage: string = "";
  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  financeData: any = [];

  ngOnInit() {
    // this.getAllFinanceData();
  }

  getAllFinanceData() {
    this.transactionService.getAllFinanceData().subscribe({
      next: res => {
        console.log(res, " finance data");
      },
      error: err => {
        console.log(err);
      }
    });
  }

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
