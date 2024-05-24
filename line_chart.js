
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
fetch('line_chart.json')
.then(response => response.json())
.then(data => {
    const ctx = document.getElementById('line-chart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Transaction and Revenue Data',
            font: {
              size: 24,
              color: '#333'
            }
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                size: 16,
                color: '#666'
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 14,
                color: '#999'
              }
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 14,
                color: '#999'
              }
            }
          }
        },
        elements: {
          line: {
            tension: 0.5,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2
          },
          point: {
            radius: 3,
            pointStyle: 'circle',
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        }
      }
    });
  });