"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _apolloServerExpress = require("apollo-server-express");
var _templateObject;
module.exports = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  extend type Subscription {\n    coordinates(bus_id: String!): Coordinates!\n  } \n  type Coordinates {\n    id: ID!\n    bus_id: String!\n    latitude: String!\n    longitude: String!\n    createdAt: String!\n  }\n\n  input coordinateInput {\n    bus_id: String!\n    latitude: String!\n    longitude: String!\n  }\n\n  extend type Query {\n    coordinates(bus_id: String!): [Coordinates]!\n  }\n  type DeleteCoordinates{\n    response:String!\n  }\n  extend type Mutation {\n    addCoordinates(coordinates: coordinateInput): Coordinates!\n    deleteCoordinates(bus_id: String!): DeleteCoordinates!\n  }\n"])));