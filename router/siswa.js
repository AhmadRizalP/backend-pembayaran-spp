const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const md5 = require('md5');

const models = require('../models/index');
const siswa = models.siswa;
const auth = require('../auth');

app.get('/', auth, async (req, res) => {
  let result = await siswa.findAll({
    include: ['spp', 'kelas'],
  });
  res.json(result);
});

app.get('/:nisn', async (req, res) => {
  let param = { nisn: req.params.nisn };
  siswa
    .findOne({ where: param, include: ['spp', 'kelas'] })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

app.post('/', auth, async (req, res) => {
  let data = {
    nisn: req.body.nisn,
    nis: req.body.nis,
    nama: req.body.nama,
    id_kelas: req.body.id_kelas,
    alamat: req.body.alamat,
    no_telp: req.body.no_telp,
    username: req.body.username,
    password: md5(req.body.password),
    id_spp: req.body.id_spp,
  };
  siswa
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
  let param = { nisn: req.body.nisn };
  let data = {
    nis: req.body.nis,
    nama: req.body.nama,
    id_kelas: req.body.id_kelas,
    alamat: req.body.alamat,
    no_telp: req.body.no_telp,
    username: req.body.username,
    password: md5(req.body.password),
    id_spp: req.body.id_spp,
  };
  siswa
    .update(data, { where: param })
    .then((result) => {
      res.json({ message: 'data has been updated' });
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

app.delete('/:nisn', auth, async (req, res) => {
  let param = { nisn: req.params.nisn };
  siswa
    .destroy({ where: param })
    .then((result) => {
      res.json({ message: 'data has been deleted' });
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

module.exports = app;
