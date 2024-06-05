import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { Transaction } from '../../core/interfaces/transaction.interface';
import { Category } from '../../core/interfaces/category.interface';
import { DoughnutChartComponent } from "../../features/charts/doughnut-chart/doughnut-chart.component";
import { ComboChartComponent } from "../../features/charts/combo-chart/combo-chart.component";
import { HorizontalBarChartComponent } from "../../features/charts/horizontal-bar-chart/horizontal-bar-chart.component";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";

@Component({
  selector: "app-graph-dashboard",
  templateUrl: "./graph-dashboard.component.html",
  standalone: true,
  imports: [
    DoughnutChartComponent,
    ComboChartComponent,
    HorizontalBarChartComponent,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent
  ],
  styleUrls: ["./graph-dashboard.component.scss"]
})
export default class GraphDashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  categories: Category[] = [];

  constructor(
    private transactionService: TransactionService,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.transactionService.getSpendingsByCategory().subscribe();
    this.transactionService.getCategoriesGroupedByDay().subscribe();
    this.transactionService.getCategoriesGroupedByMonth().subscribe();
  }
}
