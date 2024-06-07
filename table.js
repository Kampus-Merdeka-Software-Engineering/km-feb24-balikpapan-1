// Ambil data dari file JSON
fetch('table.json')
    .then(response => response.json())
    .then(data => {
        // Inisialisasi Grid.js
        new gridjs.Grid({
            columns: [
                "Product",
                "Machine",
                "Location",
                    {
                        name: "Price",
                        formatter: (cell) => `$${cell}` //mengubah format kolom price 
                    }
            ],
            data: data.map(item => [item.Product, item.Machine, item.Location,item.Price]),

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
    })
    .catch(error => console.error('Error fetching data:', error));