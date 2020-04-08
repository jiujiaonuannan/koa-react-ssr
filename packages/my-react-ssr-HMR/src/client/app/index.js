

//client/app/index.js
//浏览器端页面结构渲染入口

import React from 'react';
import ReactDom from 'react-dom';
import App from '../router/index';
import { BrowserRouter } from 'react-router-dom';
import routeList from '../router/route-config';
import matchRoute from '../../share/match-route';
import Provider from './provider';

function clientRender() {

        let initialData = JSON.parse(document.getElementById('ssrTextInitData').value);

        //查找路由
        let matchResult = matchRoute(document.location.pathname, routeList);
        let { targetRoute } = matchResult;
        if (targetRoute) {
                //设置组件初始化数据
                targetRoute.initialData = initialData;
        }

        //渲染index
        ReactDom.hydrate(<BrowserRouter>
                <App routeList={routeList} />
        </BrowserRouter>
                , document.getElementById('root'))

}


//渲染入口
clientRender();

//开发环境才会开启
if (process.env.NODE_ENV==='development' &&  module.hot) {
    module.hot.accept();
}