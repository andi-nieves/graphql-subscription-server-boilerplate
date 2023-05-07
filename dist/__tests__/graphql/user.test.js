"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _apolloServerCore = require("apollo-server-core");
var _base = require("../base");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
describe('userGraphl', function () {
  it('should register a user', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var mutation, mutationRes;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          mutation = (0, _apolloServerCore.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n    mutation {\n        register(name: \"paul\", email: \"admin@example.com\", password: \"123456\"){\n          token\n        }\n    }"])));
          _context.next = 3;
          return _base.client.mutate({
            mutation: mutation
          });
        case 3:
          mutationRes = _context.sent;
          expect(mutationRes.data).toEqual({
            register: null
          });
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  it('should login a user', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var mutation, mutationRes;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          mutation = (0, _apolloServerCore.gql)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n    mutation {\n        login(email: \"admin@example.com\", password: \"123456\"){\n          token\n        }\n    }"])));
          _context2.next = 3;
          return _base.client.mutate({
            mutation: mutation
          });
        case 3:
          mutationRes = _context2.sent;
          expect(mutationRes.data).toEqual({
            login: null
          });
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  it('should delete a user', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var mutation, mutationRes;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          mutation = (0, _apolloServerCore.gql)(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n    mutation {\n        deleteUser(id: 1){\n          count\n        }\n    }"])));
          _context3.next = 3;
          return _base.client.mutate({
            mutation: mutation
          });
        case 3:
          mutationRes = _context3.sent;
          expect(mutationRes.data).toEqual({
            deleteUser: null
          });
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  it('should update a user', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var mutation, mutationRes;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          mutation = (0, _apolloServerCore.gql)(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2["default"])(["\n    mutation {\n        updateUser(id: 1, name: \"newName\"){\n          email\n          name\n          id\n        }\n    }"])));
          _context4.next = 3;
          return _base.client.mutate({
            mutation: mutation
          });
        case 3:
          mutationRes = _context4.sent;
          expect(mutationRes.data).toEqual({
            updateUser: null
          });
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  it('should list all users', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var query, clientRes;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          query = (0, _apolloServerCore.gql)(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2["default"])(["\n    {\n        users {\n          email\n          name\n          id\n          active\n        }\n    }\n    "])));
          _context5.next = 3;
          return _base.client.query({
            query: query
          });
        case 3:
          clientRes = _context5.sent;
          expect(clientRes.data).toEqual({
            users: null
          });
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  it('should retrive a user', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var query, clientRes;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          query = (0, _apolloServerCore.gql)(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2["default"])(["\n    {\n        user(id: 1) {\n          email\n          name\n          id\n          active\n        }\n    }\n    "])));
          _context6.next = 3;
          return _base.client.query({
            query: query
          });
        case 3:
          clientRes = _context6.sent;
          expect(clientRes.data).toEqual({
            user: null
          });
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
});