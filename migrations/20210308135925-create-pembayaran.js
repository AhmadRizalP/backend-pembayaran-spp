'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pembayaran', {
      id_pembayaran: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_petugas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'petugas',
          key: 'id_petugas',
        },
      },
      id_tagihan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tagihan',
          key: 'id_tagihan',
        },
      },
      nisn: {
        type: Sequelize.STRING,
      },
      tgl_bayar: {
        type: Sequelize.DATE,
      },
      bulan_bayar: {
        type: Sequelize.STRING,
      },
      tahun_bayar: {
        type: Sequelize.STRING,
      },
      id_spp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'siswa',
          key: 'id_spp',
        },
      },
      jumlah_bayar: {
        type: Sequelize.DOUBLE,
      },
      konfirmasi: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pembayaran');
  },
};
