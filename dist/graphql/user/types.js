"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _apolloServerExpress = require("apollo-server-express");
var _templateObject;
var userType = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type User {\n    id: String\n    name: String\n    email: String\n    active: Boolean\n    posts: [Post]\n  }\n  type UserConnection {\n    count: Int\n    users: [User]\n  }\n  type UserAuth {\n    token: String\n  }\n\n  extend type Query {\n    user(id: ID!): User\n    users: [User!]\n  }\n\n  extend type Mutation {\n    register(name: String!, email: String!, password: String!): UserAuth\n    login(email: String!, password: String!): UserAuth\n    deleteUser(id: Int!): UserConnection\n    updateUser(id: Int!, name: String!): User\n  }\n"])));
var _default = userType;
exports["default"] = _default;