"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _routeBaseBundle = _interopRequireDefault(require("../../../routes/route-base-bundle"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//页面的路由配置，可配置动态加载信息，必须返回Bundle 组件
// const LazyPageCom = (props) => (
//     <BaseBundle load={() => import(/*webpackChunkName:"chunk-404"*/'../index')}>
//         {(CompIndex) => <CompIndex {...props} />}
//     </BaseBundle>
// );
var _default = [{
  component: _index.default
}];
exports.default = _default;