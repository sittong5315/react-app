import React, { Component } from 'react'
import Back from '../../views/Back/Back'
import { Toast } from 'antd-mobile'
import './Register.css'

export default class item extends Component {
    state = {
        user: {
            name: '',
            pass: '',
            tel: ''
        },
        re: ''
    }
    onChange(e, props) {
        var user = this.state.user
        user[props] = e.target.value
    }
    onChangeRe(e, props) {
        this.state.re = e.target.value
    }
    register() {
        if (this.state.re) {
            this.$axios({
                url: '/addUser',
                method: 'post',
                data: this.state.user
            }).then(res => {
                if (res.data.isok) {
                    Toast.success('注册成功', 1)
                    this.props.history.push('/login')
                }else{
                    Toast.fail(res.data.info, 1)
                }
            })
        }
    }
    render() {
        return (
            <div className="register">
                <header>
                    <Back className="back" />
                    <span>注册</span>
                </header>
                <div className="register-r">
                    <div>
                        <input type="text" className="tel" placeholder="手机号码/邮箱" onChange={(e) => this.onChange(e, 'tel')} />
                        <span className="iconfont icon-shouji"></span>
                    </div>
                    <div>
                        <input type="text" className="tel" placeholder="账号" onChange={(e) => this.onChange(e, 'name')} />
                        <span className="iconfont icon-user"></span>
                    </div>
                    <div>
                        <input type="text" className="re" placeholder="手机验证码" onChange={(e) => this.onChangeRe(e, 're')} />
                        <button>验证码</button>
                        <span className="iconfont icon-yanzhengma2"></span>
                    </div>
                    <div>
                        <input type="password" className="pass" placeholder="6-32位密码" onChange={(e) => this.onChange(e, 'pass')} />
                        <span className="iconfont icon-suo"></span>
                    </div>
                </div>
                <div className="btn">
                    <button onTouchEndCapture={() => this.register()}>注册</button>
                </div>
            </div>
        )
    }
}