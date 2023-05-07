"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = exports.generateToken = exports.encryptPassword = exports.authenticate = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _models = require("../models");
var jwtSecret = "secret";
var authenticate = function authenticate(plainTextPass, password) {
  if (!plainTextPass) return false;
  return _bcryptjs["default"].compareSync(plainTextPass, password);
};
exports.authenticate = authenticate;
var encryptPassword = function encryptPassword(password) {
  return _bcryptjs["default"].hashSync(password, 8);
};
exports.encryptPassword = encryptPassword;
var generateToken = function generateToken(user) {
  return "JWT ".concat(_jsonwebtoken["default"].sign({
    id: user.id,
    email: user.email
  }, jwtSecret));
};
exports.generateToken = generateToken;
var getUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token) {
    var decodedToken, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (token) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", {
            user: null
          });
        case 2:
          _context.prev = 2;
          decodedToken = _jsonwebtoken["default"].verify(token.substring(4), jwtSecret);
          _context.next = 6;
          return _models.User.findOne({
            where: {
              id: decodedToken.id
            }
          });
        case 6:
          user = _context.sent;
          return _context.abrupt("return", {
            user: user
          });
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", {
            user: null
          });
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 10]]);
  }));
  return function getUser(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.getUser = getUser;