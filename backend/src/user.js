const { createObjectCsvWriter } = require('csv-writer');

// fungsi format tanggal dan waktu
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// fungsi menyimpan data siswa ke CSV
const saveUserData = async (data, jenisPenghitungan, hasil) => {
    const csvWriter = createObjectCsvWriter({
        path: 'data_siswa.csv',
        header: [
            {id: 'tanggal', title: 'Tanggal'},
            {id: 'nama', title: 'Nama'},
            {id: 'sekolah', title: 'Sekolah'},
            {id: 'usia', title: 'Usia'},
            {id: 'alamat', title: 'Alamat'},
            {id: 'telepon', title: 'Telepon'},
            {id: 'jenisPenghitungan', title: 'Jenis Penghitungan'},
            {id: 'bentuk', title: 'Bentuk'},
            {id: 'hasil', title: 'Hasil'},
        ],
        append: true,
    });

    // const tanggal = new Date().toISOString();
    const tanggal = formatDate(new Date());
    await csvWriter.writeRecords([{
        tanggal,
        nama: data.nama,
        sekolah: data.sekolah,
        usia: data.usia,
        alamat: data.alamat,
        telepon: data.telepon,
        jenisPenghitungan,
        bentuk: data.bentuk,
        hasil,
    }]);
};

module.exports = { saveUserData };
