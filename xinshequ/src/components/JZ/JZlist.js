import React, { Component } from 'react'
import './JZlist.css'
import { Toast } from 'antd-mobile'
import img from '../../assets/img/water.png'
export default class item extends Component {
    state = {
        jz: [],
        type: ''
    }
    componentWillMount() {
        Toast.loading('Loading', 1)
    }
    componentDidMount() {
        var type = this.props.match.params.type
        this.setState({
            type
        }, () => {
            this.$axios({
                url: '/findHomeWorker',
                method: 'get',
                params: {
                    type: this.state.type
                }
            }).then(res => {
                var jz = res.data.data
                this.setState({
                    jz
                })
            })
        })
    }
    to(id) {
        this.props.history.push('/jzdetail/' + id)
    }
    back() {
        this.props.history.go(-1)
    }
    render() {
        return (
            <div className="jzlist">
                <header className="header">
                    <span className="iconfont icon-houtuishangyige" onTouchEndCapture={() => this.back()}></span>
                    <span className="title">{this.state.type}</span>
                    <div className="right">
                        <span className="iconfont icon-sousuo"></span>
                    </div>
                </header>
                <div className="type">
                    <div>
                        籍贯
                    </div>
                    <div>
                        工资
                    </div>
                    <div>
                        年龄
                    </div>
                </div>
                {
                    this.state.jz.map(item => {
                        var v = item.vNum.slice(0, 1)
                        var num = item.vNum.slice(1, 2)
                        var p = item.price
                        p = p.replace('每', '')
                        if (p.indexOf('/小时')) {
                            p = p.replace('/小时', '')
                        }
                        if (p.indexOf('元') === -1) {
                            p = p + '元'
                        }
                        return <div className="item" key={item.id}>
                            <div className="left">
                                <img src={item.img || img} alt="" />
                            </div>
                            <div className="center" onTouchEndCapture={(id) => { this.to(item.id) }}>
                                <div className="t">
                                    <span>{item.name}</span>
                                    <div>
                                        <span>{v}</span>
                                        <span>{num}</span>
                                    </div>
                                </div>
                                <div className="msg">
                                    <span className="add">{item.city}</span>
                                    <span>|</span>
                                    <span className="age">{item.age}</span>
                                    <span>|</span>
                                    <span className="edu">{item.edu}</span>
                                    <span>|</span>
                                    <span className="exp">{item.experience}</span>
                                </div>
                                <div className="des">
                                    {item.info}
                                </div>
                                <div className="count">
                                    <span className="iconfont icon-xingxing"></span>
                                    <span>收藏 {item.readNum}</span>
                                    <span className="iconfont icon-aixin"></span>
                                    <span>关注 {item.likeNum}</span>
                                </div>
                                <div className="len">
                                    <span className="iconfont icon-dingwei1"></span>
                                    <span>距您{item.len}</span>
                                </div>
                                <div className="time">
                                    <span className="price">{p}</span>
                                    <span>/小时</span>
                                </div>
                            </div>
                        </div>
                    })
                }
                {/* <div className="item">
                    <div className="left">
                        <img src={img} alt="" />
                    </div>
                    <div className="center">
                        <div className="t">
                            <span>王语嫣</span>
                            <div>
                                <span>V</span>
                                <span>3</span>
                            </div>
                        </div>
                        <div className="msg">
                            <span className="add">南京</span>
                            <span>|</span>
                            <span className="age">47岁</span>
                            <span>|</span>
                            <span className="edu">大专</span>
                            <span>|</span>
                            <span className="exp">3年经验</span>
                        </div>
                        <div className="des">
                            资深资深资深资深资深资深资深资深资深资深资深资深资深
                        </div>
                        <div className="count">
                            <span className="iconfont icon-xingxing"></span>
                            <span>收藏 2131</span>
                            <span className="iconfont icon-aixin"></span>
                            <span>关注 2143</span>
                        </div>
                        <div className="len">
                            <span className="iconfont icon-dingwei1"></span>
                            <span>距您3.2公里</span>
                        </div>
                        <div className="time">
                            <span className="price">￥130</span>
                            <span>/小时</span>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}