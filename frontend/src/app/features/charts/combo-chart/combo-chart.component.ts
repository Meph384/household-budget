import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js/auto";
import { TransactionService } from "../../../core/services/transaction.service";
import { GroupedData } from "../../../core/interfaces/category.interface";

@Component({
  selector: 'app-combo-chart',
  standalone: true,
  imports: [],
  templateUrl: './combo-chart.component.html',
  styleUrl: './combo-chart.component.scss'
})
export class ComboChartComponent implements OnInit {
  chart: any = [];
  delayed: boolean = false;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getCategoriesGroupedByMonth().subscribe((data: GroupedData) => {
      console.log(data);
      const expenseData = data['Expense'] || {};
      const incomeData = data['Income'] || {};

      const labels = Array.from(new Set([...Object.keys(expenseData), ...Object.keys(incomeData)])).sort();
      const spendings = labels.map(label => expenseData[label] || 0);
      const earnings = labels.map(label => incomeData[label] || 0);
      const balance = earnings.map((income, index) => income - spendings[index]);
      console.log(earnings, spendings, balance);
      this.createChart(labels, earnings, spendings, balance);
    });
  }

  createChart(labels: string[], earnings: number[], spendings: number[], balance: number[]) {
    this.chart = new Chart("ComboChart", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            type: 'bar',
            label: "Income",
            data: earnings,
            backgroundColor: 'rgba(0,255,0,0.35)'
          },
          {
            type: 'bar',
            label: "Spendings",
            data: spendings,
            backgroundColor: 'rgba(255,0,0,0.35)'
          },
          {
            type: 'line',
            label: "Balance",
            data: balance,
            borderColor: 'rgba(255,255,255)',
            fill: false,
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2,
        layout: {
          padding: 20
        },
        animation: {
          onComplete: () => {
            this.delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !this.delayed) {
              delay = context.dataIndex * 500 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        plugins: {
          legend: {
            textDirection: 'column',
            align: 'end'
          },
          title: {
            display: true,
            text: 'Income, Spendings, and Balance by Month'
          }
        }
      }
    });
  }

}
