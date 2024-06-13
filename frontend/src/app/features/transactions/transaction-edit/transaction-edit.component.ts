import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions,
  MatDialog
} from "@angular/material/dialog";
import { Transaction } from "../../../core/interfaces/transaction.interface";
import { Category } from "../../../core/interfaces/category.interface";
import { Currency } from "../../../core/interfaces/currency.interface";
import { TransactionService } from "../../../core/services/transaction.service";
import { CategoryService } from "../../../core/services/category.service";
import { CurrencyService } from "../../../core/services/currency.service";
import { FormsModule } from "@angular/forms";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import {
  LuxonDateAdapter,
  MAT_LUXON_DATE_ADAPTER_OPTIONS,
  MAT_LUXON_DATE_FORMATS,
  MatLuxonDateModule
} from "@angular/material-luxon-adapter";
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";
import { MatIcon } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-transaction-edit",
  templateUrl: "./transaction-edit.component.html",
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatLuxonDateModule,
    MatSelect,
    MatOption,
    CommonModule,
    MatIcon,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogTitle
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    {provide: DateAdapter, useClass: LuxonDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MAT_LUXON_DATE_FORMATS},
    {provide: MAT_LUXON_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ],
  styleUrls: ["./transaction-edit.component.scss"]
})
export class TransactionEditComponent implements OnInit {
  transaction: Transaction;
  categories: Category[] = [];
  currencies: Currency[] = [];

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private currencyService: CurrencyService,
    public dialogRef: MatDialogRef<TransactionEditComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.transaction = structuredClone(data.transaction);
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadCurrencies();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((categories: Category[]): void => {
      this.categories = categories;
    });
  }

  loadCurrencies(): void {
    this.currencyService.getAllCurrencies().subscribe((currencies: Currency[]): void => {
      this.currencies = currencies;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    const dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, {data: {message: "Are you" +
          " sure about that?"}});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactionService.updateTransaction(this.transaction.transactionId, this.transaction).subscribe((updatedTransaction: Transaction): void => {
          this.dialogRef.close(updatedTransaction);
        });
      }
    });
  }
}
