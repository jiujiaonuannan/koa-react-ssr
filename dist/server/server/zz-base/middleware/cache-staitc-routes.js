"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _staticRoutes = require("../common/ssr/static-routes");

/**
 * 缓存静态路由
 */
var _default = async (ctx, next) => {
  if (ctx.path.indexOf('.') === -1) await (0, _staticRoutes.addCacheStaticRoutes)();
  await next();
};

exports.default = _default;