"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 服务端数据缓存
 */
const CacheHelper = {};
CacheHelper.cache = {};

CacheHelper.keys = function () {
  return Object.keys(CacheHelper.cache);
};

CacheHelper.add = function (key, obj) {
  CacheHelper.cache[key] = obj;
};

CacheHelper.get = function (key) {
  return CacheHelper.cache[key];
};

CacheHelper.clear = function (key) {
  CacheHelper.cache[key] = null;
};

var _default = CacheHelper;
exports.default = _default;