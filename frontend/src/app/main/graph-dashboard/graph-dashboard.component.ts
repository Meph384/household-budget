import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { CategoryService } from '../../core/services/category.service';
import { Transaction } from '../../core/interfaces/transaction.interface';
import { Category } from '../../core/interfaces/category.interface';
import { DateTime } from 'luxon';
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
  transactionsByCategory: { labels: string[], data: number[] } = { labels: [], data: [] };
  earningsAndSpendingsByMonth: { labels: string[], earnings: number[], spendings: number[], balance: number[] } = { labels: [], earnings: [], spendings: [], balance: [] };
  currentMonthEarnings = 0;
  currentMonthSpendings = 0;
  stackedBarData: { labels: string[], datasets: { label: string, data: number[] }[] } = { labels: [], datasets: [] };

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.transactionService.getAllFinanceData().subscribe(transactions => {
      this.transactions = transactions;
      this.prepareTransactionsByCategory();
      this.prepareEarningsAndSpendingsByMonth();
      this.prepareCurrentMonthEarningsSpendings();
      this.prepareStackedBarData();
    });

    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  prepareTransactionsByCategory(): void {
    const groupedByCategory = this.transactions.reduce((acc: { [key: string]: number }, transaction: Transaction) => {
      const category = transaction.categoryTitle;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += transaction.amount;
      return acc;
    }, {});

    this.transactionsByCategory.labels = Object.keys(groupedByCategory);
    this.transactionsByCategory.data = Object.values(groupedByCategory);
  }

  prepareEarningsAndSpendingsByMonth(): void {
    const groupedByMonth = this.transactions.reduce((acc: { [key: string]: { earnings: number, spendings: number, balance: number } }, transaction: Transaction) => {
      const month = DateTime.fromJSDate(new Date(transaction.date)).toFormat('yyyy-MM');
      if (!acc[month]) {
        acc[month] = { earnings: 0, spendings: 0, balance: 0 };
      }
      if (transaction.amount > 0) {
        acc[month].earnings += transaction.amount;
      } else {
        acc[month].spendings += transaction.amount;
      }
      acc[month].balance += transaction.amount;
      return acc;
    }, {});

    this.earningsAndSpendingsByMonth.labels = Object.keys(groupedByMonth);
    this.earningsAndSpendingsByMonth.earnings = Object.values(groupedByMonth).map(v => v.earnings);
    this.earningsAndSpendingsByMonth.spendings = Object.values(groupedByMonth).map(v => v.spendings);
    this.earningsAndSpendingsByMonth.balance = Object.values(groupedByMonth).map(v => v.balance);
  }

  prepareCurrentMonthEarningsSpendings(): void {
    const currentMonth = DateTime.now().toFormat('yyyy-MM');
    this.transactions.forEach(transaction => {
      const transactionMonth = DateTime.fromJSDate(new Date(transaction.date)).toFormat('yyyy-MM');
      if (transactionMonth === currentMonth) {
        if (transaction.amount > 0) {
          this.currentMonthEarnings += transaction.amount;
        } else {
          this.currentMonthSpendings += transaction.amount;
        }
      }
    });
  }

  prepareStackedBarData(): void {
    const groupedByMonthAndCategory = this.transactions.reduce((acc: { [key: string]: { [key: string]: number } }, transaction: Transaction) => {
      const month = DateTime.fromJSDate(new Date(transaction.date)).toFormat('yyyy-MM');
      const category = transaction.categoryTitle;
      if (!acc[month]) {
        acc[month] = {};
      }
      if (!acc[month][category]) {
        acc[month][category] = 0;
      }
      acc[month][category] += transaction.amount;
      return acc;
    }, {});

    const labels = Object.keys(groupedByMonthAndCategory);
    const datasets = this.categories.map(category => ({
      label: category.title,
      data: labels.map(label => groupedByMonthAndCategory[label][category.title] || 0)
    }));

    this.stackedBarData.labels = labels;
    this.stackedBarData.datasets = datasets;
  }
}
