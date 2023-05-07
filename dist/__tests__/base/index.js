"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createUser = exports.context = exports.client = void 0;
Object.defineProperty(exports, "faker", {
  enumerable: true,
  get: function get() {
    return _faker["default"];
  }
});
exports.user = exports.server = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _apolloServerCore = require("apollo-server-core");
var _apolloServerTesting = require("apollo-server-testing");
var _faker = _interopRequireDefault(require("faker"));
var _combinedTypes = _interopRequireDefault(require("../../graphql/combinedTypes"));
var _combinedResolvers = _interopRequireDefault(require("../../graphql/combinedResolvers"));
var _models = _interopRequireWildcard(require("../../models"));
var _utils = require("../../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_faker["default"].seed(5711);
var server = new _apolloServerCore.ApolloServerBase({
  typeDefs: _combinedTypes["default"],
  context: function context() {
    return {
      user: {
        active: null,
        email: 'admin@example.com',
        id: '1',
        name: 'paul'
      }
    };
  },
  resolvers: _combinedResolvers["default"]
});
exports.server = server;
var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _models.User.create({
            name: "".concat(_faker["default"].name.firstName(), "-").concat(_faker["default"].random.uuid()),
            email: "email-".concat(_faker["default"].random.uuid(), "@example.com"),
            password: (0, _utils.encryptPassword)('123456')
          });
        case 2:
          user = _context.sent;
          return _context.abrupt("return", user);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createUser() {
    return _ref.apply(this, arguments);
  };
}();
exports.createUser = createUser;
var client = (0, _apolloServerTesting.createTestClient)(server);
exports.client = client;
var user = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", createUser());
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function user() {
    return _ref2.apply(this, arguments);
  };
}();
exports.user = user;
var context = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.t0 = _models["default"];
          _context3.next = 3;
          return createUser();
        case 3:
          _context3.t1 = _context3.sent;
          _context3.t2 = {
            user: _context3.t1
          };
          return _context3.abrupt("return", {
            models: _context3.t0,
            authScope: _context3.t2
          });
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function context() {
    return _ref3.apply(this, arguments);
  };
}();
exports.context = context;
var _default = {
  server: server,
  client: client,
  createUser: createUser,
  faker: _faker["default"]
};
exports["default"] = _default;