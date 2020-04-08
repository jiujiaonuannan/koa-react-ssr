//页面的路由配置，可配置动态加载信息，必须返回Bundle 组件

import React from 'react';
import BaseBundle from '../../../routes/route-base-bundle';
//import LazyPageCom from '../index';

const LazyPageCom = (props) => (
    <BaseBundle {...props} load={() => import(/*webpackChunkName:"chunk-detail"*/'../index')}>
        {(CompIndex) => <CompIndex {...props} />}
    </BaseBundle>
);

export default [
    {
        path:'/detail',
        component: LazyPageCom,
        exact:true
    }
]


