const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const spp = require('./router/spp');
const kelas = require('./router/kelas');
const petugas = require('./router/petugas');
const siswa = require('./router/siswa');
const tagihan = require('./router/tagihan');
const pembayaran = require('./router/pembayaran');
app.use('/api/spp', spp);
app.use('/api/kelas', kelas);
app.use('/api/petugas', petugas);
app.use('/api/siswa', siswa);
app.use('/api/tagihan', tagihan);
app.use('/api/pembayaran', pembayaran);

app.listen(8000, () => {
  console.log('Server run on port 8000');
});
