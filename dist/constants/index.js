"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pubsub = exports["default"] = void 0;
var _apolloServerExpress = require("apollo-server-express");
var pubsub = new _apolloServerExpress.PubSub();
exports.pubsub = pubsub;
var _default = pubsub;
exports["default"] = _default;