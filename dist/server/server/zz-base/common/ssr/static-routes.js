"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCacheStaticRoutes = getCacheStaticRoutes;
exports.addCacheStaticRoutes = addCacheStaticRoutes;
exports.getStaticRoutes = getStaticRoutes;

var _reactRouterConfig = require("react-router-config");

var _routesConfig = _interopRequireDefault(require("../../../../src/routes/routes-config"));

var _cacheHelper = _interopRequireDefault(require("../other/cache-helper"));

var _utils = _interopRequireDefault(require("../other/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 如果客户端路由是按需加载的话 
 * 则需要把动态转为静态路由，并且在服务启动初期放入缓存，不需要每次都转换
 */
const staticRoutesCacheKey = 'node-server-static-routes-cache'; //缓存静态路由

async function getCacheStaticRoutes() {
  let routes = _cacheHelper.default[staticRoutesCacheKey];
  if (routes) return routes;
  routes = await getStaticRoutes();
  _cacheHelper.default[staticRoutesCacheKey] = routes;
  return routes;
} //添加到缓存  只添加一次


async function addCacheStaticRoutes() {
  let routes = _cacheHelper.default[staticRoutesCacheKey];
  if (!routes) _cacheHelper.default[staticRoutesCacheKey] = await getStaticRoutes();
  return routes;
} //获得静态路由


async function getStaticRoutes() {
  const routes = (0, _routesConfig.default)();
  let len = routes.length,
      i = 0;
  const staticRoutes = [];

  for (; i < len; i++) {
    let item = routes[i];

    if (_utils.default.checkIsAsyncRoute(item.component)) {
      staticRoutes.push({ ...item,
        ...{
          component: (await item.component().props.load()).default
        }
      });
    } else {
      staticRoutes.push({ ...item
      });
    }
  }

  return staticRoutes; //返回静态路由
}