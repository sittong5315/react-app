import React, { Component } from 'react'
import './JZ.css'
import { Carousel, WingBlank ,Toast} from 'antd-mobile'
export default class item extends Component {
    state = {
        imgHeight: 176,
        banner: [],
        banner2: []
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
            url: "/homeBanner",
            method: 'get',
        }).then(res => {
            var banner = res.data.data
            this.setState({
                banner
            })
        })
    }
    to(a){
        this.props.history.push('/JZlist/'+a)
    }
    back(){
        this.props.history.go(-1)
    }
    render() {
        return (
            <div className="jz">
                <header className="header">
                    <span className="iconfont icon-houtuishangyige" onTouchEndCapture={() => this.back()}></span>
                    <span className="title">找家政</span>
                    <div className="right">
                        <span className="iconfont icon-user"></span>
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

                <div className="type">
                    <div onTouchEndCapture={(a)=>this.to('钟点工')}>
                        <span className="iconfont icon-shijianzhongbiao2"></span>
                        <span className="name">钟点工</span>
                    </div>
                    <div onTouchEndCapture={(a)=>this.to('保姆')}>
                        <span className="iconfont icon-baomu01"></span>
                        <span className="name">保姆</span>
                    </div>
                    <div onTouchEndCapture={(a)=>this.to('月嫂')}>
                        <span className="iconfont icon-baomuyuesao-"></span>
                        <span className="name">月嫂</span>
                    </div>
                    <div onTouchEndCapture={(a)=>this.to('保洁')}>
                        <span className="iconfont icon-richangbaoji"></span>
                        <span className="name">专业保洁</span>
                    </div>
                    <div onTouchEndCapture={(a)=>this.to('家电清洗')}>
                        <span className="iconfont icon-tv"></span>
                        <span className="name">家电清洗</span>
                    </div>
                    <div onTouchEndCapture={(a)=>this.to('家具保养')}>
                        <span className="iconfont icon-shafa"></span>
                        <span className="name">家具保养</span>
                    </div>
                    <div onTouchEndCapture={(a)=>this.to('新居开荒')}>
                        <span className="iconfont icon-fangzi"></span>
                        <span className="name">新居开荒</span>
                    </div>
                    <div onTouchEndCapture={(a)=>this.to('')}>
                        <span className="iconfont icon-gengduo"></span>
                        <span className="name">更多服务</span>
                    </div>
                </div>
                <div className="btm">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576075865918&di=1f289be2e415bd5fd13e64145da01662&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20190831%2Ff31c3240d6e44a55ba563d6b4ab273e0.jpg" alt="" />
                </div>
            </div>
        )
    }
}