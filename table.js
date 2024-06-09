// Ambil data dari file JSON
fetch('table.json')
    .then(response => response.json())
    .then(data => {
        // Menyimpan data awal
        const originalData = data;

        // Variabel untuk menyimpan data yang sudah difilter
        let filteredData = originalData;

        // Inisialisasi Grid.js
        const grid = new gridjs.Grid({
            columns: [
                "Product",
                "Machine",
                "Transaction",
                {
                    name: "Revenue",
                    formatter: (cell) => `$${cell}` //mengubah format kolom revenue
                }
            ],
            data: filteredData.map(item => [item.Product, item.Machine, item.Transaction, item.Revenue]),

            search: {
                enabled: true,
            },
            pagination: {
                enabled: true,
                limit: 10
            },
            language: {
                'search': {
                    'placeholder': '🔍 Search..',
                },
                pagination: {
                    'previous': '⬅️',
                    'next': '➡️',
                    'result': () => 'Record'
                },
            },
            style: {
                th: {
                    'background-color': 'rgba(216, 82, 232, 1)',
                    color: '#000',
                    'border-bottom': '3px solid #ccc',
                    'text-align': 'center'
                },
                table: {
                    'font-size': '10px',
                    'text-align': 'center'
                }
            },
            default: true,
            sort: true,
            className: {
                td: 'td',
                th: 'th',
                sort: 'srt',
                paginationButton: 'pgButton',
                paginationSummary: 'pgSum'
            }
        }).render(document.getElementById("table-data"));

        // Fungsi untuk memfilter data dan merender ulang Grid.js
        function updateTable() {
            const filterValue = document.getElementById("data-filter").value;

            if (filterValue === "cumulative") {
                filteredData = originalData;
            } else {
                filteredData = originalData.filter(item => item.Machine === filterValue);
            }

            grid.updateConfig({
                data: filteredData.map(item => [item.Product, item.Machine, item.Transaction, item.Revenue])
            }).forceRender();
        }

        // Memanggil fungsi updateChart() saat halaman dimuat
        updateTable();

        // Menambahkan event listener pada dropdown
        document.getElementById("data-filter").addEventListener("change", updateTable);
    })
    .catch(error => console.error('Error fetching data:', error));