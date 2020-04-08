"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 404页面
 */
class Index extends _react.default.Component {
  constructor(props) {
    super(props);
    console.log('404page');
    console.log(props);
  }

  render() {
    return _react.default.createElement("div", null, "404 ,\u5F53\u524D\u8DEF\u7531\u6CA1\u6709\u5339\u914D\u5230\u3002");
  }

}

exports.default = Index;