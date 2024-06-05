import { Component, OnInit } from "@angular/core";
import { Chart } from 'chart.js/auto'
import { BaseChartDirective } from "ng2-charts";
import { TransactionService } from "../../../core/services/transaction.service";
import { GroupedData } from "../../../core/interfaces/category.interface";

@Component({
  selector: 'app-horizontal-bar-chart',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrl: './horizontal-bar-chart.component.scss'
})
export class HorizontalBarChartComponent implements OnInit {
  chart: any = [];
  delayed: boolean = false;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getCategoriesGroupedByDay().subscribe((data: GroupedData) => {
      const expenseData = data['Expense'] || {};
      const incomeData = data['Income'] || {};
      const labels = Object.keys(expenseData);
      const spendings = Object.values(expenseData);
      const earnings = Object.values(incomeData);

      this.createChart(labels, earnings, spendings);
    });
  }


  createChart(labels: string[], earnings: number[], spendings: number[]) {
    this.chart = new Chart("BarChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Earnings",
            data: earnings,
            backgroundColor: 'rgba(0,255,0,0.35)'
          },
          {
            label: "Spendings",
            data: spendings,
            backgroundColor: 'rgba(255,0,0,0.35)'
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
            text: 'Spendings and Earnings (Last 14 Days)'
          }
        }
      }
    });
  }
}
