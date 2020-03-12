import React, { Component } from 'react'
import './Water.css'
import { Toast} from 'antd-mobile'
// import store from '../../store/index'
// import img from '../../assets/img/water.png'
export default class item extends Component {
    state = {
        water: [],
        score:[],
        star:['','','','','']
    }
    componentWillMount(){
        Toast.loading('Loading',1)
    }
    componentDidMount() {
        this.$axios({
            url: "/findWater",
            method: 'get',
        }).then(res => {
            var water = res.data.data
            res.data.data.map(item => {
                this.state.score.push(item.score)
            })
            this.setState({
                water
            })
        })
    }
    to(id) {
        this.props.history.push('/waterdetail/' + id)
    }
    back(){
        this.props.history.go(-1)
    }
    render() {
        return (
            <div className="water">
                <header className="header">
                    <span className="iconfont icon-houtuishangyige" onTouchEndCapture={()=>this.back()}></span>
                    <span className="title">送水到家</span>
                </header>

                <div className="type">
                    <div>
                        水站
                    </div>
                    <div>
                        区域
                    </div>
                    <div>
                        智能排序
                    </div>
                </div>


                <ul className="water-list">
                    {/* <li>
                        <div className="left">
                            <img src={img}/>
                        </div>
                        <div className="center">
                            <div>
                                <span className="title">农夫山泉</span>
                            </div>
                            <div>
                                <span className="des">用一份良心，送一份纯净，农夫山泉，老百姓最放心的桶装水</span>
                            </div>
                            <div>
                                <span className="iconfont icon-dingwei"></span>
                                <span className="address">力宝大厦北区3楼中公教育</span>
                            </div>
                        </div>
                        <div className="right">
                            <span className="iconfont icon-dianhua"></span>
                            <p className="len">200米</p>
                        </div>
                    </li> */}
                    {
                        this.state.water.map((item,idx) => {
                            return <li key={item.id}>
                                <div className="left">
                                    <img src={item.img} />
                                </div>
                                <div className="center" onTouchEndCapture={(id) => this.to(item.id)}>
                                    <div>
                                        <span className="title">{item.name}</span>
                                        {
                                            this.state.star.map((i, index) => {
                                                var score = this.state.score[idx]
                                                return <span className="iconfont icon-xingxing" key={index} style={{ color: (score >= index + 1 ? '#ff6600' : '#ccc') }}></span>
                                            })
                                        }
                                        {/* <span className="iconfont icon-xingxing"></span> */}
                                    </div>
                                    <div>
                                        <span className="des">{item.des}</span>
                                    </div>
                                    <div className="address-div">
                                        <span className="iconfont icon-dingwei1"></span>
                                        <span className="address">{item.address}</span>
                                    </div>
                                </div>
                                <div className="right">
                                    <span className="iconfont icon-dianhua"></span>
                                    <p className="len">{item.len}</p>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}