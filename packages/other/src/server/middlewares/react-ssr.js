// /src/server/middlewares/react-ssr.js

//完成 react ssr 工作的中间件
//引入Index 组件
import React from 'react';
import { renderToString } from 'react-dom/server';

import { StaticRouter, Route, matchPath} from 'react-router';
import { renderRoutes} from 'react-router-config';

import Layout from '../../client/app/layout';//如果有 layout 组件，也需要一起转换为 html
import routeList from '../../client/router/route-config';

//自定义 provider 用来传递数据
import Provider from '../../client/app/provider';

//css 同构的上下文
import StyleContext from 'isomorphic-style-loader/StyleContext'

import App from '../../client/router/index';

import { Helmet } from 'react-helmet';

const getAssets = require('../common/assets');


//根据请求 path 查找组件
const findRouteByPath=(opt)=>{
    let {path} = opt;
    let Component;
    for(var item of routeList){
       if(matchPath(path,item)){
        Component = item.component;
        break;
       }
    }
    return Component;
}

export default  async (ctx,next)=>{

    const path = ctx.request.path;

    if(/.(ico|jpg|png|gif)/.test(path)){
        return next();
    }

    console.log('ctx.request.path', ctx.request.path);

    //静态资源
    const assetsMap = getAssets();


    let Component = findRouteByPath({
        path
    });

    if (!Component){
        Component = function Not() {
            return <div>404 page</div>
        }
    }

    //得到数据
    let fetchDataFn = Component.getInitialProps;
    let fetchResult =null;
    if(fetchDataFn){
        fetchResult = await fetchDataFn();
    }

    //数据传入组件，通过react context 特性传入

    let context={};

    let { page } = fetchResult || {};
    let tdk = {
        title: '默认标题',
        keywords: '默认关键词',
        description: '默认描述'};

    if(page && page.tdk){
        tdk=page.tdk;
    }
   
    const css = new Set() // CSS for all rendered React components
    const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));

    const html = renderToString(<Provider initialData={fetchResult||{}}>
        <StyleContext.Provider value={{ insertCss }} ><StaticRouter location={path} context={context}><App></App></StaticRouter></StyleContext.Provider>
    </Provider>);

    const helmet = Helmet.renderStatic();

    ctx.body=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
   <style> ${[...css].join('')}</style>
</head>
<body>
    <div id="root">
       ${html}
    </div>
    <textarea id="ssrTextInitData" style="display:none;">
    ${JSON.stringify(fetchResult)}
    </textarea>
</body>
</html>
</body>
 ${assetsMap.js.join('')}
`;

    await next();
}