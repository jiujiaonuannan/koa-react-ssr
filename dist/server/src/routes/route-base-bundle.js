"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 动态加载组件一个容器组件
 *
 * @class Bundle
 * @extends {Component}
 */
class Bundle extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      mod: null
    };
  }

  componentDidMount() {
    if (!this.state.mod) {
      this.load(this.props);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //路由改变才会按需
    if (nextProps.match && this.props.match && nextProps.match.url !== this.props.match.url) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({
      mod: null
    }); //注意这里，使用Promise对象; mod.default导出默认

    props.load().then(mod => {
      this.setState({
        mod: mod.default ? mod.default : mod
      });
    });
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : _react.default.createElement(NewPageLoading, null);
  }

}

exports.default = Bundle;

function NewPageLoading() {
  return _react.default.createElement("div", null, "loading.....");
}