"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _http = _interopRequireDefault(require("http"));
var _apolloServerExpress = require("apollo-server-express");
var _combinedTypes = _interopRequireDefault(require("./graphql/combinedTypes"));
var _combinedResolvers = _interopRequireDefault(require("./graphql/combinedResolvers"));
var _models = _interopRequireDefault(require("./models"));
var _directives = _interopRequireWildcard(require("./graphql/directives"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var path = require('path');
var port = 4000;
var server = new _apolloServerExpress.ApolloServer({
  typeDefs: _combinedTypes["default"],
  resolvers: _combinedResolvers["default"],
  schemaDirectives: {
    capitalize: _directives["default"],
    date: _directives.FormattableDateDirective
  },
  formatError: function formatError(error) {
    // remove the internal sequelize error message
    // leave only the important validation error
    var message = error.message.replace('SequelizeValidationError: ', '').replace('Validation error: ', '');
    return {
      // ...error, // uncomment this if you want to receive internal errors
      message: message
    };
  },
  context: function () {
    var _context = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
      var req, connection;
      return _regenerator["default"].wrap(function _callee$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            req = _ref.req, connection = _ref.connection;
            if (!connection) {
              _context2.next = 3;
              break;
            }
            return _context2.abrupt("return", connection.context);
          case 3:
            return _context2.abrupt("return", {
              // authScope: await getUser(req.headers.authorization),
              models: _models["default"]
            });
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee);
    }));
    function context(_x) {
      return _context.apply(this, arguments);
    }
    return context;
  }(),
  subscriptions: {
    onConnect: function onConnect() {
      return console.log('Connected to websocket....../n');
    }
  },
  tracing: false
});
var app = (0, _express["default"])();
app.use(_express["default"]["static"](path.join(__dirname, '../images')));
app.use('/images', _express["default"]["static"](path.join(__dirname, '../images')));
// app.use('/images', express.static(__dirname + "/images"));

app.use(_express["default"].json({
  limit: '25mb'
}));
app.use(_express["default"].urlencoded({
  limit: '25mb',
  extended: true
}));
server.applyMiddleware({
  app: app
});
var httpServer = _http["default"].createServer(app);
server.installSubscriptionHandlers(httpServer);
_models["default"].sequelize.authenticate();
_models["default"].sequelize.sync();
// models.sequelize.sync({ force: true });

httpServer.listen(port, function () {
  console.log("\uD83D\uDE80 Server ready at http://localhost:".concat(port).concat(server.graphqlPath));
  console.log("\uD83D\uDE80 Subscriptions ready at ws://localhost:".concat(port).concat(server.subscriptionsPath));
});