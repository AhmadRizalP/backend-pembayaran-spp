const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dateformat = require('dateformat');
const auth = require('../auth');

const models = require('../models/index');
const tagihan = models.tagihan;
const siswa = models.siswa;
const pembayaran = models.pembayaran;
const spp = models.spp;

app.get('/', auth, async (req, res) => {
  let result = await pembayaran.findAll({ include: ['tagihan', 'siswa'] });
  res.json(result);
});

app.get('/:nisn', async (req, res) => {
  let param = { nisn: req.params.nisn };
  pembayaran
    .findAll({ where: param, include: ['tagihan'] })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

app.post('/', async (req, res) => {
  let paramsiswa = { nisn: req.body.nisn };
  let result1 = await siswa.findOne({ where: paramsiswa });
  let idspp = result1.id_spp;

  let paramspp = { id_spp: idspp };
  let result2 = await spp.findOne({ where: paramspp });

  let paramtagihan = { id_tagihan: req.body.id_tagihan };
  let data = {
    id_petugas: req.body.id_petugas,
    id_tagihan: req.body.id_tagihan,
    nisn: req.body.nisn,
    tgl_bayar: dateformat(new Date(), 'yyyy-mm-dd'),
    bulan_bayar: req.body.bulan_bayar,
    tahun_bayar: req.body.tahun_bayar,
    id_spp: idspp,
    jumlah_bayar: result2.nominal,
    konfirmasi: 0,
  };
  pembayaran
    .create(data)
    .then((result) => {
      let data = {
        konfirmasi: 1,
      };
      let result3 = tagihan.update(data, { where: paramtagihan });
      if (result3) {
        res.json({ message: 'data has been inserted' });
      }
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

app.put('/', auth, async (req, res) => {
  let paramsiswa = { nisn: req.body.nisn };
  let paramtagihan = { id_tagihan: req.body.id_tagihan };
  let param = { id_pembayaran: req.body.id_pembayaran };
  if (req.body.id_tagihan) {
    let result3 = await pembayaran.findOne({ where: param });
    let id_t = result3.id_tagihan;
    let paramt = { id_tagihan: id_t };
    let data = {
      konfirmasi: 0,
    };
    tagihan
      .update(data, { where: paramt })
      .then((result) => {})
      .catch((error) => {
        res.json({ message: error.message });
      });
  }
  if (req.body.nisn) {
    let result1 = await siswa.findOne({ where: paramsiswa });
    let idspp = result1.id_spp;
    let paramspp = { id_spp: idspp };
    let result2 = await spp.findOne({ where: paramspp });
    let data = {
      id_petugas: req.body.id_petugas,
      id_tagihan: req.body.id_tagihan,
      nisn: req.body.nisn,
      tgl_bayar: dateformat(new Date()),
      bulan_bayar: req.body.bulan_bayar,
      tahun_bayar: req.body.tahun_bayar,
      id_spp: idspp,
      jumlah_bayar: result2.nominal,
    };
    pembayaran
      .update(data, { where: param })
      .then((result) => {
        if (req.body.id_tagihan) {
          let data = {
            konfirmasi: 1,
          };
          tagihan.update(data, { where: paramtagihan });
        }
        res.json({ message: 'data has been updated' });
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
  } else {
    let data = {
      id_petugas: req.body.id_petugas,
      id_tagihan: req.body.id_tagihan,
      tgl_bayar: dateformat(new Date()),
      bulan_bayar: req.body.bulan_bayar,
      tahun_bayar: req.body.tahun_bayar,
    };
    pembayaran
      .update(data, { where: param })
      .then((result) => {
        if (req.body.id_tagihan) {
          let data = {
            konfirmasi: 1,
          };
          tagihan.update(data, { where: paramtagihan });
        }
        res.json({ message: 'data has been updated' });
      })
      .catch((error) => {
        res.json({ message: error.message });
      });
  }
});

app.delete('/:id_pembayaran', auth, async (req, res) => {
  let param = { id_pembayaran: req.params.id_pembayaran };
  let result = await pembayaran.findOne({ where: param });
  let id_tagihan = { id_tagihan: result.id_tagihan };

  pembayaran
    .destroy({ where: param })
    .then((result) => {
      let data = {
        konfirmasi: 0,
      };
      tagihan
        .update(data, { where: id_tagihan })
        .then((result) => {
          res.json({ message: 'data has been deleted' });
        })
        .catch((error) => {
          res.json({ message: error.message });
        });
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

app.put('/konfirmasi/:id_pembayaran', auth, async (req, res) => {
  let param = { id_pembayaran: req.params.id_pembayaran };
  let data = {
    id_petugas: req.body.id_petugas,
    konfirmasi: 1,
  };
  pembayaran
    .update(data, { where: param })
    .then((result) => {
      res.json({ message: 'Confirm Success' });
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});
module.exports = app;
