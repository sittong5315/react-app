import React, { Component } from 'react'
import './WaterDetail.css'
import { Modal,Toast } from 'antd-mobile'
import img from '../../assets/img/water.png'
import store from '../../store/index'
export default class item extends Component {
    state = {
        water: {},
        id: '',
        shortAdd: '',
        star: ['', '', '', '', ''],
        comment: [],
        name: ''
    }
    componentWillMount(){
        Toast.loading('Loading',1)
    }
    componentDidMount() {
        var id = this.props.match.params.id;
        this.setState({
            id
        }, () => {
            this.$axios({
                url: '/findWater',
                method: 'get',
                params: {
                    id: this.state.id
                }
            }).then(res => {
                var water = res.data.data[0]
                this.setState({
                    water
                }, () => {
                    var shortAdd = this.state.water.address.slice(0, 2)
                    this.setState({
                        shortAdd
                    })
                })
            })
            this.$axios({
                url: '/findComment',
                method: 'get',
                params: {
                    waterId: this.state.id
                }
            }).then(res => {
                var comment = res.data.data.reverse()
                this.setState({
                    comment
                })
            })
        })


    }

    back() {
        this.props.history.go(-1)
    }
    render() {
        const prompt = Modal.prompt;
        return (
            <div className="waterdetail">
                <header className="header">
                    <span className="iconfont icon-houtuishangyige" onTouchEndCapture={() => this.back()}></span>
                    <span className="title">详细</span>
                    <div className="right">
                        <span className="iconfont icon-user"></span>
                    </div>
                </header>
                <div className="title">
                    <div className="left">
                        <img src={this.state.water.img} />
                    </div>
                    <div className="right">
                        <div>
                            <span className="title-title">{"【" + this.state.shortAdd + "】" + this.state.water.name}</span>
                        </div>
                        <div className="score">
                            {
                                this.state.star.map((item, index) => {
                                    return <span className="iconfont icon-xingxing" key={index} style={{ color: (this.state.water.score >= index + 1 ? '#ff6600' : '#ccc') }}></span>
                                })
                            }
                            <span className="count">月售{this.state.water.count}桶</span>
                        </div>
                        <div className="third">
                            <span className="price">￥{this.state.water.price}</span>
                            <span>/桶</span>
                        </div>
                        <div className="title-bottom">
                            <span className="iconfont icon-dianzan"></span><span className="likenum">{this.state.water.likeNum}</span>
                            <span className="readnum">浏览数:{this.state.water.readNum}</span>
                        </div>
                    </div>
                </div>
                <div className="address">
                    <div className="left">
                        <div className="len">
                            <span className="iconfont icon-dingwei1"></span>
                            <span>{this.state.water.len}</span>
                        </div>
                        <div className="add">
                            {this.state.water.address}
                        </div>
                    </div>
                    <div className="right">
                        <span className="iconfont icon-dianhua"></span>
                    </div>
                </div>
                <div className="msg">
                    <div className="msg-title">
                        商家信息
                    </div>
                    <div className="content">
                        {this.state.water.des}
                    </div>
                </div>
                <div className="comment">
                    <div className="title">
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
                                            url: '/addComment',
                                            method: 'get',
                                            params: {
                                                username: store.getState().user.name,
                                                waterId: this.state.id,
                                                content: content,
                                                time: new Date().getTime()
                                            }
                                        }).then(res => {
                                            this.$axios({
                                                url: '/findComment',
                                                method: 'get',
                                                params: {
                                                    waterId: this.state.id
                                                }
                                            }).then(res => {
                                                var comment = res.data.data.reverse()
                                                this.setState({
                                                    comment
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
                        this.state.comment.map((item, index) => {
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
                                <div className="right">
                                    <div className="username">
                                        <span>{item.name}</span>
                                        <span className="time">{time}</span>
                                    </div>
                                    <p className="com">
                                        {item.content}
                                    </p>
                                </div>
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