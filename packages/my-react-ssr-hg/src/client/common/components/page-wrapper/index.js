

import React from 'react';
import { Link } from 'react-router-dom';
import RootContext from '../../../app/root-context';

let _this = null;

const popStateCallback = ()=> {
    // 使用popStateFn保存函数防止addEventListener重复注册
    if (_this && _this.getInitialProps) {
        console.log('popStateFn');
        _this.getInitialProps();
    }
};

export default (SourceComponent)=>{
    return class NewComponent extends React.Component {
        constructor(props,context) {
            super(props);
            this.state={
                initialData:{},
                getProps:false//浏览器端是否需要请求数据
            }
        }

        //用于封装处理
        async getInitialProps(){
            // ssr首次进入页面以及csr/ssr切换路由时才调用组件的getInitialProps方法
            const props = this.props;
            const res = await SourceComponent.getInitialProps ? await SourceComponent.getInitialProps(props) : {};
            this.setState({
                initialData: res,
                getProps: true
            });

            let { tdk } = res.page;
            if (tdk) {
                document.title = tdk.title;
            }
        }
        
        async componentDidMount() {
            
            _this = this; // 修正_this指向，保证_this指向当前渲染的页面组件
            //注册事件，用于在页面回退的时候触发
            window.addEventListener('popstate', popStateCallback);

            const getProps = this.props.history && this.props.history.action === 'PUSH';//路由跳转的时候可以异步请求数据
            console.log('getProps', getProps);
            if (getProps) {
                await this.getInitialProps();
            }
        }

        //得到 context 对象
        static contextType = RootContext;

        render() {
            // 只有在首次进入页面需要将window.__INITIAL_DATA__作为props，路由切换时不需要
            const props = {
                initialData:{}
            };

            if(!this.state.getProps){
               props.initialData = this.context;
            }else{
                props.initialData=this.state.initialData
            }
            return <SourceComponent  {...props}></SourceComponent>
        }
    }
}