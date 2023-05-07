"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _resolvers = _interopRequireDefault(require("./coordinates/resolvers"));
var _resolvers2 = _interopRequireDefault(require("./bus/resolvers"));
var _scalars = require("./scalars");
var _default = [_scalars.dateScalarType, _resolvers["default"], _resolvers2["default"]];
exports["default"] = _default;