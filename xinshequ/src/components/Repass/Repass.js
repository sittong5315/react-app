import React, { Component } from 'react'
import './Repass.css'
import { Toast } from 'antd-mobile'
import store from '../../store/index'
export default class item extends Component {
    state = {
        user: {
            name: '',
            pass: '',
        },
        pass: {
            oldpass: '',
            newpass: ''
        }
    }
    componentDidMount() {
        this.setState({
            user: store.getState().user
        })
    }
    onChange(e, props) {
        var pass = this.state.user
        pass[props] = e.target.value
        this.setState({
            pass
        })
    }
    register() {
        this.$axios({
            url: '/changePassUser',
            method: 'post',
            data: {
                name: this.state.user.name,
                oldpass: this.state.pass.oldpass,
                newpass: this.state.pass.newpass
            }
        }).then(res => {
            if (res.data.isok) {
                Toast.success('修改成功！', 1)
                this.props.history.push('/login')
            }else{
                Toast.fail(res.data.info, 1)
            }
        })
    }
    back(){
        this.props.history.go(-1)
    }
    render() {
        return (
            <div className="repass">
                <header className="header">
                    <span className="iconfont icon-houtuishangyige" onTouchEndCapture={() => this.back()}></span>
                    <span className="title">修改密码</span>
                    <div className="right">
                        <span className="iconfont icon-user"></span>
                    </div>
                </header>
                <div className="repasss">
                    <div>
                        <input type="text" className="tel" placeholder={store.getState().user.name} disabled />
                        <span className="iconfont icon-user"></span>
                    </div>
                    <div>
                        <input type="password" className="re" placeholder="旧密码" onChange={(e) => this.onChange(e, 'oldpass')} />
                        <span className="iconfont icon-suo"></span>
                    </div>
                    <div>
                        <input type="password" className="pass" placeholder="新密码" onChange={(e) => this.onChange(e, 'newpass')} />
                        <span className="iconfont icon-suo"></span>
                    </div>
                </div>
                <div className="btn">
                    <button onTouchEndCapture={() => this.register()}>确定</button>
                </div>
            </div>
        )
    }
}