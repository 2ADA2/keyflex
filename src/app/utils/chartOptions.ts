import {ChartLineOptions} from "../pages/user/user.component";

export const mainChart: ChartLineOptions = {
  stroke: {
    width: 4, // Устанавливаем ширину линий
    curve: 'smooth' // Сглаживание линий
  },
  chart: {
    type: 'line', // Устанавливаем тип графика как 'line'
    height: 500,
    background: "#1c1c1c",
    foreColor: "#fff",
    animations: {enabled: false}
  },
  xaxis: {
    min: 0,
    max: 100,
    labels: {
      show: false
    }
  },
  yaxis: {
    min: 0,
    max: 100
  },
  grid: {
    show: false
  },
  tooltip: {
    theme: 'dark',
    style: {
      fontSize: '12px',
      fontFamily: 'Arial, sans-serif'
    },
    x: {
      formatter: function (val: number) {
        return "Результат №" + val
      }
    }
  }
}


export const countChart: any = {
  chart: {
    type: "polarArea",
    height: 300
  },
  colors: ["#00c776", "#b2c91c", "#ff7200", "#1924B1", "#D60062", "#360570"],
  stroke: {
    show: false
  },
  fill: {
    opacity: 1,
  },
  plotOptions: {
    polarArea: {
      dataLabels: {
        show: false // Убирает метки данных
      }
    }
  },
  grid: {
    show: false // Убирает линии сетки
  },
  yaxis: {
    show: false // Убирает метки по оси Y, если применимо
  },
  xaxis: {
    labels: {
      show: false // Убирает метки по оси X, если применимо
    }
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          display: true,
          position: "bottom"
        }
      }
    }
  ],
  labels: ["200 слов", "1000 слов", "Текст", "Английский", "Символьный", "Пользовательский"]
};

export const barChartOptions: any = {
  chart: {
    type: 'bar',
    height: 350,
    background: "#1c1c1c",
    foreColor: "#fff",
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
      distributed: true // Распределение цветов по каждому столбцу
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    theme: 'dark',
    shared: false,
    style: {
      fontSize: '12px',
      fontFamily: 'Arial, sans-serif',
      foreColor: "#000",
      background: "#000"
    },
    y: {
      title: {
        formatter: function () {
          return 'Слов в минуту:';
        }
      },
    }
  },
  colors: ['#33FF57', '#AF33FF', '#33FF57', '#33FF57', '#33FF57', '#FFA833', '#33FF57', '#33FF57', '#33FF57', '#33FF57'],
  legend: {
    show: false
  }
};

