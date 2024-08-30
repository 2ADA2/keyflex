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
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CheckboxComponent} from "../../components/checkbox/checkbox.component";
import {UserInfo, UserService} from "./userService";
import {NgClass} from "@angular/common";
import {Service} from "../../api/service";
import {
  createAttendanceChartData,
  createBarColorScheme,
  createCountChartSeries,
  createMainChartData
} from "../../functions/chartsData";

import translate from "../../../../public/assets/json/translate.json"

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

  public route: ActivatedRoute = inject(ActivatedRoute);
  public activateToken: string = this.route.snapshot.params['token'];

  form: FormGroup = new FormGroup({
    keyboard_type: new FormControl(null),
    location: new FormControl(null),
    profession: new FormControl(null),
    about_user: new FormControl(null),
  })
  isTT: boolean = false

  public mainChart: ChartLineOptions = mainChart;

  public countChartOptions: ChartPieOptions = countChart;



  public userInfo: any

  public mainStats: ApexAxisChartSeries = []
  public countChartSeries: ApexNonAxisChartSeries = []
  public attendanceChartSeries: ApexNonAxisChartSeries = []
  public lastStats: any = {}

  public accuracyData:number[] = []
  public classesData:number[] = []
  public lastResults: any

  constructor() {

    this.userService.getUserInfo()
      .subscribe(val => this.userInfo = val)

    if(this.activateToken){
      this.userService.activate().subscribe(() => {
        this.userService.getUserInfo()
          .subscribe(val => this.userInfo = val)
      })
    }

    this.userService.getStats()
      .subscribe(val => {
        this.accuracyData = Object.values(val.average_accuracy_stats)
        this.classesData = Object.values(val.number_training_sessions_stats)
        this.mainStats = createMainChartData(val.symbols_per_minute_stats)
        //calc mainStats
        const mainXMax = Math.max(...this.mainStats.map((e: any) => e.data.length))
        const mainYMax = Math.max(...this.mainStats.map((e: any) => {
          return Math.max(...e.data.map((arr: any) => arr.y))
        }))

        mainChart.xaxis = {
          min: 0,
          max: (mainXMax > 100) ? mainXMax + 10 : 100,
          labels: {
            show: false
          }
        }
        mainChart.yaxis = {
          min: 0,
          max: (mainYMax > 100) ? mainYMax + 20 : 100,
        }

        //calc accuracy
        this.attendanceChartSeries = createAttendanceChartData(val.number_training_sessions_stats)
        this.countChartSeries = createCountChartSeries(val.average_accuracy_stats)

        //calc classes

      })
    this.userService.getLastest().subscribe((val) => {

      this.lastStats = {
        ...val,
        //@ts-ignore
        the_most_popular_mode:translate.modes[val.the_most_popular_mode],
        //@ts-ignore
        smp_best_mode:translate.modes[val.smp_best_mode],
        //@ts-ignore
        accuracy_best_mode:translate.modes[val.accuracy_best_mode]
      }

      this.lastResults = {
        ...barChartOptions,
        xaxis: {
          categories: val.modes_types.map((e:any) => {
            //@ts-ignore
            return translate.modes[e]
          }),
        },
        series: [{
          data: val.symbols_per_minute_values.map((e:any) => e/5)
        }],
        colors:createBarColorScheme(val.modes_types)
      }
    })
  }

  onSubmit() {
    this.userService.setUserInfo({...this.form.value, touch_typing: this.isTT}).subscribe(() => {
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

  logout() {
    this.service.logout()
  }

  protected readonly faGear = faGear;
  protected readonly barChartOptions = barChartOptions;
  protected readonly faTrash = faTrash;
}
