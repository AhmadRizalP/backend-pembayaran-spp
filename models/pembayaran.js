'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.petugas, {
        foreignKey: 'id_petugas',
        as: 'petugas',
      });
      this.belongsTo(models.siswa, {
        foreignKey: 'nisn',
        as: 'siswa',
      });
      this.belongsTo(models.tagihan, {
        foreignKey: 'id_tagihan',
        as: 'tagihan',
      });
      this.belongsTo(models.siswa, {
        foreignKey: 'id_spp',
        as: 'spp',
      });
    }
  }

  pembayaran.init(
    {
      id_pembayaran: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_petugas: DataTypes.INTEGER,
      id_tagihan: DataTypes.INTEGER,
      nisn: DataTypes.STRING,
      tgl_bayar: DataTypes.DATE,
      bulan_bayar: DataTypes.STRING,
      tahun_bayar: DataTypes.STRING,
      id_spp: DataTypes.INTEGER,
      jumlah_bayar: DataTypes.DOUBLE,
      konfirmasi: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'pembayaran',
      tableName: 'pembayaran',
    }
  );
  return pembayaran;
};
