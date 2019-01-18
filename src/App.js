import React, { Component } from 'react';
import './App.css';
import Swipers from './components/slider/slider'
import FooterButtons  from './container/buttons'
import ProductsInfo from './components/products-introduction/products-introduction'
import Series from'./container/series'
import GoodInfo from './components/goodInfo/goodInfo'
import ScroolYToTop from './components/toTop/totop';
import CouponBuy from './container/couponBuy'
import axios from 'axios';
import {ROOT} from './components/common/js/url-config';
import AdPush from './components/push-component/push-component'
import {jsSdkConfig} from './components/common/js/jsSdk'


class App extends Component {
    constructor(props){
        super(props);
        this.state={
            show:false,
            Fintros:[],
            seriesInfo:{},
            loading:false,
            buyingInfo:{},
            myShareKey:'',
            shareData:{},
            save:0
        }
        this._GetQueryString=this._GetQueryString.bind(this)
    }
    changeParentStatus(){
        this.setState({
            show:false
        })
    }
    changeStatus(){
        this.setState({
            show:true
        })
    }
    componentWillMount(){
    this._initPageData()
    }
    componentDidMount(){
        window.addEventListener('popstate', function () {
            this._initPageData()
        }, false);
    }
    render() {
        if(this.state.loading){
            return (
                <div className="App">
                    {this.state.seriesInfo.Fbanner.length>1?(<Swipers  lists={this.state.seriesInfo.Fbanner}/>):(<div className="single-banner"><img src={this.state.seriesInfo.Fbanner[0]} alt="课程图片"/></div>)}
                    <GoodInfo hasBonus={this.state.hasBonus} idAndShareKey={this.state.idAndShareKey} goodInfo={this.state.goodInfo}  Fsales={this.state.seriesInfo.Fsales}/>
                    <Series FgoodsList={this.state.seriesInfo.FgoodsList} show={this.state.show} changeParentStatus={this.changeParentStatus.bind(this)}/>
                    <ProductsInfo Fintros={this.state.Fintros} Fvideo={this.state.Fvideo}/>
                    <CouponBuy buyingInfo={this.state.buyingInfo}></CouponBuy>
                    <FooterButtons allBuy={this.state.allBuy} buyingInfo={this.state.buyingInfo}/>
                    <ScroolYToTop/>
                    <AdPush couponSent={this.state.couponSent}></AdPush>
                </div>
            );
        }else{
            return (<div className="loading-mask" id="loadingDiv">
                <div className="loader">
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square last"></div>
                    <div className="square clear"></div>
                    <div className="square"></div>
                    <div className="square last"></div>
                    <div className="square clear"></div>
                    <div className="square "></div>
                    <div className="square last"></div>
                </div>
            </div>)
        }
    }
    _GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return '';
    }
    _initPageData(){
        axios.get(`${ROOT}/purchase/series.json?id=${this._GetQueryString("id")}`).then(res=>{
            if(res.status===200){
                let pageData=res.data;
                this.props.setPageData(res.data)
                this.props.setUserCoupons(pageData.coupons)
                this.setState({
                    seriesInfo: res.data.seriesInfo,
                    loading:true,
                    Fintros:[res.data.seriesInfo.Fintro1,res.data.seriesInfo.Fintro2,res.data.seriesInfo.Fintro3],
                    buyingInfo:{
                        seriesid:res.data.seriesInfo._id.$oid,
                        urltag:'wxyx_groupbuying_series',
                        shareKey:this._GetQueryString('shareKey'),
                        canUseCouon:pageData.coupons.length>0?true:false,
                        orderExpress_id:pageData.orderExpress_id,
                        needAddress:pageData.needAddress===1?true:false
                    },
                    shareData:{
                        FshareTitle:res.data.seriesInfo.FshareTitle,
                        FshareIcon:res.data.seriesInfo.FshareIcon,
                        FshareContent:res.data.seriesInfo.FshareContent,
                        myShareKey:res.data.myShareKey,
                        buyingId:this._GetQueryString("id")
                    },
                    save:res.data.save,
                    allBuy:res.data.allBuy,
                    goodInfo:{
                        Fsubtitle:res.data.seriesInfo.Fsubtitle,
                        Ftitle:res.data.seriesInfo.Ftitle,
                        origPrice:res.data.origPrice,
                        buyPrice:res.data.seriesPrice,
                        Fsales:res.data.seriesInfo.Fsales,
                        Number:res.data.seriesInfo.FgoodsList.length,
                        tag:res.data.seriesInfo.Flabel,
                    },
                    idAndShareKey:{
                        id:this._GetQueryString("id"),
                        shareKey:res.data.myShareKey,
                    },
                    hasBonus:res.data.canGetBonus,
                    Fvideo:res.data.seriesInfo.Fvideo,
                    couponSent:pageData.couponSent,
                });
                jsSdkConfig(this.state.shareData);

            }
        })
    }
}

export default App;
