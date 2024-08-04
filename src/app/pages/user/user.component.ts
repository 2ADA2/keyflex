import { Component, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexGrid, ApexPlotOptions,
  ApexTooltip,
  ChartComponent,
  NgApexchartsModule
} from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexStroke,
  ApexFill,
  ApexYAxis,
  ApexXAxis,
} from "ng-apexcharts";

import {barChartOptions, countChart, mainChart} from "../../utils/chartOptions";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";



export type ChartPieOptions = {
  series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any; // уточните тип, если возможно
  stroke: ApexStroke;
  fill: ApexFill;
  colors:any;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  plotOptions:ApexPlotOptions;
};

export type ChartLineOptions = {
  series:ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgApexchartsModule,
    FaIconComponent
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  public mainChart: ChartLineOptions;

  public countChartOptions: ChartPieOptions;
  public countChartSeries = [20,10,13,2,1,15]

  public accuracyChartSeries = [100,64,59,90,36,43];
  public attendanceChartSeries = [1001, 304, 96, 201, 17, 30];

  public lastResults : any

  constructor() {
    this.countChartOptions = {
      ...countChart,
      series: this.countChartSeries
    }

    this.mainChart = {
      ...mainChart
    }

    this.lastResults = {
      ...barChartOptions,
      xaxis: {
        categories: ['200 слов', 'Пользовательский', '200 слов', '200 слов', '200 слов', '1000 слов', '200 слов', '200 слов', '200 слов', '200 слов'],
      },
      series: [{
        data: [70, 35, 65, 67, 75, 80, 69, 61, 71, 75]
      }],

    }
  }

  protected readonly faGear = faGear;
  protected readonly barChartOptions = barChartOptions;
}
