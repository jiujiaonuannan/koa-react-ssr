"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _ejs = _interopRequireDefault(require("ejs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default(file, data) {
  const ctx = this;
  data || (data = {}); // Object.assign(data, ctx.CommonInfo || {}); //合并基础数据

  return new Promise(resolve => {
    _ejs.default.renderFile(_path.default.resolve(__dirname, file), data, {
      rmWhitespace: true
    }, function (err, str) {
      // str => 输出绘制后的 HTML 字符串
      if (err) {
        throw Error(err);
      }

      resolve(str);
    });
  });
}