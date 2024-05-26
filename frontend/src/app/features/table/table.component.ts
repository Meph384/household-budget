import { AfterViewInit, Component, inject, OnInit, Signal, viewChild, ViewChild } from "@angular/core";
import { Transaction } from "../../core/models/transaction.model";
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
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { CategoryService } from "../../core/services/category.service";
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
import { MatIconButton } from "@angular/material/button";

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
    MatIconButton
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
    private categoryService: CategoryService
  ) {}

  financeRecords: Transaction[] = [];
  categories: Category[] = [];
  categoryMap: Map<number, string> = new Map();
  newRecordId: number | null = null;

  displayedColumns: string[] = ['select', 'transactionId', 'categoryTitle', 'description', 'amount', 'date'];
  selection: SelectionModel<Transaction> = new SelectionModel<Transaction>(true, []);
  filteredTransactions: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>(this.financeRecords);

  paginator: Signal<MatPaginator> = viewChild.required<MatPaginator>(MatPaginator);
  appearance: Signal<'fill' | 'outline'> = inject(InputsAppearanceService).appearance;

  @ViewChild(MatSort) sort!: MatSort;

  filterValue: string = '';
  selectedCategoryId: string | number = '';

  ngOnInit(): void {
    this.fetchTransactions();
    this.fetchCategories();
    this.transactionService.newTransaction$.subscribe(transaction => {
      this.addNewTransaction(transaction);
    })
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
      },
      error: (error) => console.error('Error fetching transactions.', error)
    });
  }

  fetchCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories: Category[]): void => {
        this.categories = categories;
        this.categoryMap = new Map(categories.map(category => [category.categoryId, category.title]));
        this.updateCategoryTitles();
      },
      error: (error) => console.error('Error fetching categories:', error)
    });
  }

  applyFilter(): void {
    this.filteredTransactions.filter = this.filterValue.trim().toLowerCase();
  }

  applyCategoryFilter(event: MatSelectChange): void {
    this.selectedCategoryId = event.value;
    this.updateFilteredTransactions();
  }

  private updateFilteredTransactions(): void {
    if (this.selectedCategoryId) {
      this.filteredTransactions.data = this.financeRecords.filter(transaction => transaction.categoryId === this.selectedCategoryId);
    } else {
      this.filteredTransactions.data = this.financeRecords;
    }
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
    this.applyFilter();
  }

  checkboxLabel(row?: Transaction): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.categoryId + 1}`;
  }

  getAnimationState(transactionId: number): string {
    return this.newRecordId === transactionId ? 'added' : 'default';
  }

  private updateCategoryTitles(): void {
    if (this.categoryMap.size > 0) {
      this.financeRecords.forEach((transaction: Transaction): void => {
        transaction['categoryTitle'] = this.categoryMap.get(transaction.categoryId) || 'Unknown';
      });
      this.filteredTransactions.data = [...this.financeRecords];
    }
  }

  private addNewTransaction(newTransaction: Transaction): void {
    this.financeRecords.push(newTransaction);
    this.updateCategoryTitles();
    this.filteredTransactions.data = this.financeRecords;
    this.newRecordId = newTransaction.transactionId!;

    setTimeout(() => this.newRecordId = null, 1000);
  }
}
