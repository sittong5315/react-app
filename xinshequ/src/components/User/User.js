import React, { Component } from 'react'
import './User.css'
import img from '../../assets/img/water.png'
import store from '../../store/index'
import { Toast, Modal } from 'antd-mobile'
export default class item extends Component {
    state = {
        user: {
            name: '',
            img: '',
            tel: ''
        }
    }
    componentDidMount() {
        var name = store.getState().user.name
        this.setState({
            name
        }, () => {
            this.$axios({
                url: '/findUser',
                method: 'post',
                data: {
                    name: this.state.name
                }
            }).then(res => {
                var img = res.data.data[0].img
                var tel = res.data.data[0].tel
                this.setState({
                    img,
                    tel
                })
            })
        })
    }
    onChange(e) {
        var tel = e.target.value
        this.setState({
            tel
        })
    }
    reUser() {
        this.$axios({
            url: '/updateUser',
            method: 'post',
            data: {
                name: this.state.name,
                tel: this.state.tel
            }
        }).then(res => {
            if (res.data.info) {
                Toast.success('修改成功', 1)
                this.$axios({
                    url: '/findUser',
                    method: 'post',
                    data: {
                        name: this.state.name
                    }
                }).then(res => {
                    var img = res.data.data[0].img
                    var tel = res.data.data[0].tel
                    this.setState({
                        img,
                        tel
                    })
                })
            } else {
                Toast.fail(res.data.info, 1)
            }
        })
    }
    back() {
        this.props.history.go(-1)
    }
    render() {
        const prompt = Modal.prompt;
        return (
            <div className="user">
                <header className="header">
                    <span className="iconfont icon-houtuishangyige" onTouchEndCapture={() => this.back()}></span>
                    <span className="title">用户管理</span>
                </header>
                <div className="img">
                    <img src={this.state.img || img} alt="" />
                </div>
                <div className="change">
                    <span className="changeimg" onClick={() => prompt(
                        '上传',
                        '上传一张图片作为你的新头像',
                        [
                            { text: '取消' },
                            {
                                text: '提交', onPress: content => {
                                    this.$axios({
                                        url: '/updateUser',
                                        method: 'post',
                                        data: {
                                            img: content,
                                            name: this.state.name
                                        }
                                    }).then(res => {
                                        if (res.data.info) {
                                            Toast.success('修改成功', 1)
                                            this.$axios({
                                                url: '/findUser',
                                                method: 'post',
                                                data: {
                                                    name: this.state.name
                                                }
                                            }).then(res => {
                                                var img = res.data.data[0].img
                                                var tel = res.data.data[0].tel
                                                this.setState({
                                                    img,
                                                    tel
                                                })
                                            })
                                        } else {
                                            Toast.fail(res.data.info, 1)
                                        }
                                    })

                                }
                            },
                        ],
                        'default',
                    )}>更换头像</span>
                </div>
                <div className="user-r">
                    <div>
                        <input type="text" className="re" placeholder={this.state.name} disabled />
                        <span className="iconfont icon-user"></span>
                    </div>
                    <div>
                        <input type="text" className="pass" placeholder={this.state.tel} onChange={(e) => this.onChange(e)} />
                        <span className="iconfont icon-shouji"></span>
                    </div>
                </div>
                <div className="btn">
                    <button onTouchEndCapture={() => this.reUser()}>修改</button>
                </div>
            </div>
        )
    }
}