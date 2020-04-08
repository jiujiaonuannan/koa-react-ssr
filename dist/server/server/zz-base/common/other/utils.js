"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  /**
   * 判断是否是按需加载的组件
   * @param {函数或组件} component 
   */
  checkIsAsyncRoute: component => {
    var str = component.toString();
    return str.indexOf('require(') > -1 && str.indexOf('.resolve().') > -1;
  }
};
exports.default = _default;