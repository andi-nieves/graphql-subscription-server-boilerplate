'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coordinates extends Model {
    static associate(models) {
      // define association here
    }
  }
  Coordinates.init({
    bus_id: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Coordinates',
  });
  return Coordinates;
};