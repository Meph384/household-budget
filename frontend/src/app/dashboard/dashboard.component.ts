import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TransactionAddComponent } from "../transactions/transaction-add/transaction-add.component";
import { MatButton } from "@angular/material/button";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  standalone: true,
  imports: [
    MatButton
  ],
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TransactionAddComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Transaction added successfully:', result);
      }
    });
  }

}
