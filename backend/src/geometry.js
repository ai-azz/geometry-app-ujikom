// fungsi untuk menghitung luas bangun datar
const hitungLuas = (data) => {
    const { bentuk, sisi, alas, tinggi, jariJari } = data;
    let hasilLuas = 0;

    if (bentuk === 'persegi') {
        hasilLuas = sisi * sisi;
    } else if (bentuk === 'segitiga') {
        hasilLuas = 0.5 * alas * tinggi;
    } else if (bentuk === 'lingkaran') {
        hasilLuas = Math.PI * jariJari * jariJari;
    }

    return hasilLuas;
};

// fungsi untuk menghitung volume bangun ruang
const hitungVolume = (data) => {
    const { bentuk, sisi, panjang, lebar, tinggi, jariJari } = data;
    let hasilVolume = 0;

    if (bentuk === 'kubus') {
        hasilVolume = sisi * sisi * sisi;
    } else if (bentuk === 'balok') {
        hasilVolume = panjang * lebar * tinggi;
    } else if (bentuk === 'bola') {
        hasilVolume = (4 / 3) * Math.PI * Math.pow(jariJari, 3);
    }

    return hasilVolume;
};

module.exports = {
    hitungLuas,
    hitungVolume,
};
