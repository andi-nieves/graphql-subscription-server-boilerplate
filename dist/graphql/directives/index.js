"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FormattableDateDirective = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _moment = _interopRequireDefault(require("moment"));
var _apolloServer = require("apollo-server");
var _graphql = require("graphql");
var _excluded = ["format"];
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } } /* eslint class-methods-use-this: ["error", { "exceptMethods": ["visitFieldDefinition"] }] */
var capitalizeFirstLetter = function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Create (or import) a custom schema directive
var CapitalizeDirective = /*#__PURE__*/function (_SchemaDirectiveVisit) {
  (0, _inherits2["default"])(CapitalizeDirective, _SchemaDirectiveVisit);
  var _super = _createSuper(CapitalizeDirective);
  function CapitalizeDirective() {
    (0, _classCallCheck2["default"])(this, CapitalizeDirective);
    return _super.apply(this, arguments);
  }
  (0, _createClass2["default"])(CapitalizeDirective, [{
    key: "visitFieldDefinition",
    value: function visitFieldDefinition(field) {
      var _this = this;
      var _field$resolve = field.resolve,
        resolve = _field$resolve === void 0 ? _graphql.defaultFieldResolver : _field$resolve;
      var value = field;
      value.resolve = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _len,
          args,
          _key,
          result,
          _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args[_key];
              }
              _context.next = 3;
              return resolve.apply(_this, args);
            case 3:
              result = _context.sent;
              if (!(typeof result === 'string')) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", capitalizeFirstLetter(result));
            case 6:
              return _context.abrupt("return", result);
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
    }
  }]);
  return CapitalizeDirective;
}(_apolloServer.SchemaDirectiveVisitor);
exports["default"] = CapitalizeDirective;
var FormattableDateDirective = /*#__PURE__*/function (_SchemaDirectiveVisit2) {
  (0, _inherits2["default"])(FormattableDateDirective, _SchemaDirectiveVisit2);
  var _super2 = _createSuper(FormattableDateDirective);
  function FormattableDateDirective() {
    (0, _classCallCheck2["default"])(this, FormattableDateDirective);
    return _super2.apply(this, arguments);
  }
  (0, _createClass2["default"])(FormattableDateDirective, [{
    key: "visitFieldDefinition",
    value: function visitFieldDefinition(field) {
      var _this2 = this;
      var _field$resolve2 = field.resolve,
        resolve = _field$resolve2 === void 0 ? _graphql.defaultFieldResolver : _field$resolve2;
      var defaultFormat = this.args.defaultFormat;
      field.args.push({
        name: 'format',
        type: _graphql.GraphQLString
      });
      var value = field;
      value.resolve = /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(source, _ref2, context, info) {
          var format, otherArgs, date;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                format = _ref2.format, otherArgs = (0, _objectWithoutProperties2["default"])(_ref2, _excluded);
                _context2.next = 3;
                return resolve.call(_this2, source, otherArgs, context, info);
              case 3:
                date = _context2.sent;
                return _context2.abrupt("return", (0, _moment["default"])(date).format(format || defaultFormat));
              case 5:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        return function (_x, _x2, _x3, _x4) {
          return _ref3.apply(this, arguments);
        };
      }();
      value.type = _graphql.GraphQLString;
    }
  }]);
  return FormattableDateDirective;
}(_apolloServer.SchemaDirectiveVisitor);
exports.FormattableDateDirective = FormattableDateDirective;