"use strict";

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRouterDom = require("react-router-dom");

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../routes/index"));

var _provider = _interopRequireDefault(require("./provider"));

var _matchComponent = _interopRequireDefault(require("./match-component"));

var _routesConfig = _interopRequireDefault(require("../routes/routes-config"));

var _base = _interopRequireDefault(require("../common/module/base64"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//渲染入口，支持 csr 和 ssr。
//ssr 会自动完成双端 dom 对比
function renderUI(state, initialData) {
  let render = _reactDom.default.hydrate;
  if (!state) render = _reactDom.default.render;
  render(_react.default.createElement(_reactRouterDom.BrowserRouter, null, _react.default.createElement(_provider.default, {
    initialData: initialData
  }, _react.default.createElement(_index.default, null))), document.getElementById('rootEle'), e => {});
}

function filterJSONStr(str) {
  return str.replace(/\n/g, '<br/>');
}

function entryIndex() {
  let APP_INIT_DATA = {};
  let state = true;
  let stateText = document.getElementById('zz-server-render-data-BOX');

  if (!stateText) {
    state = false;
  } else {
    APP_INIT_DATA = JSON.parse(filterJSONStr(_base.default.decode(stateText.value || '')) || "{}");
  }

  console.log('state', state);

  if (!state) {
    //客户端渲染
    renderUI(state);
  } else {
    (0, _matchComponent.default)(document.location.pathname, (0, _routesConfig.default)()).then(res => {
      renderUI(true, APP_INIT_DATA);
    });
  }
} //执行入口


entryIndex(); //开发环境才会开启

if (process.env.IS_DEV && module.hot) {
  module.hot.accept();
}