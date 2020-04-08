"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRouterConfig = require("react-router-config");

/**
 * 根据 url 查找组件
 */

/**
 * 目前只会返回查找到的第一个组件，其他组件不会返回。
 * return {
 * component,match
 *  }
 */
var _default = async (url, staticRoutes) => {
  const routes = (0, _reactRouterConfig.matchRoutes)(staticRoutes, url);
  let len = routes.length,
      i = 0,
      matchC = {};

  for (; i < len; i++) {
    let {
      route,
      match
    } = routes[i];
    const component = route.component;
    console.log('component.asyncLoad', component.asyncLoad); //TODO:这么写为了不增加多余配置，但是生产环境可能不一样

    if (component.toString().indexOf('load') > -1) {
      //异步组件的查找
      matchC.component = (await component({
        match
      }).props.load()).default;
      matchC.match = match; //这种写法也可以 
      // component(match).props.load().then((C => {
      //     console.log(C.default.fetchData());
      // }));
    } else {
      matchC.component = component;
      matchC.match = match;
    }
  }

  return matchC;
};

exports.default = _default;