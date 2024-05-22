import { Component, Inject, OnInit } from "@angular/core";
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';
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
import { CategoryService } from "../../services/category.service";
import { Category } from "../../models/category.model";
import { MatSelect } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";

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
  transaction: Transaction = new Transaction();
  categories: Category[] = [];

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<TransactionAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => console.error('Error fetching categories:', error)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.transactionService.addTransaction(this.transaction).subscribe({
      next: (result) => {
        this.dialogRef.close(result);
      },
      error: (error) => console.error('Error adding transaction:', error)
    });
  }
}
