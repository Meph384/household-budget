import { Component, Input, OnInit } from "@angular/core";
import { Chart } from 'chart.js/auto'
import { BaseChartDirective } from "ng2-charts";

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
  @Input() public earnings: any;
  @Input() public labels: any;
  @Input() public spendings: any;

  chart: any = [];
  delayed: boolean = false;

  ngOnInit() {
    this.createChart();
  }

  createChart(){
    this.chart = new Chart("BarChart", {
      type: 'bar',
      data: {
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
        datasets: [
          {
            label: "Earnings",
            data: ['467','576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'rgba(0,255,0,0.35)'
          },
          {
            label: "Spendings",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
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
            text: 'Chart.js Combined Line/Bar Chart'
          }
        }
      }
    });
  }
}
