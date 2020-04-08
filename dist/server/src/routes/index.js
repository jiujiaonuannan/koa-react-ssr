"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _routesConfig = _interopRequireDefault(require("./routes-config"));

var _layout = _interopRequireDefault(require("../app/layout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 基于react-routerd的路由
 */
function App() {
  const routes = (0, _routesConfig.default)();
  return _react.default.createElement(_layout.default, null, _react.default.createElement(_reactRouter.Switch, null, routes.map((item, index) => {
    return _react.default.createElement(_reactRouter.Route, {
      path: item.path,
      key: index,
      exact: item.exact,
      render: props => {
        props.zzOpt = {
          qeury: searchToQuery(props.location.search),
          params: props.match.params
        };
        return _react.default.createElement(item.component, props);
      }
    });
  })));
}
/**
 *把 url 的 search 转换为 obj 形式
 *
 * @param {*} str
 * @returns
 */


function searchToQuery(str) {
  if (!str) return {};
  str = str.replace(/^\?/, '');
  let obj = {};
  let arr = str.split('&');
  arr && arr.forEach(item => {
    let v = item.split('=');

    if (v && v.length >= 1) {
      obj[v[0]] = v[1];
    }
  });
  return obj;
} //这种方式显示也可以，现在不用
// function AppRouter() {
//     return (<BrowserRouter>
//         <Layout>
//             <Switch>
//                 {renderRoutes(routes())}
//             </Switch>
//         </Layout>
//     </BrowserRouter>
//     );
// }


var _default = App;
exports.default = _default;