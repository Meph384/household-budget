import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js/auto";

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  chart: any = [];
  delayed: boolean = false;

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const isDarkTheme = this.isDarkThemeEnabled();
    const backgroundColors = isDarkTheme ?
      [
        'rgb(255, 99, 132)',    // Red
        'rgb(54, 162, 235)',    // Blue
        'rgb(75, 192, 192)',    // Teal
        'rgb(255, 205, 86)',    // Yellow
        'rgb(153, 102, 255)',   // Purple
        'rgb(255, 159, 64)',
        'rgb(122,210,122)',
        'rgb(124,157,220)'
      ] :
      [
        'rgb(255, 182, 193)',
        'rgb(173, 216, 230)',
        'rgb(119, 221, 119)',
        'rgb(253, 253, 150)',
        'rgb(177, 156, 217)',
        'rgb(255, 179, 71)',
        'rgb(189, 252, 201)',
        'rgb(255, 160, 122)'
      ];

    this.chart = new Chart("DoughnutChart", {
      type: 'doughnut',
      data: {
        labels: ['Rent', 'Groceries', 'Salary', 'Utilities', 'Savings', 'Gym', 'Gifts', 'Fuel'],
        datasets: [
          {
            label: "Earnings",
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: backgroundColors,
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
          legend: {
            position: 'left',
            align: 'center'
          },
        }
      }
    });
  }

  isDarkThemeEnabled(): boolean {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
