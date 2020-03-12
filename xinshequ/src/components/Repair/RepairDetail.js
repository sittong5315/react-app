import React, { Component } from 'react'
import './RepairDetail.css'
import store from '../../store/index'
import { Modal, Toast } from 'antd-mobile'
import img from '../../assets/img/water.png'
export default class item extends Component {
    state = {
        id: '',
        repair: {},
        com: [],
        star: ['', '', '', '', '']
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
                url: '/findRepairComment',
                method: 'get',
                params: {
                    repairId: this.state.id
                }
            }).then(res => {
                var com = res.data.data.reverse()
                this.setState({
                    com
                })
            })
            this.$axios({
                url: '/findRepair',
                method: 'get',
                params: {
                    id: this.state.id
                }
            }).then(res => {
                var repair = res.data.data[0]
                this.setState({
                    repair
                })
            })
        })

    }
    back() {
        this.props.history.go(-1)
    }
    render() {
        let repair = this.state.repair
        const prompt = Modal.prompt;
        return (
            <div className="repairdetail">
                <header className="header">
                    <span className="iconfont icon-houtuishangyige" onTouchEndCapture={() => this.back()}></span>
                    <span className="title">详细</span>
                    <div className="right">
                        <span className="iconfont icon-user"></span>
                    </div>
                </header>
                <div className="t">
                    <span className="title-title">{repair.name}</span>
                    {
                        this.state.star.map((item, index) => {
                            return <span className="iconfont icon-xingxing" key={index} style={{ color: (this.state.repair.score >= index + 1 ? '#ff6600' : '#ccc') }}></span>
                        })
                    }
                </div>
                <div className="msg">
                    <div className="address">
                        <span className="iconfont icon-dingwei1"></span>
                        <span className="add">距你{repair.len}</span>
                    </div>
                    <div className="ad">
                        {repair.address}
                    </div>
                    <div className="time">
                        营业时间：9：00-20：00
                    </div>
                    <div className="btn">
                        <span className="btn1">关注</span>
                        <span className="btn2">向他提问</span>
                    </div>
                    <div className="count">
                        <span className="iconfont icon-xingxing"></span>
                        <span className="like">关注 {repair.likeNum}</span>
                        <span className="iconfont icon-aixin"></span>
                        <span className="good">好评 {repair.readNum}</span>
                    </div>

                </div>
                <div className="des">
                    <div className="d-title">商家信息</div>
                    <div className="content">
                        {repair.info}
                    </div>
                </div>
                <div className="comment">
                    <div className="c-title">
                        <span>TA们都在说</span>
                        <span className="iconfont icon-combinedshapecopy2"></span>
                        <span className="write" onClick={() => prompt(
                            '写评论',
                            '您可以提出您宝贵的意见',
                            [
                                { text: '取消' },
                                {
                                    text: '提交', onPress: content => {
                                        this.$axios({
                                            url: '/addRepairComment',
                                            method: 'get',
                                            params: {
                                                name: store.getState().user.name,
                                                repairId: this.state.id,
                                                content: content,
                                                time: String(new Date().getTime())
                                            }
                                        }).then(res => {
                                            this.$axios({
                                                url: '/findRepairComment',
                                                method: 'get',
                                                params: {
                                                    repairId: this.state.id
                                                }
                                            }).then(res => {
                                                var com = res.data.data.reverse()
                                                this.setState({
                                                    com
                                                })
                                            })
                                        })

                                    }
                                },
                            ],
                            'default',
                        )}>写评论</span>
                    </div>
                    {
                        this.state.com.map((item, index) => {
                            let time = new Date(Number(item.time))
                            let timeStamp = parseInt(Number(item.time) / 1000)
                            let current = new Date()
                            let currentStamp = parseInt(current.getTime() / 1000)
                            time = time.toLocaleDateString()
                            let moment = currentStamp - timeStamp
                            if (moment < 86400 && moment > 3600) {
                                time = parseInt(moment / 3600) + '小时前'
                            }
                            if (moment < 3600 && moment > 60) {
                                time = parseInt(moment / 60) + '分钟前'
                            }
                            if (moment < 60 && moment > 0) {
                                time = moment + '秒前'
                            }
                            return <div className="content" key={index}>
                                <div className="user">
                                    <img src={item.ava || img} />
                                </div>
                                <div className="username">
                                    <span>{item.name}</span>
                                    <span className="time">{time}</span>
                                </div>
                                <p className="com">
                                    {item.content}
                                </p>
                            </div>
                        })
                    }
                    {/* <div className="content">
                        <div className="user">
                            <img src={img} />
                        </div>
                        <div className="username">
                            <span>{12}</span>
                            <span className="time">刚刚</span>
                        </div>
                        <p className="com">
                            真的甜
                        </p>
                    </div> */}
                </div>
            </div>
        )
    }
}