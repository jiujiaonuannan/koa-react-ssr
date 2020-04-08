"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _routesMuster = _interopRequireDefault(require("./routes-muster"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 组装路由表,用于前端渲染和服务端路由查找
 * 此代码无需变动
 */
var _default = () => {
  const routes = [];

  _routesMuster.default.forEach(item => {
    item.forEach(small => {
      routes.push(small);
    });
  });

  return routes;
}; // 参考路由表格式
// const routes = [
//     {
//         component: null,
//         routes: [
//             {
//                 path: "/",
//                 exact: true,
//                 component: Home
//             },
//             {
//                 path: "/child/:id",
//                 component: Child,
//                 routes: [
//                     {
//                         path: "/child/:id/grand-child",
//                         component: GrandChild
//                     }
//                 ]
//             },
//             {
//                 path: '/detail', exact: true,
//                 component: Detail,
//             },
//             {
//                 path: '/detail/:a/:b', exact: true,
//                 component: Detail
//             }
//         ]
//     }
// ];


exports.default = _default;