"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _constants = require("../../constants");
var SUBSCRIPTION_KEY = 'COORDINATES_ADDED';
var resolvers = {
  Subscription: {
    coordinates: {
      subscribe: function () {
        var _subscribe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _constants.pubsub.asyncIterator([SUBSCRIPTION_KEY]));
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
    // coordinates: async (root, args, { models: { Coordinates } }) => Coordinates.findAll(),
    coordinates: function () {
      var _coordinates = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(root, _ref, _ref2) {
        var bus_id, Coordinates;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              bus_id = _ref.bus_id;
              Coordinates = _ref2.models.Coordinates;
              _context2.next = 4;
              return Coordinates.findAll({
                where: {
                  bus_id: bus_id
                },
                order: [['createdAt', 'DESC']]
              });
            case 4:
              return _context2.abrupt("return", _context2.sent);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function coordinates(_x, _x2, _x3) {
        return _coordinates.apply(this, arguments);
      }
      return coordinates;
    }()
  },
  Mutation: {
    addCoordinates: function () {
      var _addCoordinates = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(root, _ref3, _ref4) {
        var coordinates, _ref4$models, Coordinates, Bus, details;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              coordinates = _ref3.coordinates;
              _ref4$models = _ref4.models, Coordinates = _ref4$models.Coordinates, Bus = _ref4$models.Bus;
              console.log(">>", coordinates);
              _context3.prev = 3;
              details = Coordinates.create(coordinates);
              _constants.pubsub.publish(SUBSCRIPTION_KEY, {
                coordinates: details
              });
              return _context3.abrupt("return", details);
            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](3);
              console.log('err', _context3.t0);
            case 12:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[3, 9]]);
      }));
      function addCoordinates(_x4, _x5, _x6) {
        return _addCoordinates.apply(this, arguments);
      }
      return addCoordinates;
    }()
  }
};
var _default = resolvers;
exports["default"] = _default;