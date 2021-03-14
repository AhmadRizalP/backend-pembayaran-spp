const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const auth = require('../auth');
app.use(auth);
const models = require('../models/index');
const kelas = models.kelas;

app.get('/', async (req, res) => {
  let result = await kelas.findAll();
  res.json(result);
});

app.post('/', async (req, res) => {
  let data = {
    nama_kelas: req.body.nama_kelas,
    kompetensi_keahlian: req.body.kompetensi_keahlian,
  };
  kelas
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

app.put('/', async (req, res) => {
  let param = { id_kelas: req.body.id_kelas };
  let data = {
    nama_kelas: req.body.nama_kelas,
    kompetensi_keahlian: req.body.kompetensi_keahlian,
  };
  kelas
    .update(data, { where: param })
    .then((result) => {
      res.json({ message: 'data has been updated' });
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

app.delete('/:id_kelas', async (req, res) => {
  let param = { id_kelas: req.params.id_kelas };
  kelas
    .destroy({ where: param })
    .then((result) => {
      res.json({ message: 'data has been deleted' });
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

module.exports = app;
