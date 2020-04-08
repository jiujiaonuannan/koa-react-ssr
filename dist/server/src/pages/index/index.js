"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _utils = _interopRequireDefault(require("../../common/module/utils"));

var _zzPageBase = _interopRequireDefault(require("../../zz-base/common/components/zz-page-base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Index extends _zzPageBase.default {
  constructor(props, context) {
    super(props, context);
  } //关闭这个页面的服务端渲染 默认为 false


  static async getInitialProps() {
    return {
      page: {
        tdk: {
          title: 'zz.js',
          keyword: '关键字',
          description: '描述'
        }
      }
    };
  }

  componentDidMount() {
    console.log('process.env.IS_DEV', process.env.IS_DEV);
    const mmmSet = new Set();
  }

  render() {
    return _react.default.createElement("div", null, _react.default.createElement(_reactRouterDom.Link, {
      to: "/detail"
    }, "\u9996\u9875-\u70B9\u8DF3\u8F6C\u5230\u8BE6\u60C5\u9875\u9762 123"));
  }

}

exports.default = Index;
Index.closeThePageSSR = false;