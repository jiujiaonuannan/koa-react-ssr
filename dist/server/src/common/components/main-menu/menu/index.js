"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _menu = _interopRequireDefault(require("./menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MENUID = 'showmenuid';

class Index extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenuId: 0
    };
  }

  handleMenuClick(id, e) {
    this.setState({
      showMenuId: id
    });
    localStorage.setItem(MENUID, id); //e.nativeEvent.preventDefault();

    e.preventDefault(); //两个方法都 ok，组织默认行为
  }

  componentDidMount() {
    let mid = localStorage.getItem(MENUID);
    mid && this.setState({
      showMenuId: mid
    });
  }

  render() {
    return _menu.default.map(item => {
      return _react.default.createElement("div", {
        className: "main-menu-f-item",
        key: item.id
      }, _react.default.createElement("a", {
        className: "fitema",
        onClick: this.handleMenuClick.bind(this, item.id)
      }, item.name), this.state.showMenuId == item.id ? _react.default.createElement("div", {
        className: "fitem-child"
      }, item.child && item.child.map(citem => {
        return _react.default.createElement(_reactRouterDom.Link, {
          key: citem.id,
          to: citem.link
        }, citem.name);
      })) : null);
    });
  }

}

exports.default = Index;