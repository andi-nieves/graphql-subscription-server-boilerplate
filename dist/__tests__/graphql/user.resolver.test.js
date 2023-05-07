"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = _interopRequireDefault(require("../../models"));
var _base = require("../base");
var _resolvers = _interopRequireDefault(require("../../graphql/user/resolvers"));
var _utils = require("../../utils");
describe('userResolver', function () {
  var userDetails;
  var _;
  // eslint-disable-next-line
  var __;
  var ctx;
  beforeEach( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var _ctx, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _models["default"].Post.destroy({
            truncate: {}
          });
        case 2:
          _context.next = 4;
          return _models["default"].User.destroy({
            truncate: {}
          });
        case 4:
          _context.next = 6;
          return (0, _base.context)();
        case 6:
          ctx = _context.sent;
          _ctx = ctx, user = _ctx.authScope.user;
          userDetails = user;
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  it('should list users', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _resolvers["default"].Query.users(_, __, ctx);
        case 2:
          result = _context2.sent;
          expect(result[0]).toHaveProperty('name');
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  it('should retrieve a user', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _resolvers["default"].Query.user(_, {
            id: userDetails.id
          }, ctx);
        case 2:
          result = _context3.sent;
          expect(result.name).toEqual(userDetails.name);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  it('should update a user', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var data, _ctx2, user, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          data = {
            name: "".concat(_base.faker.name.firstName(), "-").concat(_base.faker.random.uuid()),
            email: "email".concat(_base.faker.random.uuid(), "@example.com"),
            password: _base.faker.internet.password()
          };
          _context4.next = 3;
          return _resolvers["default"].Mutation.register(_, data, ctx);
        case 3:
          _ctx2 = ctx, user = _ctx2.authScope.user;
          userDetails = user;
          _context4.next = 7;
          return _resolvers["default"].Mutation.updateUser(_, {
            id: userDetails.id,
            name: 'john'
          }, ctx);
        case 7:
          result = _context4.sent;
          expect(result.name).toEqual('john');
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  it('should delete a user', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _resolvers["default"].Mutation.deleteUser(_, {
            id: userDetails.id
          }, ctx);
        case 2:
          result = _context5.sent;
          expect(result).toEqual(undefined);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  it('should not delete another user account', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _resolvers["default"].Mutation.deleteUser(_, {
            id: userDetails.id
          }, {
            models: _models["default"],
            authScope: {
              user: null
            }
          });
        case 3:
          _context6.next = 8;
          break;
        case 5:
          _context6.prev = 5;
          _context6.t0 = _context6["catch"](0);
          expect(_context6.t0.message).toBe('You cannot delete this user account!');
        case 8:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 5]]);
  })));
  it('should create a user', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var data, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          data = {
            name: "".concat(_base.faker.name.firstName(), "-").concat(_base.faker.random.uuid()),
            email: "email".concat(_base.faker.random.uuid(), "@example.com"),
            password: _base.faker.internet.password()
          };
          _context7.next = 3;
          return _resolvers["default"].Mutation.register(_, data, ctx);
        case 3:
          result = _context7.sent;
          expect(result).toHaveProperty('token');
        case 5:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  })));
  it('should login a user', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _resolvers["default"].Mutation.login(_, {
            email: userDetails.email,
            password: '123456'
          }, ctx);
        case 2:
          result = _context8.sent;
          expect(result).toHaveProperty('token');
        case 4:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  })));
  it('should not login with invalid credentials', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _resolvers["default"].Mutation.login(_, {
            email: userDetails.email
          }, ctx);
        case 3:
          _context9.next = 8;
          break;
        case 5:
          _context9.prev = 5;
          _context9.t0 = _context9["catch"](0);
          expect(_context9.t0.message).toBe('Invalid email or password');
        case 8:
          _context9.prev = 8;
          _context9.next = 11;
          return _resolvers["default"].Mutation.login(_, {
            email: 'userDetails.emai'
          }, ctx);
        case 11:
          _context9.next = 16;
          break;
        case 13:
          _context9.prev = 13;
          _context9.t1 = _context9["catch"](8);
          expect(_context9.t1.message).toBe('Invalid email or password');
        case 16:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 5], [8, 13]]);
  })));
  it('should get logged in user from the token', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    var result, user;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return _resolvers["default"].Mutation.login(_, {
            email: userDetails.email,
            password: '123456'
          }, ctx);
        case 2:
          result = _context10.sent;
          _context10.next = 5;
          return (0, _utils.getUser)(result.token);
        case 5:
          user = _context10.sent;
          expect(user.user.email).toEqual(userDetails.email);
        case 7:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  })));
});