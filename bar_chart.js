let currentBarChart;

// Function untuk fetch data
async function fetchBarData() {
  const response = await fetch("bar.json");
  return await response.json();
}

// Function untuk inisialisasi chart
function initializeBarChart(labels, dataset) {
  const ctx = document.getElementById("bar-chart").getContext("2d");

  currentBarChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: dataset,
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Category",
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
            },
          },
        },
        datalabels: {
          anchor: 'end',
          align: 'end',
          color: '#555',
          font: {
            size: 12,
            weight: 'bold'
          }
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
          },
        },
      },
    },
    plugins: [ChartDataLabels], // Tambahkan plugin ChartDataLabels
  });
}

// function untuk meng-update data sesuai filter
async function updateBarChart() {
  const dataFilter = document.getElementById("data-filter").value;
  const data = await fetchBarData();
  const selectedData = data[dataFilter];

  const dataset = [
    {
      label: "Customer",
      data: selectedData.Customer,
      backgroundColor: "rgba(245, 245, 66, 0.5)",
      borderColor: "rgba(245, 245, 66, 1)",
      borderWidth: 3,
    },
  ];

  // untuk menghapus chart sebelumnya
  if (currentBarChart) {
    currentBarChart.destroy();
  }

  initializeBarChart(data.labels, dataset);
}

// Initialize the bar chart with the default dataset (Cumulative)
document.addEventListener("DOMContentLoaded", async () => {
  await updateBarChart();
});