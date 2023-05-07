"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _constants = require("../../constants");
var BUS_ADDED = 'bus';
var BUS_UPDATED = 'bus_updated';
var userResolvers = {
  Subscription: {
    bus: {
      subscribe: function subscribe() {
        return _constants.pubsub.asyncIterator([BUS_ADDED]);
      }
    },
    getBus: {
      subscribe: function () {
        var _subscribe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _constants.pubsub.asyncIterator([BUS_UPDATED]));
              case 1:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        function subscribe() {
          return _subscribe.apply(this, arguments);
        }
        return subscribe;
      }()
    }
  },
  Query: {
    allBus: function () {
      var _allBus = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(root, args, _ref) {
        var Bus;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              Bus = _ref.models.Bus;
              return _context2.abrupt("return", Bus.findAll());
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function allBus(_x, _x2, _x3) {
        return _allBus.apply(this, arguments);
      }
      return allBus;
    }(),
    bus: function () {
      var _bus = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(root, _ref2, _ref3) {
        var bus_id, Bus;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              bus_id = _ref2.bus_id;
              Bus = _ref3.models.Bus;
              _context3.next = 4;
              return Bus.findOne({
                where: {
                  bus_id: bus_id
                }
              });
            case 4:
              return _context3.abrupt("return", _context3.sent);
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function bus(_x4, _x5, _x6) {
        return _bus.apply(this, arguments);
      }
      return bus;
    }()
  },
  Mutation: {
    createBus: function () {
      var _createBus = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(root, _ref4, _ref5) {
        var newBus, Bus, x;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              newBus = _ref4.newBus;
              Bus = _ref5.models.Bus;
              _context4.prev = 2;
              _context4.next = 5;
              return Bus.findOne({
                where: {
                  bus_id: newBus.bus_id
                }
              });
            case 5:
              x = _context4.sent;
              if (!x) {
                _context4.next = 8;
                break;
              }
              throw new Error('Bus ID already added');
            case 8:
              _constants.pubsub.publish(BUS_ADDED, {
                bus: newBus
              });
              return _context4.abrupt("return", Bus.create(newBus));
            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](2);
              return _context4.abrupt("return", _context4.t0);
            case 15:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[2, 12]]);
      }));
      function createBus(_x7, _x8, _x9) {
        return _createBus.apply(this, arguments);
      }
      return createBus;
    }(),
    updateBus: function () {
      var _updateBus = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(root, _ref6, _ref7) {
        var bus_id, passenger_count, Bus, x, pc, res, bus;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              bus_id = _ref6.bus_id, passenger_count = _ref6.passenger_count;
              Bus = _ref7.models.Bus;
              _context5.prev = 2;
              _context5.next = 5;
              return Bus.findOne({
                where: {
                  bus_id: bus_id
                }
              });
            case 5:
              x = _context5.sent;
              pc = +x.passenger_count;
              res = passenger_count == 1 ? ++pc : --pc;
              _context5.next = 10;
              return Bus.update({
                passenger_count: res <= 0 ? 0 : res
              }, {
                returning: true,
                where: {
                  bus_id: bus_id
                }
              }).then(function (_ref8) {
                var _ref9 = (0, _slicedToArray2["default"])(_ref8, 2),
                  rowsUpdate = _ref9[0],
                  _ref9$ = (0, _slicedToArray2["default"])(_ref9[1], 1),
                  updated = _ref9$[0];
                return rowsUpdate ? updated.dataValues : {};
              });
            case 10:
              bus = _context5.sent;
              _constants.pubsub.publish(BUS_UPDATED, {
                getBus: bus
              });
              return _context5.abrupt("return", bus);
            case 15:
              _context5.prev = 15;
              _context5.t0 = _context5["catch"](2);
              return _context5.abrupt("return", _context5.t0);
            case 18:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[2, 15]]);
      }));
      function updateBus(_x10, _x11, _x12) {
        return _updateBus.apply(this, arguments);
      }
      return updateBus;
    }(),
    deleteBus: function () {
      var _deleteBus = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(root, _ref10, _ref11) {
        var bus_id, Bus, result;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              bus_id = _ref10.bus_id;
              Bus = _ref11.models.Bus;
              _context6.next = 4;
              return Bus.destroy({
                where: {
                  bus_id: bus_id
                }
              });
            case 4:
              result = _context6.sent;
              return _context6.abrupt("return", {
                response: result === 0 ? 'No record found' : "".concat(bus_id, " successfully deleted")
              });
            case 6:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function deleteBus(_x13, _x14, _x15) {
        return _deleteBus.apply(this, arguments);
      }
      return deleteBus;
    }()
  }
};
var _default = userResolvers;
exports["default"] = _default;