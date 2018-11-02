import React, { Component } from 'react';
import './App.css';
import Swipers from './components/slider/slider'
import CourserContainer from './components/container/container'
import FooterButtons  from './components/buttons/buttons'
import ProductsInfo from './components/products-introduction/products-introduction'
import Series from'./components/series/series'
import GoodInfo from './components/goodInfo/goodInfo'
import axios from 'axios';
import {ROOT,DEBUG} from './components/common/js/url-config';
import {jsSdkConfig} from './components/common/js/jsSdk'

class App extends Component {
    constructor(){
        super()
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
        axios.get(`${ROOT}/purchase/series.json?id=${this._GetQueryString("id")}&debug=${DEBUG}`).then(res=>{
            if(res.status===200){
                this.setState({
                    seriesInfo: res.data.seriesInfo,
                    loading:true,
                    Fintros:[res.data.seriesInfo.Fintro1,res.data.seriesInfo.Fintro2,res.data.seriesInfo.Fintro3],
                    buyingInfo:{
                        seriesid:res.data.seriesInfo._id.$oid,
                        urltag:'wxyx_groupbuying_series',
                        shareKey:this._GetQueryString('shareKey'),
                        Fprice:res.data.seriesInfo.Fprice,
                        count:res.data.notBuyCount,
                        origPrice:res.data.origPrice,
                        buyPrice:res.data.buyPrice,
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
                        buyPrice:res.data.buyPrice,
                        Fsales:res.data.seriesInfo.Fsales,
                    },
                    idAndShareKey:{
                        id:this._GetQueryString("id"),
                        shareKey:res.data.myShareKey,
                    },
                    hasBonus:res.data.canGetBonus
                });
                jsSdkConfig(this.state.shareData);
            }
        })
    }
    render() {
        if(this.state.loading){
            return (
                <div className="App">
                    <Swipers hasBonus={this.state.hasBonus} idAndShareKey={this.state.idAndShareKey}  lists={this.state.seriesInfo.Fbanner}/>
                    <GoodInfo goodInfo={this.state.goodInfo}  Fsales={this.state.seriesInfo.Fsales}/>
                    <CourserContainer courseLists={this.state.seriesInfo.FgoodsList}/>
                    <ProductsInfo Fintros={this.state.Fintros}/>
                    <Series save={this.state.save} FgoodsList={this.state.seriesInfo.FgoodsList} show={this.state.show} changeParentStatus={this.changeParentStatus.bind(this)}/>
                    <FooterButtons allBuy={this.state.allBuy} buyingInfo={this.state.buyingInfo} changeStatus={this.changeStatus.bind(this)}/>
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
}

export default App;
