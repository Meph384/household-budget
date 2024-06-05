import { Component, Inject, OnInit } from "@angular/core";
import { TransactionService } from '../../../core/services/transaction.service';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  LuxonDateAdapter,
  MAT_LUXON_DATE_ADAPTER_OPTIONS,
  MAT_LUXON_DATE_FORMATS,
  MatLuxonDateModule
} from "@angular/material-luxon-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatOption
} from "@angular/material/core";
import { CategoryService } from "../../../core/services/category.service";
import { MatSelect } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { Category } from "../../../core/interfaces/category.interface";
import { Transaction } from "../../../core/interfaces/transaction.interface";
import { Currency } from "../../../core/interfaces/currency.interface";
import { CurrencyService } from "../../../core/services/currency.service";

@Component({
  selector: "app-transaction-add",
  templateUrl: "./transaction-add.component.html",
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
  styleUrls: ["./transaction-add.component.scss"]
})
export class TransactionAddComponent implements OnInit {
  transaction: Transaction = {
    transactionId: 0,
    categoryTitle: '',
    currencyCode: '',
    description: '',
    amount: 0,
    date: new Date(),
    userId: ''
  };

  categories: Category[] = [];
  currencies: Currency[] = [];

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private currencyService: CurrencyService,
    public dialogRef: MatDialogRef<TransactionAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchCurrencies();
  }

  fetchCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories: Category[]): void => {
        this.categories = categories;
        console.log(this.categories);
      },
      error: (error) => console.error('Error fetching categories:', error)
    });
  }

  fetchCurrencies(): void {
    this.currencyService.getAllCurrencies().subscribe({
      next: (currencies: Currency[]): void => {
        this.currencies = currencies;
      },
      error: (error) => console.error('Error fetching currencies:', error)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if(this.transaction) {
      this.transactionService.addTransaction(this.transaction).subscribe({
        next: (result: Transaction): void => {
          this.dialogRef.close(result);
        },
        error: (error) => console.error('Error adding transaction:', error)
      });
    }
  }
}
