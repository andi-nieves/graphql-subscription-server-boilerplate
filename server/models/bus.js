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
  }, {
    sequelize,
    modelName: 'Bus',
  });
  return Bus;
};