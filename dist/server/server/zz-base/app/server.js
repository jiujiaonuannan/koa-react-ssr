"use strict";

require("./svr-env");

var _koaConvert = _interopRequireDefault(require("koa-convert"));

var _koaJson = _interopRequireDefault(require("koa-json"));

var _koaBody = _interopRequireDefault(require("koa-body"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _path = _interopRequireDefault(require("path"));

var _setCookie = _interopRequireDefault(require("../../middleware/set-cookie"));

var _baseRoute = _interopRequireDefault(require("../../middleware/base-route"));

var _cacheStaitcRoutes = _interopRequireDefault(require("../middleware/cache-staitc-routes"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * node 服务实例文件
 * zjp
 * 18.7.16
 */
//###暂时没有用到
// import webpackDev from '../middleware/koa-webpack-dev';
// import webpackHot from '../middleware/koa-webpack-hot';
//###
//#### 暂时没有用到
// import webpack from 'webpack';
// import webpackConfig from '../../../../webpack/webpack.config.dev.js';
// import devServerConfig from '../../../../webpack/common/webpack-devserver.config.js'
//####
const Koa = require('koa2');

const app = new Koa(); //####
// const webpackCompiler = webpack(webpackConfig);
// app.use(webpackDev(webpackCompiler, devServerConfig));
// app.use(webpackHot(webpackCompiler));//热更新
//####

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms `);
});
app.use((0, _koaBody.default)({
  multipart: true,
  // 支持文件上传
  formidable: {
    maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M

  } // encoding:'gzip',
  // formidable:{
  //   uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
  //   keepExtensions: true,    // 保持文件的后缀
  //   maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
  //   onFileBegin:(name,file) => { // 文件上传前的设置
  //     // console.log(`name: ${name}`);
  //     // console.log(file);
  //   },
  // }

}));
app.use((0, _koaConvert.default)((0, _koaJson.default)())); //TODO: 线上环境不应该开启这个静态资源访问  

if (process.env.IS_DEV || _config.default.isimulateProduction || cnofig.openProductionStaticFolder) {
  app.use((0, _koaStatic.default)(_path.default.join(__dirname, '../../../../static')));
}

app.use(_setCookie.default); //TODO:允许跨域 ，后面需要做安全处理

app.use((ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
  ctx.set('Access-Control-Allow-Credentials', 'true'); //ctx.set("Access-Control-Max-Age", 864000);
  // 设置所允许的HTTP请求方法

  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST"); // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.

  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
  return next();
});
app.use(_cacheStaitcRoutes.default);
app.use(_baseRoute.default);
module.exports = app;