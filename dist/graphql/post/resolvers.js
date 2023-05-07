"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = require("sequelize");
var _constants = require("../../constants");
var _models = require("../../models");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; } // eslint-disable-next-line
var POST_ADDED = 'POST_ADDED';
var postResolvers = {
  Subscription: {
    posts: {
      subscribe: function subscribe() {
        return _constants.pubsub.asyncIterator([POST_ADDED]);
      }
    }
  },
  Post: {
    user: function () {
      var _user2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var _user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _user = _ref.user;
              return _context.abrupt("return", _models.User.findOne({
                _id: _user
              }));
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function user(_x) {
        return _user2.apply(this, arguments);
      }
      return user;
    }()
  },
  Query: {
    posts: function () {
      var _posts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(root, _ref2, _ref3) {
        var cursor, _ref2$limit, limit, Post, cursorOptions, edges, endCursor;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              cursor = _ref2.cursor, _ref2$limit = _ref2.limit, limit = _ref2$limit === void 0 ? 25 : _ref2$limit;
              Post = _ref3.models.Post;
              cursorOptions = cursor ? {
                where: {
                  id: (0, _defineProperty2["default"])({}, _sequelize.Sequelize.Op.lt, cursor)
                }
              } : {};
              _context2.next = 5;
              return Post.findAll(_objectSpread({
                order: [['id', 'DESC']],
                limit: limit
              }, cursorOptions));
            case 5:
              edges = _context2.sent;
              try {
                endCursor = edges[edges.length - 1].id;
              } catch (error) {
                endCursor = 0;
              }
              return _context2.abrupt("return", {
                edges: edges,
                endCursor: endCursor
              });
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function posts(_x2, _x3, _x4) {
        return _posts.apply(this, arguments);
      }
      return posts;
    }(),
    getPost: function () {
      var _getPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(root, _ref4, _ref5) {
        var id, Post;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              id = _ref4.id;
              Post = _ref5.models.Post;
              return _context3.abrupt("return", Post.findByPk(id));
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function getPost(_x5, _x6, _x7) {
        return _getPost.apply(this, arguments);
      }
      return getPost;
    }()
  },
  Mutation: {
    addPost: function () {
      var _addPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(root, _ref6, _ref7) {
        var title, body, file, Post, authScope, post;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              title = _ref6.title, body = _ref6.body, file = _ref6.file;
              Post = _ref7.models.Post, authScope = _ref7.authScope;
              if (!(authScope.user === null)) {
                _context4.next = 4;
                break;
              }
              throw new Error('You must be logged in!');
            case 4:
              _context4.prev = 4;
              _context4.next = 7;
              return Post.create({
                title: title,
                body: body,
                file: file,
                UserId: authScope.user.id
              });
            case 7:
              post = _context4.sent;
              _constants.pubsub.publish(POST_ADDED, {
                posts: {
                  edges: [{
                    title: title,
                    body: body,
                    file: file
                  }],
                  endCursor: '80'
                }
              });
              return _context4.abrupt("return", post);
            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](4);
              throw new Error(_context4.t0);
            case 15:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[4, 12]]);
      }));
      function addPost(_x8, _x9, _x10) {
        return _addPost.apply(this, arguments);
      }
      return addPost;
    }(),
    updatePost: function () {
      var _updatePost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(root, _ref8, _ref9) {
        var id, title, body, Post;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              id = _ref8.id, title = _ref8.title, body = _ref8.body;
              Post = _ref9.models.Post;
              return _context5.abrupt("return", Post.update({
                title: title,
                body: body
              }, {
                returning: true,
                where: {
                  id: id
                }
              }).then(function (_ref10) {
                var _ref11 = (0, _slicedToArray2["default"])(_ref10, 2),
                  rowsUpdate = _ref11[0],
                  _ref11$ = (0, _slicedToArray2["default"])(_ref11[1], 1),
                  updated = _ref11$[0];
                return rowsUpdate ? updated.dataValues : {};
              }));
            case 3:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function updatePost(_x11, _x12, _x13) {
        return _updatePost.apply(this, arguments);
      }
      return updatePost;
    }(),
    deletePost: function () {
      var _deletePost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(root, _ref12, _ref13) {
        var id, Post;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              id = _ref12.id;
              Post = _ref13.models.Post;
              return _context6.abrupt("return", Post.destroy({
                where: {
                  id: id
                }
              }));
            case 3:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function deletePost(_x14, _x15, _x16) {
        return _deletePost.apply(this, arguments);
      }
      return deletePost;
    }()
  }
};
var _default = postResolvers;
exports["default"] = _default;