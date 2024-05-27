import { AfterViewInit, Component, inject, OnInit, Signal, viewChild, ViewChild } from "@angular/core";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow,
  MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import { DatePipe, NgForOf } from "@angular/common";
import { MatFormField, MatInput, MatLabel, MatSuffix } from "@angular/material/input";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { Category } from "../../core/interfaces/category.interface";
import { MatOption, MatSelect, MatSelectChange } from "@angular/material/select";
import { TransactionService } from "../../core/services/transaction.service";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { SelectionModel } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { InputsAppearanceService } from "../../core/services/appearance.service";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatIcon } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import { DateService } from "../../core/services/date.service";
import { MatDialog } from "@angular/material/dialog";
import { TransactionAddComponent } from "../transactions/transaction-add/transaction-add.component";
import { Transaction } from "../../core/interfaces/transaction.interface";
import { MatDatepickerInputEvent, MatDatepickerModule } from "@angular/material/datepicker";
import { TransactionEditComponent } from "../transactions/transaction-edit/transaction-edit.component";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { CategoryService } from "../../core/services/category.service";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    DatePipe,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatInput,
    MatLabel,
    MatFormField,
    MatTable,
    MatHeaderRow,
    MatRow,
    MatSort,
    MatSortModule,
    MatSelect,
    MatOption,
    NgForOf,
    MatCheckbox,
    MatPaginator,
    MatIcon,
    FormsModule,
    MatIconButton,
    MatSuffix,
    MatDatepickerModule,
    MatGridTile,
    MatGridList,
    MatButton
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('blink', [
      state('default', style({ backgroundColor: 'white' })),
      state('added', style({ backgroundColor: 'rgba(134,250,120,0.6)' })),
      transition('default <=> added', [
        animate('0.25s')
      ])
    ])
  ]
})
export default class TableComponent implements OnInit, AfterViewInit {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private dateService: DateService,
    private dialog: MatDialog
  ) {}

  financeRecords: Transaction[] = [];
  categories: Category[] = [];

  displayedColumns: string[] = ['select', 'transactionId', 'categoryTitle', 'description', 'amount', 'date', 'actions'];
  selection: SelectionModel<Transaction> = new SelectionModel<Transaction>(true, []);
  filteredTransactions: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>(this.financeRecords);

  paginator: Signal<MatPaginator> = viewChild.required<MatPaginator>(MatPaginator);
  appearance: Signal<'fill' | 'outline'> = inject(InputsAppearanceService).appearance;

  @ViewChild(MatSort) sort!: MatSort;

  filterValue: string = '';
  selectedCategoryId: string | number = '';
  startDate?: Date | null;
  endDate?: Date | null;

  ngOnInit(): void {
    this.fetchTransactions();
    this.fetchCategories();
  }

  ngAfterViewInit(): void {
    this.filteredTransactions.paginator = this.paginator();
    this.filteredTransactions.sort = this.sort;
  }

  fetchTransactions(): void {
    this.transactionService.getAllFinanceData().subscribe({
      next: (res: Transaction[]) => {
        this.financeRecords = res;
        this.filteredTransactions.data = this.financeRecords;
        this.filteredTransactions.sort = this.sort;
        console.log(this.financeRecords);
      },
      error: (error) => console.error('Error fetching transactions.', error)
    });
  }

  fetchCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories: Category[]): void => {
        this.categories = categories;
      },
      error: (error) => console.error('Error fetching currencies:', error)
    });
  }

  applyFilter(): void {
    this.filteredTransactions.filter = this.filterValue.trim().toLowerCase();
    this.filteredTransactions.data = this.financeRecords.filter(transaction =>
      transaction.description.toLowerCase().includes(this.filterValue.trim().toLowerCase()) &&
      (!this.selectedCategoryId || transaction.categoryTitle === this.selectedCategoryId) &&
      (!this.startDate || new Date(transaction.date) >= this.startDate) &&
      (!this.endDate || new Date(transaction.date) <= this.endDate)
    );
  }

  applyCategoryFilter(event: MatSelectChange): void {
    this.selectedCategoryId = event.value;
    this.applyFilter();
  }

  applyDateFilter(): void {
    this.applyFilter();
  }

  onDateChange(event: MatDatepickerInputEvent<Date>, pickerType: string): void {
    if (pickerType === 'start') {
      this.startDate = event.value;
    } else if (pickerType === 'end') {
      this.endDate = event.value;
    }
    this.applyDateFilter();
  }

  isAllSelected(): boolean {
    const numSelected: number = this.selection.selected.length;
    const numRows: number = this.filteredTransactions.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.filteredTransactions.data.forEach((row: Transaction) => this.selection.select(row));
  }

  clearFilter(): void {
    this.filterValue = '';
    this.selectedCategoryId = '';
    this.startDate = undefined;
    this.endDate = undefined;
    this.applyFilter();
  }

  getFormattedDate(dateString: string): string {
    return this.dateService.formatDateOnly(dateString);
  }

  openAddTransactionDialog(): void {
    const dialogRef = this.dialog.open(TransactionAddComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchTransactions();
      }
    });
  }

  openDeleteTransactionDialog(transaction: Transaction): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete this transaction?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactionService.deleteTransaction(transaction.transactionId).subscribe(() => {
          this.fetchTransactions();
        });
      }
    });
  }

  openEditTransactionDialog(transaction: Transaction): void {
    const dialogRef = this.dialog.open(TransactionEditComponent, {
      width: '400px',
      data: { transaction }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchTransactions();
      }
    });
  }
}
