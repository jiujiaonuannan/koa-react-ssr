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
  }

  render() {
    return _react.default.createElement("div", {
      className: "page-nav-wrapper"
    }, _react.default.createElement("span", {
      className: "main"
    }, this.props.mainMenuName), " / ", _react.default.createElement("span", {
      className: "child"
    }, this.props.childMenuName));
  }

}

exports.default = Index;