// const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const { hitungLuas, hitungVolume } = require('./geometry');
const { saveUserData } = require('./user');

// handler untuk menghitung luas bangun datar
const hitungLuasHandler = async (request, h) => {
    const payload = request.payload;
    const hasilLuas = hitungLuas(payload); // memanggil fungsi hitungLuas dari geometry.js

    await saveUserData(payload, 'luas', hasilLuas);  // menyimpan data siswa dan hasil

    return h.response({
        status: 'success',
        message: `Luas ${payload.bentuk} telah dihitung.`,
        hasil: hasilLuas,
    });
};

// handler untuk menghitung volume bangun ruang
const hitungVolumeHandler = async (request, h) => {
    const payload = request.payload;
    const hasilVolume = hitungVolume(payload); // memanggil fungsi hitungVolume dari geometry.js

    await saveUserData(payload, 'volume', hasilVolume);  // menyimpan data siswa dan hasil

    return h.response({
        status: 'success',
        message: `Volume ${payload.bentuk} telah dihitung.`,
        hasil: hasilVolume,
    });
};

// handler untuk mendapatkan data CSV yang sudah tersimpan
const getDataHandler = (request, h) => {
    const data = fs.readFileSync('data_siswa.csv', 'utf-8');
    return h.response(data).type('text/csv');
};

module.exports = {
    hitungLuasHandler,
    hitungVolumeHandler,
    getDataHandler
};
