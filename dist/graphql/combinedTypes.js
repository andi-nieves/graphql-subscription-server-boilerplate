"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _apolloServerExpress = require("apollo-server-express");
var _types = _interopRequireDefault(require("./bus/types"));
var _types2 = _interopRequireDefault(require("./coordinates/types"));
var _templateObject; // @flow
var queryTypes = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  scalar Date\n\n  directive @capitalize on FIELD_DEFINITION\n  directive @date(\n    defaultFormat: String = \"MMMM Do YYYY\"\n  ) on FIELD_DEFINITION\n\n  type Query {\n    _: Boolean\n  }\n\n  type Mutation {\n    _: Boolean\n  }\n"])));
var combinedTypes = [_types["default"], queryTypes, _types2["default"]];
var _default = combinedTypes;
exports["default"] = _default;