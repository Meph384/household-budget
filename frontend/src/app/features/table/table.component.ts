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
import { MatIconButton } from "@angular/material/button";
import { DateService } from "../../core/services/date.service";
import { MatDialog } from "@angular/material/dialog";
import { TransactionAddComponent } from "../transactions/transaction-add/transaction-add.component";
import { Transaction } from "../../core/interfaces/transaction.interface";

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
    MatSuffix
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
    private dateService: DateService,
    private dialog: MatDialog
  ) {}

  financeRecords: Transaction[] = [];
  categories: Category[] = [];

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

  applyFilter(): void {
    this.filteredTransactions.filter = this.filterValue.trim().toLowerCase();
  }

  applyCategoryFilter(event: MatSelectChange): void {
    this.selectedCategoryId = event.value;
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
}
