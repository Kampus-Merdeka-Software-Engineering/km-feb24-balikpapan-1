let currentPieChart;

// Function untuk fetch data
async function fetchPieData() {
  const response = await fetch("pie.json");
  return await response.json();
}

// Function untuk inisialisasi chart dan membuat parameter
function initializePieChart(labels, dataset) {
  const ctx = document.getElementById("pie-chart").getContext("2d");

  currentPieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: dataset,
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
        },
        legend: {
          display: true,
          position: "right",
          labels: {
            font: {
              size: 8,
            },
          },
        },
        // Mengubah satuan data label menjadi persentase
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed !== null) {
                label += context.parsed.toFixed(2) + "%";
              }
              return label;
            },
          },
        },
        datalabels: {
          formatter: (value, context) => {
            const data = context.chart.data.datasets[0].data;
            const total = data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1) + "%";
            return percentage;
          },
          color: "#000",
          font: {
            size: 8,
          },
          anchor: "center",
          align: "end",
          offset: 20,
        },
      },
    },
    plugins: [ChartDataLabels],
  });
}

// Function untuk meng-update data sesuai filter
async function updatePieChart() {
  const dataFilter = document.getElementById("data-filter").value;
  const data = await fetchPieData();
  const selectedData = data[dataFilter];

  // Menghitung total dari seluruh data
  const total = selectedData.Revenue.reduce((a, b) => a + b, 0);

  // Menghitung persentase masing-masing data
  const percentages = selectedData.Revenue.map(
    (value) => (value / total) * 100
  );

  const dataset = [
    {
      data: percentages,
      backgroundColor: [
        "rgba(255, 0, 0, 0.3)", 
        "rgba(0, 255, 0, 0.3)", 
        "rgba(0, 0, 255, 0.3)", 
        "rgba(255, 255, 0, 0.3)", 
        "rgba(255, 0, 255, 0.3)", 
        "rgba(0, 255, 255, 0.3)", 
        "rgba(128, 0, 0, 0.3)", 
        "rgba(0, 128, 0, 0.3)", 
        "rgba(0, 0, 128, 0.3)", 
        "rgba(255, 128, 0, 0.3)", 
        "rgba(128, 255, 0, 0.3)", 
        "rgba(0, 128, 255, 0.3)",
      ],
      borderColor: [
        "rgba(255, 0, 0, 1)", 
        "rgba(0, 255, 0, 1)", 
        "rgba(0, 0, 255, 1)", 
        "rgba(255, 255, 0, 1)", 
        "rgba(255, 0, 255, 1)", 
        "rgba(0, 255, 255, 1)", 
        "rgba(128, 0, 0, 1)", 
        "rgba(0, 128, 0, 1)", 
        "rgba(0, 0, 128, 1)", 
        "rgba(255, 128, 0, 1)", 
        "rgba(128, 255, 0, 1)", 
        "rgba(0, 128, 255, 1)", 
      ],
      borderWidth: 1,
    },
  ];

  // Menghapus chart sebelumnya
  if (currentPieChart) {
    currentPieChart.destroy();
  }

  initializePieChart(data.labels, dataset);
}

// Inisialisasi pie chart dengan dataset default (Revenue)
document.addEventListener("DOMContentLoaded", async () => {
  await updatePieChart();
});
