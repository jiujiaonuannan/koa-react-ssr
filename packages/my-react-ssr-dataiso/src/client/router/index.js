// src/client/router/indxex.js
//路由配置文件
import React  from 'react';
import Layout from '../app/layout';

import { Route, Switch, BrowserRouter,Redirect } from 'react-router-dom';

function Page404() {
    return <div>404拉 </div>
}

function App({routeList}) {
    return (
            <Layout> 
               <Switch>
                {
                    routeList.map(item=>{
                        return item.initialData ? <Route key={item.path} exact={item.exact} path={item.path}  render={(props)=>{
                            return <item.component {...props} initialData={item.initialData}></item.component>
                        }}></Route> : <Route key={item.path} {...item}></Route>
                    })
                }
                <Route to="*" component={Page404}></Route>
            </Switch>
            </Layout>
    );
}

export default App;