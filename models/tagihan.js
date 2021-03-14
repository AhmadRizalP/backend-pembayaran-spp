'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tagihan extends Model {
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
      this.belongsTo(models.siswa, {
        foreignKey: 'id_spp',
        as: 'spp',
      });
    }
  }
  tagihan.init(
    {
      id_tagihan: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_petugas: DataTypes.INTEGER,
      nisn: DataTypes.CHAR,
      bulan: DataTypes.STRING,
      tahun: DataTypes.STRING,
      id_spp: DataTypes.INTEGER,
      konfirmasi: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'tagihan',
      tableName: 'tagihan',
    }
  );
  return tagihan;
};
