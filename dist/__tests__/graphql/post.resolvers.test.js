"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = _interopRequireDefault(require("../../models"));
var _base = require("../base");
var _resolvers = _interopRequireDefault(require("../../graphql/post/resolvers"));
var _utils = require("../../utils");
var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _models["default"].User.create({
            name: "".concat(_base.faker.name.firstName(), "-").concat(_base.faker.random.uuid()),
            email: "email-".concat(_base.faker.random.uuid(), "@example.com"),
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
var context = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.t0 = _models["default"];
          _context2.next = 3;
          return createUser();
        case 3:
          _context2.t1 = _context2.sent;
          _context2.t2 = {
            user: _context2.t1
          };
          return _context2.abrupt("return", {
            models: _context2.t0,
            authScope: _context2.t2
          });
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function context() {
    return _ref2.apply(this, arguments);
  };
}();
describe('postResolvers', function () {
  var post;
  var _;
  // eslint-disable-next-line
  var __;
  var ctx;
  beforeEach( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _models["default"].Post.destroy({
            truncate: {}
          });
        case 2:
          _context3.next = 4;
          return context();
        case 4:
          ctx = _context3.sent;
          _context3.next = 7;
          return _models["default"].Post.create({
            title: 'title',
            body: 'body',
            UserId: ctx.authScope.user.id
          });
        case 7:
          post = _context3.sent;
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  it('should list posts', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _resolvers["default"].Query.posts(_, __, ctx);
        case 2:
          result = _context4.sent;
          expect(result[0].title).toEqual(post.title);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  it('should retrieve a post', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _resolvers["default"].Query.getPost(_, {
            id: post.id
          }, ctx);
        case 2:
          result = _context5.sent;
          expect(result.title).toEqual(post.title);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  it('should update a post', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _resolvers["default"].Mutation.updatePost(_, {
            id: post.id,
            title: 'new title'
          }, ctx);
        case 2:
          result = _context6.sent;
          expect(result.title).toEqual('new title');
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
  it('should delete a post', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _resolvers["default"].Mutation.deletePost(_, {
            id: post.id
          }, ctx);
        case 2:
          result = _context7.sent;
          expect(result).toEqual(1);
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  })));
  it('should create a post', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _resolvers["default"].Mutation.addPost(_, {
            body: 'body',
            title: 'new title'
          }, ctx);
        case 2:
          result = _context8.sent;
          expect(result.title).toEqual('new title');
        case 4:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  })));
  it('should not create a post if user is not authenticated', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _resolvers["default"].Mutation.addPost(_, {
            body: 'body',
            title: 'new title'
          }, {
            models: _models["default"],
            authScope: {
              user: null
            }
          });
        case 3:
          _context9.next = 8;
          break;
        case 5:
          _context9.prev = 5;
          _context9.t0 = _context9["catch"](0);
          expect(_context9.t0.message).toBe('You must be logged in!');
        case 8:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 5]]);
  })));
});