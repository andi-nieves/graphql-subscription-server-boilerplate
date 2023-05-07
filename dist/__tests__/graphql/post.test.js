"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _apolloServerCore = require("apollo-server-core");
var _base = require("../base");
var _templateObject, _templateObject2, _templateObject3;
describe('postGraphl', function () {
  it('should add a post', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var mutation, mutationRes;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          mutation = (0, _apolloServerCore.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n    mutation {\n        addPost(title: \"title\", body: \"body\"){\n          title,\n          id\n        }\n    }"])));
          _context.next = 3;
          return _base.client.mutate({
            mutation: mutation
          });
        case 3:
          mutationRes = _context.sent;
          expect(mutationRes.data).toEqual({
            addPost: null
          });
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  it('should update a post', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var mutation, mutationRes;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          mutation = (0, _apolloServerCore.gql)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n    mutation {\n        updatePost(id: 4, title: \"title\", body: \"body\"){\n          title,\n          id\n        }\n    }"])));
          _context2.next = 3;
          return _base.client.mutate({
            mutation: mutation
          });
        case 3:
          mutationRes = _context2.sent;
          expect(mutationRes.data).toEqual({
            updatePost: null
          });
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  it('should list all posts', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var query, clientRes;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          query = (0, _apolloServerCore.gql)(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n    {\n        posts {\n          title\n          body\n        }\n    }\n    "])));
          _context3.next = 3;
          return _base.client.query({
            query: query
          });
        case 3:
          clientRes = _context3.sent;
          expect(clientRes.data).toEqual({
            posts: null
          });
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
});