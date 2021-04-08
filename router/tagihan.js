const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const models = require('../models/index');
const tagihan = models.tagihan;
const siswa = models.siswa;
const auth = require('../auth');
const spp = require('../models/spp');

app.get('/', auth, async (req, res) => {
  let result = await tagihan.findAll({
    include: [
      {
        model: siswa,
        as: 'siswa',
        include: ['spp'],
      },
    ],
  });
  res.json(result);
});

app.get('/:nisn', async (req, res) => {
  let param = { nisn: req.params.nisn };
  tagihan
    .findAll({
      where: param,
      include: [
        {
          model: siswa,
          as: 'siswa',
          include: ['spp'],
        },
      ],
    })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

app.post('/', auth, async (req, res) => {
  let idsiswa = { nisn: req.body.nisn };

  let result1 = await siswa.findOne({ where: idsiswa });
  let idspp = result1.id_spp;
  let data = {
    id_petugas: req.body.id_petugas,
    nisn: req.body.nisn,
    bulan: req.body.bulan,
    tahun: req.body.tahun,
    id_spp: idspp,
    konfirmasi: 0,
  };
  tagihan
    .create(data)
    .then((result) => {
      res.json({ message: 'data has been inserted' });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

app.put('/', auth, async (req, res) => {
  let paramsiswa = { nisn: req.body.nisn };
  let param = { id_tagihan: req.body.id_tagihan };
  if (req.body.nisn) {
    let result1 = await siswa.findOne({ where: paramsiswa });
    let idspp = result1.id_spp;
    let data = {
      id_petugas: req.body.id_petugas,
      nisn: req.body.nisn,
      bulan: req.body.bulan,
      tahun: req.body.tahun,
      id_spp: idspp,
    };
    tagihan
      .update(data, { where: param })
      .then((result) => {
        res.json({ message: 'data has been updated' });
      })
      .catch((error) => {
        res.json({ message: error.message });
      });
  } else {
    let data = {
      id_petugas: req.body.id_petugas,
      bulan: req.body.bulan,
      tahun: req.body.tahun,
    };
    tagihan
      .update(data, { where: param })
      .then((result) => {
        res.json({ message: 'data has been updated' });
      })
      .catch((error) => {
        res.json({ message: error.message });
      });
  }
});

app.delete('/:id_tagihan', auth, async (req, res) => {
  let param = { id_tagihan: req.params.id_tagihan };
  tagihan
    .destroy({ where: param })
    .then((result) => {
      res.json({ message: 'data has been deleted' });
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

module.exports = app;
