const { hitungLuasHandler, hitungVolumeHandler, getDataHandler } = require('./handler');

// definisikan rute-rute yang tersedia
const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Selamat datang di aplikasi penghitungan luas dan volume bangun ruang!';
        }
    },
    {
        method: 'POST',
        path: '/hitung-luas',
        handler: hitungLuasHandler,  
    },
    {
        method: 'POST',
        path: '/hitung-volume',
        handler: hitungVolumeHandler, 
    },
    {
        method: 'GET',
        path: '/data',
        handler: getDataHandler, 
    },
];

module.exports = routes;
