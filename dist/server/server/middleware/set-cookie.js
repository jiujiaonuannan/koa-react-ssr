"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 设置浏览器cookie 无引用
 * @param {[type]} req [description]
 * @param {[type]} res [description]
 */
var _default = (ctx, next) => {
  var cookie = ctx.cookies.get('clientid');

  if (!cookie) {
    //写cid	
    ctx.cookies.set('clientid', 'zz-id', {
      maxAge: 31536000000
    });
  }

  return next();
};

exports.default = _default;