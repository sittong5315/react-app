import React, { Component } from 'react'
import './Repair.css'
import {Toast} from 'antd-mobile'
export default class item extends Component {
    state = {
        repair: [],
        star: ['', '', '', '', ''],
        score: []
    }
    componentWillMount(){
        Toast.loading('Loading',1)
    }
    componentDidMount() {
        this.$axios({
            url: 'findRepair',
            method: 'get'
        }).then(res => {
            var repair = res.data.data
            res.data.data.map(item => {
                this.state.score.push(item.score)
            })
            this.setState({
                repair
            })
        })
    }
    to(id) {
        this.props.history.push('/repairdetail/' + id)
    }
    back() {
        this.props.history.go(-1)
    }
    render() {
        return (
            <div className="repair">
                <header className="header">
                    <span className="iconfont icon-houtuishangyige" onTouchEndCapture={() => this.back()} ></span>
                    <span className="title">商家列表</span>
                    <div className="right">
                        <span className="iconfont icon-sousuo"></span>
                    </div>
                </header>
                <div className="type">
                    <div>
                        手机维修
                    </div>
                    <div>
                        区域
                    </div>
                    <div>
                        智能排序
                    </div>
                </div>
                <div className="content">
                    {
                        this.state.repair.map((item, idx) => {
                            return <div className="item" onTouchEndCapture={(id) => this.to(item.id)} key={item.id}>
                                <div className="left">
                                    <div className="name">
                                        <span className="name-name">{item.name}</span>
                                        {
                                            this.state.star.map((i, index) => {
                                                var score = this.state.score[idx]
                                                return <span className="iconfont icon-xingxing" key={index} style={{ color: (score >= index + 1 ? '#ff6600' : '#ccc') }}></span>
                                            })
                                        }
                                    </div>
                                    <div className="item-type">
                                        {item.type}
                                    </div>
                                    <div className="address">
                                        <span className="iconfont icon-dingwei1"></span>
                                        <span className="add">{item.address}</span>
                                    </div>
                                </div>
                                <div className="right">
                                    <span className="iconfont icon-dianhua"></span>
                                    <p className="len">200米</p>
                                </div>
                            </div>
                        })
                    }
                    {/* <div className="item">
                        <div className="left">
                            <div className="name">
                                <span className="name-name">百佳手机维修中心</span>
                                <span className="iconfont icon-xingxing"></span>
                            </div>
                            <div className="item-type">
                                电脑、办公设备、网络、监控、门禁
                            </div>
                            <div className="address">
                                <span className="iconfont icon-dingwei1"></span>
                                <span className="add">力宝大厦北区3楼中公教育</span>
                            </div>
                        </div>
                        <div className="right">
                            <span className="iconfont icon-dianhua"></span>
                            <p className="len">200米</p>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}