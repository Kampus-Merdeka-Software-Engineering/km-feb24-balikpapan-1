let currentChart;

// Function untuk fetch data
async function fetchData() {
  const response = await fetch("line_chart.json");
  return await response.json();
}

function initializeChart(labels, revenueData, transactionData) {
  const ctx = document.getElementById("line-chart").getContext("2d");

  currentChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Revenue",
        data: revenueData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointRadius: 3,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
      }, {
        label: "Transaction",
        data: transactionData,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointRadius: 3,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            font: {
              size: 9,
              color: "#666",
            },
          },
        },
        tooltip: {
          bodyFont: {
            size: 12,
          },
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.dataset.label === "Revenue" && context.parsed.y !== null) {
                label += `$${context.parsed.y.toLocaleString()}`;
              } else if (context.parsed.y !== null) {
                label += context.parsed.y.toLocaleString();
              }
              return label;
            },
          },
        },
        datalabels: {
          align: "end",
          anchor: "end",
          font: {
            size: 9,
          },
          formatter: (value, context) => {
            if (context.dataset.label === "Revenue") {
              return `$${value.toLocaleString()}`;
            } else {
              return value.toLocaleString();
            }
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 10,
              color: "#999",
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 8,
              color: "#999",
            },
            callback: function (value) {
              return value.toLocaleString();
            },
          },
        },
      },
      elements: {
        line: {
          tension: 0.5,
        },
        point: {
          radius: 3,
          pointStyle: "circle",
          borderWidth: 1,
        },
      },
    },
    plugins: [ChartDataLabels], //menampilkan data label
  });
}

// Function untuk meng-update data sesuai filter
async function updateChart() {
  const dataFilter = document.getElementById("data-filter").value;
  const data = await fetchData();
  const selectedData = data[dataFilter];

  const labels = data.labels;
  const revenueData = selectedData.Revenue;
  const transactionData = selectedData.Transaction;

  // untuk menghapus chart sebelumnya
  if (currentChart) {
    currentChart.destroy();
  }

  initializeChart(labels, revenueData, transactionData);

  // Update scorecards
  document.getElementById("transaction-total").innerText =
    selectedData.Transaction.reduce((a, b) => a + b, 0).toLocaleString();
  document.getElementById("revenue-total").innerText =
    "$" + selectedData.Revenue.reduce((a, b) => a + b, 0).toLocaleString();
  document.getElementById("customer-total").innerText =
    selectedData.Customer.reduce((a, b) => a + b, 0).toLocaleString();
}


// Initialize the chart with the default dataset (Cumulative)
document.addEventListener("DOMContentLoaded", async () => {
  await updateChart();
});
