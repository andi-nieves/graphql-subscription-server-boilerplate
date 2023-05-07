"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _apolloServerExpress = require("apollo-server-express");
var _templateObject;
module.exports = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type Subscription {\n    bus: Bus!\n  } \n  extend type Subscription {\n    getBus(bus_id: String!): Bus!\n  } \n  type Bus {\n    bus_id: String\n    passenger_count: Int\n    bus_name: String\n    departure: String\n    arrival: String\n    createdAt: String\n    updatedAt: String\n  }\n\n  input busInput {\n    bus_id: String!\n    passenger_count: Int\n    bus_name: String!\n    departure: String!\n    arrival: String!\n  }\n\n  extend type Query {\n    bus(bus_id: String!): Bus!\n    allBus: [Bus!]\n  }\n\n  type DeleteRes{\n    response:String!\n  }\n\n  extend type Mutation {\n    createBus(newBus: busInput): Bus!\n    deleteBus(bus_id: String!): DeleteRes!\n    updateBus(bus_id: String!, passenger_count: Int!): Bus!\n  }\n"])));