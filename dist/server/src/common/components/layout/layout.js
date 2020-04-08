"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _mainMenu = _interopRequireDefault(require("../main-menu"));

var _login = _interopRequireDefault(require("../login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Layout extends _react.default.Component {
  constructor(props) {
    super(props);

    this.handleLogin = e => {
      this.setState({
        isLogin: true
      });
    };

    this.state = {
      isLogin: true
    };
  }

  render() {
    return this.state.isLogin ? _react.default.createElement(_mainMenu.default, null, this.props.children) : _react.default.createElement(_login.default, {
      handleLogin: this.handleLogin
    });
  }

}

exports.default = Layout;