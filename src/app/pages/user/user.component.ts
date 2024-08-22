import {Component, inject, ViewChild} from "@angular/core";
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
import {faGear, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {CheckboxComponent} from "../../components/checkbox/checkbox.component";
import {UserInfo, UserService} from "./userService";
import {NgClass} from "@angular/common";
import {Service} from "../../api/service";
import {createAttendanceChartData, createCountChartSeries, createMainChartData} from "../../functions/chartsData";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";


export type ChartPieOptions = {
  series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any; // уточните тип, если возможно
  stroke: ApexStroke;
  fill: ApexFill;
  colors: any;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
};

export type ChartLineOptions = {
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
    FaIconComponent,
    ReactiveFormsModule,
    RouterLink,
    CheckboxComponent,
    NgClass
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent {
  public isSettings: boolean = false;
  public userService: UserService = inject(UserService);
  public service: Service = inject(Service);

  form: FormGroup = new FormGroup({
    keyboard_type: new FormControl(null),
    location: new FormControl(null),
    profession: new FormControl(null),
    about_user: new FormControl(null),
  })
  isTT: boolean = false

  public mainChart: ChartLineOptions = mainChart;

  public countChartOptions: ChartPieOptions = countChart;

  public lastResults: any

  public userInfo: any

  public mainStats: ApexAxisChartSeries  = []
  public countChartSeries: ApexNonAxisChartSeries  = []
  public attendanceChartSeries: ApexNonAxisChartSeries  = []

  constructor() {
    //@ts-ignore
    this.userService.getUserInfo()
      .subscribe(val => this.userInfo = val)
    this.userService.getStats()
      .subscribe(val => {
        this.mainStats = createMainChartData(val.mainStats)
          //calc mainStats
        const mainXMax = Math.max(...this.mainStats.map((e: any) => e.data.length))
        const mainYMax = Math.max(...this.mainStats.map((e: any) => {
          return Math.max(...e.data.map((arr: any) => arr.y))
        }))

        mainChart.xaxis= {
          min: 0,
          max: ( mainXMax > 100) ? mainXMax+10 : 100,
          labels: {
            show: false
          }
        }
        mainChart.yaxis = {
          min: 0,
          max: ( mainYMax > 100) ? mainYMax+20 : 100,
        }

        //calc accuracy
        this.attendanceChartSeries = createAttendanceChartData(val.classes)
        this.countChartSeries = createCountChartSeries(val.average_accuracy)

        //calc classes

      })


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

  onSubmit() {
    this.userService.setUserInfo({...this.form.value, touch_typing:this.isTT}).subscribe( () => {
      this.userService.getUserInfo().subscribe((val) => {
        this.userInfo = val
        this.isSettings = false
      })
      }
    )
  }

  setIsTT() {
    this.isTT = !this.isTT
  }

  setIsSettings() {
    this.isSettings = !this.isSettings
    this.form.patchValue({
      keyboard_type: this.userInfo.keyboard_type,
      location: this.userInfo.location,
      profession: this.userInfo.profession,
      about_user: this.userInfo.about_user,
    });
  }

  logout(){
    this.service.logout()
  }

  protected readonly faGear = faGear;
  protected readonly barChartOptions = barChartOptions;
  protected readonly faTrash = faTrash;
}
