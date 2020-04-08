"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Index extends _react.default.Component {
  constructor(props) {
    super(props);

    this.handleLogin = e => {
      console.log('1');
      this.props.handleLogin();
    };
  }

  render() {
    return _react.default.createElement("div", {
      className: "login-layout"
    }, _react.default.createElement("button", {
      type: "button",
      onClick: this.handleLogin
    }, "\u767B \u5F55"));
  }

}

exports.default = Index;