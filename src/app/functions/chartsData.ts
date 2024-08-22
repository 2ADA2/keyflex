import {ApexAxisChartSeries, ApexNonAxisChartSeries} from "ng-apexcharts";

export interface MainChartInput {
  [key: string]: Object[]
}

export interface DefaultChartInput {
  [key: string]: number
}

export const createMainChartData = (mainStats: MainChartInput): ApexAxisChartSeries => {
  let mainData: any = []

  for (let key in mainStats) {
    let x = -1
    mainData.push(mainStats[key].map((e: any): Object => {
      x += 1
      return {x: x, y: e}
    }))
  }

  mainData = mainData.map((e: any) => {
    return [...e, {x:e.length-1, y:null}]
  })

  return ([
    {
      name: "200 слов",
      type: 'line',
      data: mainData[0],
      color: "#6fffe9"
    },
    {
      name: "1000 слов",
      type: 'line',
      data: mainData[1],
      color: "#bce544"
    },
    {
      name: "Текст",
      type: 'line',
      data: mainData[2],
      color: "#f146d8"
    },
    {
      name: "Английский",
      type: 'line',
      data: mainData[3],
      color: "#3150fd"
    },
    {
      name: "Экстрим",
      type: 'line',
      data: mainData[4],
      color: "#ff1366"
    },
    {
      name: "Пользовательский",
      type: 'line',
      data: mainData[5],
      color: "#46179b"
    }
  ])
}

export const createAttendanceChartData = (stats: MainChartInput) : ApexNonAxisChartSeries => {
  return Object.values(stats).map((e:any) => e)
}

export const createCountChartSeries = (stats: MainChartInput) : ApexNonAxisChartSeries => {
  return Object.values(stats).map((e:any) => e)
}
