import React, { Component } from 'react'
import './JZdetail.css'
import { Toast } from 'antd-mobile'
import img from '../../assets/img/water.png'
export default class item extends Component {
    state = {
        jz: {},
        com: [],
        id: '',
        qualification: [],
        type: []
    }
    componentWillMount() {
        Toast.loading('Loading', 1)
    }
    componentDidMount() {
        var id = this.props.match.params.id
        this.setState({
            id
        }, () => {
            this.$axios({
                url: '/findHomeWorker',
                method: 'get',
                params: {
                    id
                }
            }).then(res => {
                var jz = res.data.data[0]
                var qualification = jz.qualification.split(',')
                if (jz.type.includes('[')) {
                    var type = JSON.parse(jz.type)
                } else {
                    var type = jz.type.split(',')
                }
                if (jz.qualification.includes('[')) {
                    var qualification = JSON.parse(jz.qualification)
                } else {
                    var qualification = jz.qualification.split(',')
                }
                var p = jz.price
                p = p.replace('每', '')
                p = p.replace('/小时', '')
                if (p.indexOf('元') === -1) {
                    p = p + '元'
                }
                this.setState({
                    jz,
                    qualification,
                    type,
                    p
                })
            })
        })
    }
    back() {
        this.props.history.go(-1)
    }
    render() {
        var jz = this.state.jz
        var type = this.state.type
        var qualification = this.state.qualification
        var p = this.state.p

        return (
            <div className="jzdetail">
                <header className="header">
                    <span className="iconfont icon-houtuishangyige" onTouchEndCapture={() => this.back()}></span>
                    <span className="title">{jz.name}</span>
                    <div className="right">
                        <span className="iconfont icon-user"></span>
                    </div>
                </header>
                <div className="item">
                    <div className="left">
                        <img src={jz.img} alt="" />
                    </div>
                    <div className="center">
                        <div className="t">
                            <span>{jz.name}</span>
                            <div>
                                <span>V</span>
                                <span>3</span>
                            </div>
                        </div>
                        <div className="msg">
                            <span className="add">{jz.city}</span>
                            <span>|</span>
                            <span className="age">{jz.age}</span>
                            <span>|</span>
                            <span className="edu">{jz.edu}</span>
                            <span>|</span>
                            <span className="exp">{jz.experience}</span>
                        </div>
                        <div className="des">
                            资深资深资深资深资深资深资深资深资深资深资深资深资深
                        </div>
                        <div className="count">
                            <span className="iconfont icon-xingxing"></span>
                            <span>收藏 {jz.readNum}</span>
                            <span className="iconfont icon-aixin"></span>
                            <span>关注 {jz.likeNum}</span>
                        </div>
                        <div className="len">
                            <span className="iconfont icon-dingwei1"></span>
                            <span>距您{jz.len}</span>
                        </div>
                        <div className="time">
                            <span className="price">￥{p}</span>
                            <span>/小时</span>
                        </div>
                    </div>
                </div>
                <div className="msg">
                    <div className="t">简介</div>
                    <div className="m">
                        <div className="zige">
                            <span>资格认证：</span>
                            {
                                qualification.map((item, index) => {
                                    return <span key={index}>{item} </span>
                                })
                            }
                        </div>
                        <div className='type'>
                            <span>服务项目：</span>
                            {
                                type.map((item, index) => {
                                    return <span key={index}>{item} </span>
                                })
                            }
                        </div>
                        <div className="des">
                            <span>自我评价：</span>
                            <span>{jz.info}</span>
                        </div>
                    </div>
                </div>
                <div className="comment">
                    <div className="title">
                        <span>雇主评价</span>
                        <span className="iconfont icon-combinedshapecopy2"></span>
                        <span className="write">写评论</span>
                    </div>
                    <div className="content">
                        <div className="user">
                            <img src={img} />
                        </div>
                        <div className="username">
                            <span>123</span>
                            <span className="time">刚刚</span>
                        </div>
                        <p className="com">
                            那是真的牛逼
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}