"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _index = _interopRequireDefault(require("../router/index"));

var _reactRouterDom = require("react-router-dom");

var _provider = _interopRequireDefault(require("./provider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//client/app/index.js
//浏览器端页面结构渲染入口
function clientRender() {
  let data = JSON.parse(document.getElementById('ssrTextInitData').value); //渲染index 组件1

  _reactDom.default.hydrate(_react.default.createElement(_reactRouterDom.BrowserRouter, null, _react.default.createElement(_provider.default, {
    initialData: data
  }, _react.default.createElement(_index.default, null))), document.getElementById('root'));
} //渲染入口


clientRender(); //开发环境才会开启

if (module.hot) {
  module.hot.accept();
}
