import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js/auto";

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

  ngOnInit() {
    this.createChart();
  }

  createChart(){
    this.chart = new Chart("ComboChart", {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            type: 'bar',
            label: "Income",
            data: ['467','576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'rgba(0,255,0,0.35)'
          },
          {
            type: 'bar',
            label: "Spendings",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'rgba(255,0,0,0.35)'
          },
          {
            type: 'line',
            label: "Balance",
            data: ['542', '542', '536', '327', '17'],
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
            text: 'Chart.js Combined Line/Bar Chart'
          }
        }
      }
    });
  }
}
