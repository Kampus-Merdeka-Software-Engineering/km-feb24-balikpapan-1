let currentChart;

// Function untuk fetch data
async function fetchData() {
  const response = await fetch("line_chart.json");
  return await response.json();
}

// Function untuk inisialisasi chart
function initializeChart(labels, datasets) {
  const ctx = document.getElementById("line-chart").getContext("2d");

  currentChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Revenue Per Month",
          font: {
            size: 24,
            color: "#333",
          },
        },
        legend: {
          display: true,
          position: "top",
          labels: {
            font: {
              size: 16,
              color: "#666",
            },
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
              size: 14,
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
              size: 14,
              color: "#999",
            },
            callback: function(value) {
              return '$' + value.toLocaleString();
            }
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
  });
}

// Function untuk meng-update data sesuai filter
async function updateChart() {
  const dataFilter = document.getElementById("data-filter").value;
  const data = await fetchData();
  const selectedData = data[dataFilter];

  const datasets = [
    {
      label: "Revenue",
      data: selectedData.Revenue,
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      pointBackgroundColor: "rgba(75, 192, 192, 1)",
      pointRadius:  2,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
    },
    {
      label: "Transaction",
      data: selectedData.Transaction,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
      pointBackgroundColor: "rgba(255, 99, 132, 1)",
      pointRadius: 2,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
    },
    {
      label: "Customer",
      data: selectedData.Customer,
      backgroundColor: "rgba(52, 67, 235, 0.2)",
      borderColor: "rgba(52, 67, 235, 1)",
      borderWidth: 1,
      pointBackgroundColor: "rgba(52, 67, 235, 1)",
      pointRadius: 2,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(52, 67, 235, 1)",
    },
  ];

  // untuk menghapus chart sebelumnya
  if (currentChart) {
    currentChart.destroy();
  }

  initializeChart(data.labels, datasets);

  // Update scorecards
  document.getElementById("transaction-total").innerText =
    selectedData.Transaction.reduce((a, b) => a + b, 0).toLocaleString();
  document.getElementById("revenue-total").innerText =
    '$' + selectedData.Revenue.reduce((a, b) => a + b, 0).toLocaleString();
  document.getElementById("customer-total").innerText =
    selectedData.Customer.reduce((a, b) => a + b, 0).toLocaleString();
}

// Initialize the chart with the default dataset (Cumulative)
document.addEventListener("DOMContentLoaded", async () => {
  await updateChart();
});
