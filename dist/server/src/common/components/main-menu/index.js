"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _menu = _interopRequireDefault(require("./menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 管理页面的菜单组件
 */
class Index extends _react.default.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return _react.default.createElement("div", {
      className: "mainmenu-layout"
    }, _react.default.createElement("div", {
      className: "top"
    }, "the is bgm 111"), _react.default.createElement("div", {
      className: "core-layout"
    }, _react.default.createElement("div", {
      className: "menus"
    }, _react.default.createElement(_menu.default, null)), _react.default.createElement("div", {
      className: "content"
    }, this.props.children)));
  }

}

exports.default = Index;