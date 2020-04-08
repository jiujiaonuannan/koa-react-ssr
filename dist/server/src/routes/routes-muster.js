"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _route = _interopRequireDefault(require("../pages/detail/config/route"));

var _route2 = _interopRequireDefault(require("../pages/index/config/route"));

var _route3 = _interopRequireDefault(require("../pages/z-no-match/config/route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [_route2.default, _route.default, _route3.default];
exports.default = _default;
