// mengambil data CSV dari backend dan tampilkan di tabel serta hitung statistik
async function loadCSVData() {
    try {
        // emot nangissss
        const response = await fetch('http://localhost:3000/data'); // endpoint yang mengembalikan CSV
        const data = await response.text();

        const rows = data.split('\n'); // Pisahkan per baris
        const tableBody = document.getElementById('dataBody');
        const statisticsDiv = document.getElementById('statistics');

        let totalLuas = 0;
        let totalVolume = 0;
        const shapeCounts = {};
        let totalEntries = 0;

        rows.forEach(row => {
            if (row.trim() !== "") {  // memastikan baris tidak kosong
                const cols = row.split(',');  // memisahkan data dengan koma
                const tr = document.createElement('tr');
                cols.forEach(col => {
                    const td = document.createElement('td');
                    td.textContent = col;
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);

                // hitung statistik
                totalEntries++;
                const jenisPerhitungan = cols[6].trim();
                const bentuk = cols[7].trim();
                const hasil = parseFloat(cols[8].trim());

                if (jenisPerhitungan === 'luas') {
                    totalLuas += hasil;
                } else if (jenisPerhitungan === 'volume') {
                    totalVolume += hasil;
                }

                if (shapeCounts[bentuk]) {
                    shapeCounts[bentuk]++;
                } else {
                    shapeCounts[bentuk] = 1;
                }
            }
        });

        // hitung persentase
        const statisticsHTML = `
            <h2>Statistik Penghitungan</h2>
            <p>Total Penghitungan Luas: ${totalLuas}</p>
            <p>Total Penghitungan Volume: ${totalVolume}</p>
            <p>Total Penghitungan: ${totalEntries}</p>
            <h3>Persentase Penghitungan Per Bentuk</h3>
            <ul>
                ${Object.entries(shapeCounts).map(([bentuk, count]) => `
                    <li>${bentuk}: ${((count / totalEntries) * 100).toFixed(2)}%</li>
                `).join('')}
            </ul>
        `;

        statisticsDiv.innerHTML = statisticsHTML;
    } catch (error) {
        console.error('Error:', error);
    }
}

// fungsi untuk mengurutkan tabel berdasarkan nama, usia, dan tanggal/waktu
function sortTable(columnIndex, order) {
    const tableBody = document.getElementById('dataBody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const sortedRows = rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();
        
        let comparison = 0;

        if (columnIndex === 0) { // Tanggal dan Waktu
            comparison = new Date(cellA) - new Date(cellB);
        } else if (columnIndex === 3) { // Usia
            comparison = parseInt(cellA) - parseInt(cellB);
        } else { // Nama
            comparison = cellA.localeCompare(cellB);
        }

        return order === 'asc' ? comparison : -comparison;
    });

    // clear and append sorted rows
    tableBody.innerHTML = '';
    sortedRows.forEach(row => tableBody.appendChild(row));
}

document.getElementById('sortNameAscBtn').addEventListener('click', () => sortTable(1, 'asc'));
document.getElementById('sortNameDescBtn').addEventListener('click', () => sortTable(1, 'desc'));
document.getElementById('sortAgeAscBtn').addEventListener('click', () => sortTable(3, 'asc'));
document.getElementById('sortAgeDescBtn').addEventListener('click', () => sortTable(3, 'desc'));
document.getElementById('sortDateAscBtn').addEventListener('click', () => sortTable(0, 'asc'));
document.getElementById('sortDateDescBtn').addEventListener('click', () => sortTable(0, 'desc'));

// load data ketika halaman dimuat
window.onload = loadCSVData;

// kembali ke index.html
document.getElementById('goBackBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
});