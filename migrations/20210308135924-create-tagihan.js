'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tagihan', {
      id_tagihan: {
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
      nisn: {
        type: Sequelize.CHAR,
      },
      bulan: {
        type: Sequelize.STRING,
      },
      tahun: {
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
    await queryInterface.dropTable('tagihan');
  },
};
