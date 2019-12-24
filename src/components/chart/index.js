import { Chart } from "chart.js";

const now = new Date();
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];
function ChartMultiline(dataSet, labelsSet = [0, 11]) {
  const getMonths = months.slice(labelsSet[0], labelsSet[1]);
  const ctx = document.getElementById("chartMultiline").getContext("2d");

  Chart.defaults.global.defaultFontColor = "#edf0f2";

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: getMonths,
      datasets: [
        {
          fill: false,
          label: ["Pequena"],
          borderColor: "#6c4fc3",
          backgroundColor: "#6c4fc3",
          data: dataSet.sm,
          pointHoverRadius: 5,
          pointRadius: 4,
          pointBorderWidth: 5
        },
        {
          fill: false,
          label: ["Média"],
          borderColor: "#5ac146",
          backgroundColor: "#5ac146",
          data: dataSet.md,
          pointHoverRadius: 5,
          pointRadius: 4,
          pointBorderWidth: 5
        },
        {
          fill: false,
          label: ["Grande"],
          borderColor: "#007bff",
          backgroundColor: "#007bff",
          data: dataSet.lg,
          pointHoverRadius: 5,
          pointRadius: 4,
          pointBorderWidth: 5
        }
      ]
    },
    options: {
      legend: {
        labels: {
          fontSize: 12
        }
      },
      title: {
        display: true,
        text: `Quantidade vendida em ${now.getFullYear()}`,
        fontSize: 15
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: "#213640"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              color: "#213640"
            }
          }
        ]
      }
    }
  });
  return chart;
}
function ChartPie(dataSet) {
  const ctx = document.getElementById("chartPie").getContext("2d");
  const chart = new Chart(ctx, {
    type: "pie",
    data: {
      datasets: [
        {
          data: dataSet,
          backgroundColor: ["#5ac146", "rgba(108, 79, 195, 0.40)"],
          borderColor: "#6c4fc3",
        }
      ],
      labels: ["Recebido R$", "Á receber R$"]
    },
    options: {
      legend: {
        labels: {
          fontSize: 12
        }
      },
       title: {
        display: true,
        text: `Faturamento de ${now.getFullYear()}`,
        fontSize: 15
      },
    }
  });
  return chart;
}
export { ChartMultiline, ChartPie };
