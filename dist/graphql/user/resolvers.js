"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _utils = require("../../utils");
var _models = require("../../models");
// eslint-disable-next-line

var userResolvers = {
  User: {
    posts: function () {
      var _posts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var id;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              id = _ref.id;
              return _context.abrupt("return", _models.Post.findAll({
                where: {
                  UserId: id
                }
              }));
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function posts(_x) {
        return _posts.apply(this, arguments);
      }
      return posts;
    }()
  },
  Query: {
    users: function () {
      var _users = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(root, args, _ref2) {
        var User;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              User = _ref2.models.User;
              return _context2.abrupt("return", User.findAll());
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function users(_x2, _x3, _x4) {
        return _users.apply(this, arguments);
      }
      return users;
    }(),
    user: function () {
      var _user = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(root, _ref3, _ref4) {
        var id, User;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              id = _ref3.id;
              User = _ref4.models.User;
              return _context3.abrupt("return", User.findByPk(id));
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function user(_x5, _x6, _x7) {
        return _user.apply(this, arguments);
      }
      return user;
    }()
  },
  Mutation: {
    register: function () {
      var _register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(root, _ref5, _ref6) {
        var name, email, password, User, user;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              name = _ref5.name, email = _ref5.email, password = _ref5.password;
              User = _ref6.models.User;
              _context4.prev = 2;
              _context4.next = 5;
              return User.create({
                name: name,
                email: email,
                password: (0, _utils.encryptPassword)(password)
              });
            case 5:
              user = _context4.sent;
              return _context4.abrupt("return", {
                token: (0, _utils.generateToken)(user)
              });
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](2);
              throw new Error(_context4.t0.errors[0].message);
            case 12:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[2, 9]]);
      }));
      function register(_x8, _x9, _x10) {
        return _register.apply(this, arguments);
      }
      return register;
    }(),
    login: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(root, _ref7, _ref8) {
        var email, password, User, user, correctPassword;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              email = _ref7.email, password = _ref7.password;
              User = _ref8.models.User;
              _context5.next = 4;
              return User.findOne({
                where: {
                  email: email
                }
              });
            case 4:
              user = _context5.sent;
              if (user) {
                _context5.next = 7;
                break;
              }
              throw new Error('Invalid email or password');
            case 7:
              correctPassword = (0, _utils.authenticate)(password, user.password);
              if (correctPassword) {
                _context5.next = 10;
                break;
              }
              throw new Error('Invalid email or password');
            case 10:
              return _context5.abrupt("return", {
                token: (0, _utils.generateToken)(user)
              });
            case 11:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function login(_x11, _x12, _x13) {
        return _login.apply(this, arguments);
      }
      return login;
    }(),
    updateUser: function () {
      var _updateUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(root, _ref9, _ref10) {
        var id, name, User;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              id = _ref9.id, name = _ref9.name;
              User = _ref10.models.User;
              return _context6.abrupt("return", User.update({
                name: name
              }, {
                returning: true,
                where: {
                  id: id
                }
              }).then(function (_ref11) {
                var _ref12 = (0, _slicedToArray2["default"])(_ref11, 2),
                  rowsUpdate = _ref12[0],
                  _ref12$ = (0, _slicedToArray2["default"])(_ref12[1], 1),
                  updated = _ref12$[0];
                return rowsUpdate ? updated.dataValues : {};
              }));
            case 3:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function updateUser(_x14, _x15, _x16) {
        return _updateUser.apply(this, arguments);
      }
      return updateUser;
    }(),
    deleteUser: function () {
      var _deleteUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(root, _ref13, _ref14) {
        var id, User, authScope;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              id = _ref13.id;
              User = _ref14.models.User, authScope = _ref14.authScope;
              if (!(authScope.user === null || id !== authScope.user.id)) {
                _context7.next = 4;
                break;
              }
              throw new Error('You cannot delete this user account!');
            case 4:
              User.destroy({
                where: {
                  id: id
                }
              });
            case 5:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function deleteUser(_x17, _x18, _x19) {
        return _deleteUser.apply(this, arguments);
      }
      return deleteUser;
    }()
  }
};
var _default = userResolvers;
exports["default"] = _default;