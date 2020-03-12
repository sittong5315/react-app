import React, { Component } from 'react'
import './JJ.css'
import { Carousel, WingBlank ,Toast} from 'antd-mobile'
export default class item extends Component {
    state = {
        banner: [],
        banner2: [],
        top:[],
        imgHeight: 176,
    }
    componentWillMount(){
        Toast.loading('Loading',1)
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                // data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
        this.$axios({
            url: "/teacherBanner",
            method: 'get',
        }).then(res => {
            var banner = res.data.data
            this.setState({
                banner
            })
        })
        this.$axios({
            url: "/teacherTop",
            method: 'get',
        }).then(res => {
            var top = res.data.data
            this.setState({
                top
            })
        })
    }
    back(){
        this.props.history.go(-1)
    }
    render() {
        return (
            <div className="jj">
                <header className="header">
                    <span className="iconfont icon-houtuishangyige" onTouchEndCapture={()=>this.back()}></span>
                    <span className="title">找家教</span>
                    <div className="right">
                        <span className="iconfont icon-dingwei"></span>
                        成都
                    </div>
                </header>
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

                <div className="center">
                    <div className="left">
                        <span className="iconfont icon-iconset0392"></span>
                        <h3>周边老师</h3>
                        <p>发现周边好老师</p>
                    </div>
                    <div className="right">
                        <span className="iconfont icon-qa"></span>
                        <h3>我要提问</h3>
                        <p>难题名师教你解</p>
                    </div>
                </div>
                <div className="type">
                    <div>
                        <span className="iconfont icon-xiaoxue-copy xiaoxue"></span>
                        <span className="title">小学</span>
                    </div>
                    <div>
                        <span className="iconfont icon-shu"></span>
                        <span className="title">初中</span>
                    </div>
                    <div>
                        <span className="iconfont icon-boshihouchuzhanshenqing
"></span>
                        <span className="title">高中</span>
                    </div>
                    <div>
                        <span className="iconfont icon-aixin"></span>
                        <span className="title">兴趣</span>
                    </div>
                </div>
                <p className="top">top排行榜</p>
                <div className="bottom">
                    {/* <div>
                        <img src={jj1} className="img1"/>
                        <p>已报名27人</p>
                        <div className="teacherimg">
                        <img src={jj1} className="img2"/>
                        </div>
                    </div> */}
                    {
                        this.state.top.map(item=>{
                            return <div key={item.id}>
                        <img src={item.img} className="img1"/>
                        <p>已报名{item.num}人</p>
                        <div className="teacherimg">
                        <img src={item.teacherImg} className="img2"/>
                        </div>
                    </div>
                        })
                    }
                </div>
            </div>
        )
    }
}