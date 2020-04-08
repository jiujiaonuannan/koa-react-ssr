"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _utils = _interopRequireDefault(require("../../common/module/utils"));

var _routeContext = _interopRequireDefault(require("../../app/route-context"));

var _zzPageBase = _interopRequireDefault(require("../../zz-base/common/components/zz-page-base"));

var _fetch = _interopRequireDefault(require("../../common/fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Child(props) {
  return _react.default.createElement("span", {
    style: {
      backgroundColor: props.color
    }
  }, "\u6211\u662F child  11111");
}

class Index extends _zzPageBase.default {
  constructor(props, context) {
    super(props, context);
    this.enableSpaDataCache = true;
  }

  //基础参数的带入
  //opt={query:{},params:{}}
  static async getInitialProps(zzOpt) {
    console.log('=====opt', zzOpt);

    if (__SERVER__) {//如果是服务端渲染的话  可以做的处理
    }

    const fetch1 = _fetch.default.postForm('/fe_api/filed-manager/get-detail-of-type', {
      data: {
        ofTypeId: 4000
      }
    });

    const fecth2 = _fetch.default.postForm('/fe_api/filed-manager/get-detail-of-type', {
      data: {
        ofTypeId: 2000
      }
    });

    const resArr = await _fetch.default.multipleFetch(fetch1, fecth2); //返回所有数据

    return {
      page: {
        tdk: {
          title: 'zz 框架',
          keyword: 'ssr react',
          description: '我是描述'
        }
      },
      fetchData: resArr
    };
  }

  componentDidMount() {
    //下面代码可以放入父组件内的声明周期，或者定义成为父组件的成员方法。但是真正的业务场景可能比较复杂，所以这里我提了出来
    console.log('detail com did');

    if (!this.isSSR && !this.hasSpaCacheData) {
      // 页面如果是客户端的需要重新获取数据
      Index.getInitialProps(this.props.zzOpt).then(data => {
        this.setState({ ...data
        }, () => {
          document.title = this.state.page.tdk.title;
        });
      });
    }
  }

  render() {
    const {
      page,
      fetchData
    } = this.state;
    const [res] = fetchData || [];
    return _react.default.createElement("div", {
      className: "detailBox"
    }, _react.default.createElement(_reactRouterDom.Link, {
      to: "/index"
    }, "\u9996\u9875"), " |   ", _react.default.createElement(_reactRouterDom.Link, {
      to: "/list"
    }, "go \u5217\u8868"), " |  ", _react.default.createElement(_reactRouterDom.Link, {
      to: "/tudou"
    }, "404"), _react.default.createElement("p", null, "-----"), _react.default.createElement(Child, {
      color: this.context.color
    }), _react.default.createElement("div", null, page && _react.default.createElement("div", null, _react.default.createElement("span", null, "title:", page.tdk.title), _react.default.createElement("span", null, "ky:", page.tdk.keyword))), res && res.data.map(item => {
      return _react.default.createElement("div", {
        key: item.id
      }, item.keyId, ":", item.keyName, "---", item.setContent);
    }), _react.default.createElement("p", null, "---=-=-=-=-=-"), _react.default.createElement("div", null, res && res.data.map(item => {
      return _react.default.createElement("div", {
        key: item.id
      }, item.keyId, ":", item.keyName, "---", item.setContent);
    })), "   ", _react.default.createElement(_reactRouterDom.Link, {
      to: "/index"
    }, "\u9996 \u9875"), _react.default.createElement("p", null, "---=-=-=-=-=-"), _react.default.createElement("div", null, res && res.data.map(item => {
      return _react.default.createElement("div", {
        key: item.id
      }, item.keyId, ":", item.keyName, "---", item.setContent);
    })), _react.default.createElement("p", null, "---=-=-=-=-=-"), _react.default.createElement("div", null, res && res.data.map(item => {
      return _react.default.createElement("div", {
        key: item.id
      }, item.keyId, ":", item.keyName, "---", item.setContent);
    })), "   ", _react.default.createElement(_reactRouterDom.Link, {
      to: "/index"
    }, "\u9996 \u9875"), _react.default.createElement("p", null, "---=-=-=-=-=-"), _react.default.createElement("div", null, res && res.data.map(item => {
      return _react.default.createElement("div", {
        key: item.id
      }, item.keyId, ":", item.keyName, "---", item.setContent);
    })), _react.default.createElement("p", null, "---=-=-=-=-=-"), _react.default.createElement("div", null, res && res.data.map(item => {
      return _react.default.createElement("div", {
        key: item.id
      }, item.keyId, ":", item.keyName, "---", item.setContent);
    })), _react.default.createElement("p", null, "---=-=-=-=-=-"), _react.default.createElement("div", null, res && res.data.map(item => {
      return _react.default.createElement("div", {
        key: item.id
      }, item.keyId, ":", item.keyName, "---", item.setContent);
    })), "   ", _react.default.createElement(_reactRouterDom.Link, {
      to: "/index"
    }, "\u9996 \u9875"), _react.default.createElement("p", null, "---=-=-=-=-=-"), _react.default.createElement("div", null, res && res.data.map(item => {
      return _react.default.createElement("div", {
        key: item.id
      }, item.keyId, ":", item.keyName, "---", item.setContent);
    })), _react.default.createElement("p", null, "---=-=-=-=-=-"), _react.default.createElement("div", null, res && res.data.map(item => {
      return _react.default.createElement("div", {
        key: item.id
      }, item.keyId, ":", item.keyName, "---", item.setContent);
    })), "   ", _react.default.createElement(_reactRouterDom.Link, {
      to: "/index"
    }, "\u9996 \u9875"), _react.default.createElement("p", null, "---=-=-=-=-=-"), _react.default.createElement("div", null, res && res.data.map(item => {
      return _react.default.createElement("div", {
        key: item.id
      }, item.keyId, ":", item.keyName, "---", item.setContent);
    })), _react.default.createElement("p", null, "---=-=-=-=-=-"), _react.default.createElement("div", null, res && res.data.map(item => {
      return _react.default.createElement("div", {
        key: item.id
      }, item.keyId, ":", item.keyName, "---", item.setContent);
    })), "   ", _react.default.createElement(_reactRouterDom.Link, {
      to: "/index"
    }, "\u9996 \u9875"), _react.default.createElement("p", null, "---=-=-=-=-=-"), _react.default.createElement("div", null, res && res.data.map(item => {
      return _react.default.createElement("div", {
        key: item.id
      }, item.keyId, ":", item.keyName, "---", item.setContent);
    })), _react.default.createElement("p", null, "---=-=-=-=-=-"), _react.default.createElement("div", null, res && res.data.map(item => {
      return _react.default.createElement("div", {
        key: item.id
      }, item.keyId, ":", item.keyName, "---", item.setContent);
    })), _react.default.createElement(_reactRouterDom.Link, {
      to: "/index"
    }, "\u9996 \u9875"));
  }

}

exports.default = Index;
Index.contextType = _routeContext.default;