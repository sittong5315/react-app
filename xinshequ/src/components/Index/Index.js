import React, { Component } from 'react'
import './Index.css'
import store from '../../store/index'
import { Drawer, Carousel, WingBlank ,Toast} from 'antd-mobile'
import { NavLink } from 'react-router-dom'
import peixun from '../../assets/img/peixun.png'
import shui from '../../assets/img/shui.png'
import ren from '../../assets/img/ren.png'
import weixiu from '../../assets/img/weixiu.png'
import saoba from '../../assets/img/saoba.png'
import dian from '../../assets/img/dian.png'
export default class item extends Component {
    state = {
        open: false,
        banner: [],
        banner2: [],
        imgHeight: 176,
        user: {}
    }
    onOpenChange = () => {
        this.setState({ open: !this.state.open });
    }
    componentWillMount(){
        Toast.loading('Loading',1)
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                // data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
        this.$axios({
            url: "/banner",
            method: 'get',
        }).then(res => {
            var banner = res.data.data
            this.setState({
                banner
            })
        })
        this.setState({
            user: store.getState().user
        }, () => {
            this.$axios({
                url: "/findUser",
                method: 'post',
                data: {
                    name: this.state.user.name
                }
            }).then(res => {
                var user = res.data.data[0]
                this.setState({
                    user
                })
            })
        })
    }
    to(a) {
        this.props.history.push(a)
    }
    exit() {
        store.dispatch({
            type: "login",
            payload: this.state.user
        })
        this.props.history.push('/login')
        Toast.success('退出成功',1)
    }
    render() {
        const sidebar =
            <div className="side-bar">
                <div className="user" onTouchEndCapture={()=>this.to('/user')}>
                    <img src={this.state.user.img || 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4032559627,468761459&fm=26&gp=0.jpg'} />
                    <p className="username">{this.state.user.name}</p>
                </div>
                <div className="left-nav">
                    <span className="iconfont icon-shui"></span>
                    <NavLink to='/jj' activeClassName='select'>找家教</NavLink>
                </div>
                <div className="left-nav">
                    <span className="iconfont icon-tv"></span>
                    <NavLink to='/repair' activeClassName='select'>维修服务</NavLink>
                </div>
                <div className="left-nav">
                    <span className="iconfont icon-saoba"></span>
                    <NavLink to='/jz' activeClassName='select'>家政服务</NavLink>
                </div>
                <div className="left-nav">
                    <span className="iconfont icon-yinle"></span>
                    <a href="">社区互动</a>
                </div>
                <div className="left-nav">
                    <span className="iconfont icon-xiaoxi"></span>
                    <a href="">消息中心</a>
                </div>
                <div className="left-nav">
                    <span className="iconfont icon-collection"></span>
                    <a href="">我的收藏</a>
                </div>
                <div className="left-nav">
                    <span className="iconfont icon-fabu"></span>
                    <a href="">我的发布</a>
                </div>
                <div className="left-nav">
                    <span className="iconfont icon-user"></span>
                    <NavLink to='/repass' activeClassName='select'>修改密码</NavLink>
                </div>
                <div className="exit">
                    <span className="iconfont icon-gongxiangtubiaozhuangtaileicaozuolei59"></span>
                    <span onTouchEndCapture={() => this.exit()}>退出登录</span>
                </div>
            </div>

        return (
            <div className="index">
                <header className="header">
                    <span className="iconfont icon-caidan" onTouchEndCapture={this.onOpenChange}></span>
                    <span className="title">龙山家园</span>
                    <div className="right">
                        <span className="iconfont icon-user" onTouchEndCapture={()=>this.to('/user')}></span>
                    </div>
                </header>
                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    touch={true}
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                    <div className="search">
                        <input type="text" className="searchbar" placeholder="Search" />
                        <span className="iconfont icon-sousuo"></span>
                        <button className="release">我要发布</button>
                    </div>
                    <div className="carousel">
                        <WingBlank>
                            <Carousel
                                autoplay={true}
                                infinite
                            >
                                {this.state.banner.map(item => (
                                    <a
                                        key={item.id}
                                        href="http://www.baidu.com"
                                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                        className="banner"
                                    >
                                        <img
                                            src={item.img}
                                            alt=""
                                            style={{ width: '100%', verticalAlign: 'top' }}
                                            onLoad={() => {
                                                window.dispatchEvent(new Event('resize'));
                                                this.setState({ imgHeight: 'auto' });
                                            }}
                                        />
                                    </a>
                                ))}
                            </Carousel>
                        </WingBlank>
                    </div>
                    <div className="weather">
                        <span className="iconfont icon-icon- icon-weather"></span>
                        <div className="weather-content">
                            <p>多云/小雨 27/30°C</p>
                            <p>3-4级/4-5级风</p>
                        </div>
                        <div className="date">
                            <p className="date-date">星期一</p>
                            <p className="time">18:00</p>
                        </div>
                    </div>
                    <div className="bottom-nav">
                        <div onTouchEndCapture={(a) => this.to('/jj')}>
                            <div className="inner">
                                <img src={peixun} alt="" />
                                <span>找家教</span>
                            </div>
                        </div>
                        <div onTouchEndCapture={(a) => this.to('/water')}>
                            <div className="inner shui">
                                <img src={shui} alt="" />
                                <span>送水到家</span>
                            </div>
                        </div>
                        <div onTouchEndCapture={(a) => this.to('/repair')}>
                            <div className="inner weixiu">
                                <img src={weixiu} alt="" />
                                <span>维修服务</span>
                            </div>
                        </div>
                        <div onTouchEndCapture={(a) => this.to('/jz')}>
                            <div className="inner jz">
                                <img src={saoba} alt="" className="jzimg" />
                                <span>家政服务</span>
                            </div>
                        </div>
                        <div>
                            <div className="inner hudong">
                                <img src={ren} alt="" />
                                <span>社区互动</span>
                            </div>
                        </div>
                        <div>
                            <div className="inner fuwu">
                                <img src={dian} alt="" />
                                <span>更多服务</span>
                            </div>
                        </div>
                    </div>
                </Drawer>
            </div>
        )
    }
}