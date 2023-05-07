"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.dateScalarType = void 0;
var _graphql = require("graphql");
var _moment = _interopRequireDefault(require("moment"));
var dateScalarType = {
  Date: new _graphql.GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue: function parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize: function serialize(value) {
      return (0, _moment["default"])(value).format('MMMM Do YYYY'); // value sent to the client
    },
    parseLiteral: function parseLiteral(ast) {
      if (ast.kind === _graphql.Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }

      return null;
    }
  })
};
exports.dateScalarType = dateScalarType;
var _default = dateScalarType;
exports["default"] = _default;