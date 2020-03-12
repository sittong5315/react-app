import React, { Component } from 'react'
import { Toast } from 'antd-mobile'
import './Login.css'
import store from '../../store/index'
export default class item extends Component {
    state = {
        user: {
            name: '',
            pass: '',
            type: '2'
        }
    }
    componentDidMount() {
        // store.subscribe(() => {
        //     this.setState({})
        // })
    }
    changeInput(e, props) {
        var user = this.state.user
        user[props] = e.target.value
    }
    login() {
        this.$axios({
            url: '/login',
            method: 'post',
            data: this.state.user
        }).then(res => {
            Toast.success('登录成功！', 1)
            store.dispatch({
                type: "login",
                payload: this.state.user
            })
            this.props.history.push('/index')
        })
    }
    to(a) {
        this.props.history.push(a)
    }
    render() {
        return (
            <div className="wrapper">
                {/* <span className="iconfont icon-suo"></span>
                <span className="iconfont icon-user"></span> */}
                <header>
                    <span className="title">登录</span>
                </header>
                <div className="login">
                    <div>
                        <input type="text" className="name" placeholder="邮箱/手机号" onChange={(e) => this.changeInput(e, 'name')} />
                        <span className="iconfont icon-user"></span>
                    </div>
                    <div>
                        <input type="password" className="pass" placeholder="密码" onChange={(e) => this.changeInput(e, 'pass')} />
                        <span className="iconfont icon-suo"></span>
                    </div>
                </div>
                <div className="btn">
                    <button onTouchEndCapture={() => this.login()}>登录</button>
                </div>
                <a className="forgetPass">忘记密码?</a>
                <a className="register" onTouchEndCapture={() => this.to('/register')}>注册</a>
                <div className="or">
                    <div className="left">

                    </div>
                    <span>或者</span>
                    <div className="right">

                    </div>
                </div>
                <p>
                    社交账号快速登录
                </p>
                <div className="other-login">
                    <span className="iconfont icon-qq"></span>
                    <span className="iconfont icon-weixin"></span>
                    <span className="iconfont icon-weibo"></span>
                </div>
            </div>
        )
    }
}