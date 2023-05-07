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
        var coordinates, Coordinates, latitude, longitude, bus_id, count, details, _details;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              coordinates = _ref3.coordinates;
              Coordinates = _ref4.models.Coordinates;
              _context3.prev = 2;
              latitude = coordinates.latitude, longitude = coordinates.longitude, bus_id = coordinates.bus_id;
              _context3.next = 6;
              return Coordinates.findAll({
                where: {
                  bus_id: bus_id
                }
              });
            case 6:
              count = _context3.sent;
              if (!(count.length === 0)) {
                _context3.next = 13;
                break;
              }
              details = Coordinates.create(coordinates);
              _constants.pubsub.publish(SUBSCRIPTION_KEY, {
                coordinates: details
              });
              return _context3.abrupt("return", details);
            case 13:
              _context3.next = 15;
              return Coordinates.update({
                latitude: latitude,
                longitude: longitude
              }, {
                returning: true,
                where: {
                  bus_id: bus_id
                }
              }).then(function (_ref5) {
                var _ref6 = (0, _slicedToArray2["default"])(_ref5, 2),
                  rowsUpdate = _ref6[0],
                  _ref6$ = (0, _slicedToArray2["default"])(_ref6[1], 1),
                  updated = _ref6$[0];
                return rowsUpdate ? updated.dataValues : {};
              });
            case 15:
              _details = _context3.sent;
              return _context3.abrupt("return", _details);
            case 17:
              _context3.next = 22;
              break;
            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](2);
              console.log('err', _context3.t0);
            case 22:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[2, 19]]);
      }));
      function addCoordinates(_x4, _x5, _x6) {
        return _addCoordinates.apply(this, arguments);
      }
      return addCoordinates;
    }(),
    deleteCoordinates: function () {
      var _deleteCoordinates = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(root, _ref7, _ref8) {
        var bus_id, Coordinates, result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              bus_id = _ref7.bus_id;
              Coordinates = _ref8.models.Coordinates;
              _context4.next = 4;
              return Coordinates.destroy({
                where: {
                  bus_id: bus_id
                }
              });
            case 4:
              result = _context4.sent;
              return _context4.abrupt("return", {
                response: result === 0 ? 'No record found' : "".concat(bus_id, " successfully deleted")
              });
            case 6:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function deleteCoordinates(_x7, _x8, _x9) {
        return _deleteCoordinates.apply(this, arguments);
      }
      return deleteCoordinates;
    }()
  }
};
var _default = resolvers;
exports["default"] = _default;