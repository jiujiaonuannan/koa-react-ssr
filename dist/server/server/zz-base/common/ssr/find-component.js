"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRouterDom = require("react-router-dom");

//尚未使用
var _default = (Routes, path) => {
  console.log(Routes); // 根据请求的path来匹配到对应的component

  const activeRoute = Routes.find(route => (0, _reactRouterDom.matchPath)(path, route)) || {};
  console.log('activeRoute', activeRoute);
  const activeComponent = activeRoute.Component;
  return activeComponent;
};

exports.default = _default;