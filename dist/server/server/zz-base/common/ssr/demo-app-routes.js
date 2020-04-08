"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 当初用作 demo 写的
 * 基于react-routerd的路由
 */
class Detail extends _react.default.Component {
  render() {
    return _react.default.createElement("div", null, "detail");
  }

}

class Index extends _react.default.Component {
  render() {
    return _react.default.createElement("div", null, "index");
  }

}

const Root = ({
  route
}) => _react.default.createElement("div", null, _react.default.createElement("h1", null, "Root"), renderRoutes(route.routes));

const Home = ({
  route
}) => _react.default.createElement("div", null, _react.default.createElement("h2", null, "Home"));

const Child = ({
  route
}) => _react.default.createElement("div", null, _react.default.createElement("h2", null, "Child"), renderRoutes(route.routes, {
  someProp: "these extra props are optional"
}));

const GrandChild = ({
  someProp
}) => _react.default.createElement("div", null, _react.default.createElement("h3", null, "Grand Child"), _react.default.createElement("div", null, someProp));

const routes = [{
  path: "/",
  exact: true,
  component: Home
}, {
  path: '/detail',
  exact: true,
  component: Detail
}, {
  path: '/detail/:a/:b',
  exact: true,
  component: Detail
}];
var _default = routes;
exports.default = _default;