"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _apolloServerExpress = require("apollo-server-express");
var _templateObject;
var postTypes = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])([" \n    type Subscription {\n        posts: PostConnection\n    } \n\n    type Post {\n        id: Int\n        title: String! @capitalize\n        body: String!\n        user: User\n        file: String\n        createdAt: Date @date(defaultFormat: \"MMMM Do YYYY\")\n    }\n\n    type PostConnection {\n        endCursor: Int\n        edges: [Post]\n    }\n\n    extend type Query {\n        posts(cursor: String, limit: Int): PostConnection\n        getPost(id: Int!): Post\n    }\n\n    extend type Mutation {\n        addPost(title: String!, body: String!, file: String): Post\n        updatePost(title: String!, body:String!, id: Int!): Post  \n        deletePost(id: Int!): PostConnection \n    }\n"])));
var _default = postTypes;
exports["default"] = _default;