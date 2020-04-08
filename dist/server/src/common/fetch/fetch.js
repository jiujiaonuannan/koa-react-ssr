"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireDefault(require("../module/utils"));

var _projectConfig = _interopRequireDefault(require("../../config/project-config"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 需要封装一个请求模块, 返回 promise
 * 可支持 post - form|json
 * 支持 get 的请求
 *
 * 可以根据 process.env.IS_DEV 判断是否是线上环境
 *  * 
 * 
 */
const requestHost = _projectConfig.default.reqApiUrlHost;

const getFetchInstance = () => {
  return _nodeFetch.default || window.fetch;
};
/**
 * 
 * @param {获得请求的 url 地址} url 
 */


const getReqUrl = url => {
  return requestHost + url + '?t=' + +new Date() + '&';
};

const REQ_CONTENT_TYPE = {
  FORM: 'form',
  JSON: 'json',
  FILE: 'fupload'
};
const REQ_METHOD = {
  GET: 'GET',
  POST: 'POST'
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const doRequest = (url, opt) => {
  if (!url) throw Error('fetch url is null'); //console.log(opt);

  url = getReqUrl(url);
  const config = {
    method: opt.method,
    headers: opt.headers,
    credentials: 'include'
  };

  if (opt.method === REQ_METHOD.POST && opt.contentType === REQ_CONTENT_TYPE.JSON) {
    config.body = JSON.stringify(opt.data || {}); //发送 json
  } else if (opt.method === REQ_METHOD.POST && opt.contentType === REQ_CONTENT_TYPE.FORM) {
    config.body = _utils.default.querySerialize(opt.data); //发送 form 表单
    //console.log('config.body');
    //console.log(config.body);
  } else {
    if (opt.method === REQ_METHOD.GET) {
      url = url + _utils.default.querySerialize(opt.data); //走 get
    } else if (opt.contentType === REQ_CONTENT_TYPE.FILE) {
      config.body = opt.data;
    }
  }

  let promise = (0, _nodeFetch.default)(url, config).then(checkStatus).then(parseJSON).then(res => {
    return res;
  }).catch(error => {
    console.log('request failed', error);
  });
  return promise;
};

var _default = {
  get: (url, opt) => {
    opt.method = 'GET';
    opt.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return doRequest(url, opt);
  },
  postForm: (url, opt) => {
    opt.method = 'POST';
    opt.contentType = REQ_CONTENT_TYPE.FORM;
    opt.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return doRequest(url, opt);
  },
  postJson: (url, opt) => {
    opt.method = 'POST';
    opt.contentType = REQ_CONTENT_TYPE.JSON;
    opt.headers = {
      'Content-Type': 'application/json'
    };
    return doRequest(url, opt);
  },
  //目前只支持单文件上传
  uploadFile: async (url, fileInputElements = []) => {
    const opt = {
      contentType: REQ_CONTENT_TYPE.FILE,
      method: 'POST'
    };
    let formData = new FormData();
    formData.append('name', 100);
    formData.append('clientFile', fileInputElements[0].files[0]);
    opt.data = formData;
    return doRequest(url, opt);
  },
  multipleFetch: (...promises) => {
    if (!promises) {
      return null;
    }

    return Promise.all(promises).then(dataArr => {
      return dataArr; //返回数组（数组内包含各个接口的返回结果）
    });
  }
};
exports.default = _default;