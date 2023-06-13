'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    static associate(models) {
    }
  }
  Bus.init({
    bus_id: DataTypes.STRING,
    passenger_count: DataTypes.STRING,
    bus_name: DataTypes.STRING,
    departure: DataTypes.STRING,
    arrival: DataTypes.STRING,
    departure_time: DataTypes.STRING,
    arrival_time: DataTypes.STRING,
    driver_name: DataTypes.STRING,
    driver_contact: DataTypes.STRING,
    conductor_name: DataTypes.STRING,
    conductor_contact: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Bus',
  });
  return Bus;
};