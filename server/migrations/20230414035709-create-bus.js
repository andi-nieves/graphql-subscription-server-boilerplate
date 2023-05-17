'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Buses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bus_id: {
        type: Sequelize.STRING,
      },
      passenger_count: {
        type: Sequelize.STRING
      },
      bus_name: {
        type: Sequelize.STRING
      },
      departure: {
        type: Sequelize.STRING
      },
      arrival: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables()
  }
};