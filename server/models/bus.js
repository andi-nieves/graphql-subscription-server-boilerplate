'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bus.init({
    bus_id: DataTypes.STRING,
    passenger_count: DataTypes.STRING,
    coordinates: DataTypes.STRING,
    bus_name: DataTypes.STRING,
    departure: DataTypes.STRING,
    arrival: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Bus',
  });
  return Bus;
};