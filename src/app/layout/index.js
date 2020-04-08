import React from 'react';
import {
    Link
} from 'react-router-dom';
export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="layout-box">
            我是 layout，你一直会看到我,<Link to="/detail">跳转到详情页面</Link>
            {this.props.children || null}
        </div>
    }
}