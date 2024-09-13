// mengelola input form berdasarkan jenis bentuk
const form = document.getElementById('geometryForm');
const jenisSelect = document.getElementById('jenis');
const inputDataDiv = document.getElementById('inputData');
const getDataBtn = document.getElementById('getDataBtn');
const dataOutput = document.getElementById('dataOutput');
const resultDiv = document.getElementById('result');

let selectedJenis = '';

jenisSelect.addEventListener('change', function() {
    const selectedValue = jenisSelect.value;
    selectedJenis = selectedValue;
    inputDataDiv.innerHTML = '';

    if (selectedValue === 'luas') {
        inputDataDiv.innerHTML = `
            <label for="bentuk">Pilih bangun datar:</label>
            <select id="bentuk" name="bentuk" required>
                <option value="">Pilih...</option>
                <option value="persegi">Persegi</option>
                <option value="segitiga">Segitiga</option>
                <option value="lingkaran">Lingkaran</option>
            </select><br><br>
            <div id="inputBentuk"></div>
        `;
        handleBangunDatarSelection();
    } else if (selectedValue === 'volume') {
        inputDataDiv.innerHTML = `
            <label for="bentuk">Pilih bangun ruang:</label>
            <select id="bentuk" name="bentuk" required>
                <option value="">Pilih...</option>
                <option value="kubus">Kubus</option>
                <option value="balok">Balok</option>
                <option value="bola">Bola</option>
            </select><br><br>
            <div id="inputBentuk"></div>
        `;
        handleBangunRuangSelection();
    }
});

const handleBangunDatarSelection = () => {
    const bentukSelect = document.getElementById('bentuk');
    bentukSelect.addEventListener('change', function() {
        const selectedBentuk = bentukSelect.value;
        const inputBentukDiv = document.getElementById('inputBentuk');
        inputBentukDiv.innerHTML = '';

        if (selectedBentuk === 'persegi') {
            inputBentukDiv.innerHTML = '<label for="sisi">Sisi:</label><input type="number" id="sisi" name="sisi" required><br><br>';
        } else if (selectedBentuk === 'segitiga') {
            inputBentukDiv.innerHTML = '<label for="alas">Alas:</label><input type="number" id="alas" name="alas" required><br><br><label for="tinggi">Tinggi:</label><input type="number" id="tinggi" name="tinggi" required><br><br>';
        } else if (selectedBentuk === 'lingkaran') {
            inputBentukDiv.innerHTML = '<label for="jariJari">Jari-Jari:</label><input type="number" id="jariJari" name="jariJari" required><br><br>';
        }
    });
};

const handleBangunRuangSelection = () => {
    const bentukSelect = document.getElementById('bentuk');
    bentukSelect.addEventListener('change', function() {
        const selectedBentuk = bentukSelect.value;
        const inputBentukDiv = document.getElementById('inputBentuk');
        inputBentukDiv.innerHTML = '';

        if (selectedBentuk === 'kubus') {
            inputBentukDiv.innerHTML = '<label for="sisi">Sisi:</label><input type="number" id="sisi" name="sisi" required><br><br>';
        } else if (selectedBentuk === 'balok') {
            inputBentukDiv.innerHTML = '<label for="panjang">Panjang:</label><input type="number" id="panjang" name="panjang" required><br><br><label for="lebar">Lebar:</label><input type="number" id="lebar" name="lebar" required><br><br><label for="tinggi">Tinggi:</label><input type="number" id="tinggi" name="tinggi" required><br><br>';
        } else if (selectedBentuk === 'bola') {
            inputBentukDiv.innerHTML = '<label for="jariJari">Jari-Jari:</label><input type="number" id="jariJari" name="jariJari" required><br><br>';
        }
    });
};

// handle form submission and send data to backend
form.addEventListener('submit', async (event) => {
    event.preventDefault();  // mencegah halaman refresh
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const endpoint = selectedJenis === 'luas' ? '/hitung-luas' : '/hitung-volume';

    try {
        // mengirim data ke server
        const response = await fetch(`http://localhost:3000${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert(result.message + ' Hasil: ' + result.hasil);

        // menampilkan hasil perhitungan
        // resultDiv.innerHTML = `
        //     <h3>Hasil Perhitungan</h3>
        //     <p>${result.message}: ${result.hasil}</p>
        // `;

    } catch (error) {
        console.error('Error:', error);
    }
});


document.getElementById('geometryForm').addEventListener('submit', function(event) {
    const teleponInput = document.getElementById('telepon');
    const teleponValue = teleponInput.value;
    
    // validasi panjang nomor telepon
    if (teleponValue.length < 10 || teleponValue.length > 12) {
        alert('Nomor telepon harus terdiri dari 10 hingga 12 digit.');
        event.preventDefault(); // mencegah pengiriman form
        return;
    }
});


// fetch data from backend CSV and display
// getDataBtn.addEventListener('click', async () => {
//     try {
//         const response = await fetch('http://localhost:3000/data');
//         const data = await response.text();
//         dataOutput.textContent = data;
//     } catch (error) {
//         console.error('Error:', error);
//     }
// });