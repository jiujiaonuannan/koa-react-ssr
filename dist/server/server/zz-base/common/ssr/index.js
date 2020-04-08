"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _matchComponent = _interopRequireDefault(require("../../../../src/app/match-component"));

var _provider = _interopRequireDefault(require("../../../../src/app/provider"));

var _ejsHtml = _interopRequireDefault(require("../other/ejs-html"));

var _reactRouter = require("react-router");

var _reactRouterConfig = require("react-router-config");

var _zNoMatch = _interopRequireDefault(require("../../../../src/pages/z-no-match"));

var _config = _interopRequireDefault(require("../../config"));

var _cacheHelper = _interopRequireDefault(require("../other/cache-helper"));

var _layout = _interopRequireDefault(require("../../../../src/app/layout"));

var _staticRoutes = require("../ssr/static-routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * author:bigerfe.com
 * react 服务端组件渲染的入口文件
 * **/
//0匹配的时候
const getComponentHtml = async ctx => {
  const routes = await (0, _staticRoutes.getCacheStaticRoutes)();
  let path = ctx.path,
      url = ctx.url;
  const routeMatch = await (0, _matchComponent.default)(path, routes);
  const COM = routeMatch.component || _zNoMatch.default;
  const match = routeMatch.match || {}; //参数带入

  const zzOpt = {
    query: ctx.query,
    params: match.params
  }; //TODO:不知道还有没有更好的办法

  const initialData = {}; //用于前端获取数据，区分多页面

  const fallData = initialData[path] = {};

  if (COM.closeThePageSSR) {
    //此页面关闭了服务端渲染
    return {
      state: false
    };
  }

  fallData.init = true;
  fallData.res = await (COM.getInitialProps ? COM.getInitialProps(zzOpt) : {}); //处理页面 tdk

  fallData.res.page || (fallData.res.page = {
    tdk: {
      title: '默认标题',
      keyword: '默认关键词',
      description: '默认描述'
    }
  });
  const props = {
    match: {
      url: ctx.path
    }
  }; //没用到这

  const context = {}; // <StaticRouter context={context} location={ctx.url}>

  const html = (0, _server.renderToString)(_react.default.createElement(_provider.default, {
    initialData: {
      initialData: initialData
    }
  }, _react.default.createElement(_reactRouter.StaticRouter, {
    location: ctx.path,
    context: context
  }, _react.default.createElement(_layout.default, null, (0, _reactRouterConfig.renderRoutes)(routes)))));
  return {
    state: true,
    html,
    initialData,
    page: fallData.res.page
  };
};

const renderBody = async (ctx, data) => {
  ctx.body = await (0, _ejsHtml.default)('../../temp/ssr.html', data);
}; //返回默认的渲染数据


function getDefaultRenderData() {
  return {
    htmlContent: '',
    propsData: getPropsDataHtml("{}"),
    config: _config.default.cdnHost,
    page: {
      tdk: {
        title: 'zz',
        keyword: 'zz keyword',
        description: 'zz description'
      }
    }
  };
}

function getPropsDataHtml(content) {
  return `<textarea style="display:none" id="zz-server-render-data-BOX">${content}</textarea>`;
}

var _default = async ctx => {
  ctx.set('Content-Type', 'text/html;charset=UTF-8');
  let renderData = getDefaultRenderData();
  console.log(renderData);

  if (_config.default.isSSR) {
    const res = await getComponentHtml(ctx);

    if (_config.default.isDev) {
      console.log('render html =======================');
      console.log('res', res);
    }

    if (res.state) {
      renderData.htmlContent = res.html; //数据转成 base64 客户端再进行转换

      const base64Str = Buffer.from(JSON.stringify({
        initialData: res.initialData || {}
      })).toString('base64');
      renderData.propsData = getPropsDataHtml(base64Str);
      renderData.config = _config.default.cdnHost;
      renderData.page = res.page;
    }
  } //静态zi'yuan资源


  renderData.page.staticSource = _config.default.staticSource;
  await renderBody(ctx, renderData);
};

exports.default = _default;