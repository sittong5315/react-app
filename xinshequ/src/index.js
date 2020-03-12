import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/css/iconfont.css'
import './assets/css/reset.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import './assets/js/rem'
import 'antd-mobile/dist/antd-mobile.css'
import store from './store/index'
import axios from 'axios'
import { Toast } from 'antd-mobile'

axios.interceptors.response.use(res => {
    if(window.location.href.indexOf('/login')!=-1){
        return res;
    }
    if(res.data.code==-1){
        this.props.history.push('/login')
        Toast.fail('请先登录',1)
    }
    console.log(res);
    return res
})
Component.prototype.$axios = axios
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
