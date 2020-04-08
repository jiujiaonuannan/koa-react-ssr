"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Index extends _react.default.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return _react.default.createElement("div", {
      className: "layout-box"
    }, "\u6211\u662F layout\uFF0C\u4F60\u4E00\u76F4\u4F1A\u770B\u5230\u6211,", _react.default.createElement(_reactRouterDom.Link, {
      to: "/detail"
    }, "\u8DF3\u8F6C\u5230\u8BE6\u60C5\u9875\u9762"), this.props.children || null);
  }

}

exports.default = Index;