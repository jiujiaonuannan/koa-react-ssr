"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _ejs = _interopRequireDefault(require("ejs"));

var _ssr = _interopRequireDefault(require("../zz-base/common/ssr/"));

var _config = _interopRequireDefault(require("../zz-base/config"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//引入 react ssr 中间件处理
async function _default(ctx, next) {
  let query = ctx.query,
      body = {};
  console.log('path', ctx.path);
  console.log('url', ctx.url); //TODO:这里还需要完善  为了防止类似图片的请求进入到 ssr 处理

  if (ctx.path.indexOf('.') === -1) {
    await (0, _ssr.default)(ctx);
  } else {
    //如果没有开启 ssr 则输出 csr 页面  此逻辑
    // const readStream = fs.createReadStream(path.resolve(__dirname,'../zz-base/temp/csr.html'));
    // readStream.pipe(ctx.res);
    return null;
  }

  await next();
}