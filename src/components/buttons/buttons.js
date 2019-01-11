import React, {Component} from 'react';
import {ROOT} from '../common/js/url-config';
import './buttons.css'
import '../common/css/weui.min.css'
import inventory from '../../asserts/inventory.png'
import {wxPay} from '../common/js/jsSdk'

export default class FooterButtons extends Component {
    constructor(props) {
        super(props);
        this.pullUpToPay = this.pullUpToPay.bind(this);
        this.state = {
            isalert: false,
            alertContent: "您好!您还没有选中商品,不能支付的哦!",
            canUseCouon:props.buyingInfo.canUseCouon,
            canclick:true
        }
        this.hideAlert = this.hideAlert.bind(this)
    }
    render() {
        return (
            <div>
                {this.props.allBuy===0?
                (
                <ul className="buttons">
                    <li onClick={this.props.changeStatus}>
                        <div className="lists"><img className="inventory" src={inventory} alt="数量"/><b
                            className="badge">+{this.props.carts.size}</b></div>
                        <div className="total-price">￥<span>{(this.props.totalPrice).toFixed(2)}</span></div>
                    </li>
                    <li onClick={this.pullUpToPay}>购买</li>
                </ul>
                ):
                (<div>{this.props.needAddress?<a href={`/address/index?#/orderpage?id=${this._GetQueryString('id')}`} className="shangKe address">实物商品未填取地址哦！</a>:<a href="/shop/index?#/course" className="shangKe">去上课</a>}</div>)}
                <div className="js_dialog" className={this.state.isalert ? "showAlert" : "hideAlert"}>
                    <div className="weui-mask"></div>
                    <div className="weui-dialog">
                        <div className="weui-dialog__bd">{this.state.alertContent}</div>
                        <div className="weui-dialog__ft">
                            <a className="weui-dialog__btn weui-dialog__btn_primary" onClick={this.hideAlert}>知道了</a>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    hideAlert() {
        this.setState({isalert: false});
    }

    pullUpToPay() {
        if(this.state.canclick){
            this.setState({
                canclick:false
            })
            setTimeout(()=> {
                this.setState({
                    canclick:true
                })
            },2000)
            if(this.props.carts.size>0){
                let filteredCoupons=this.props.userCoupons.filter(item=>{
                    return this.props.totalPrice>=item.spendMoney
                });
                if(filteredCoupons.length>0){
                    this.props.setshowCouponBuy(true);
                    this.props.setCouponBuyFilter(this.props.totalPrice)
                    return
                }
                wxPay(`${ROOT}/pay/weixin/series/prepare.json`, Object.assign({},{goodsids:[...this.props.carts.keys()]},this.props.buyingInfo));
            }else{
                this.setState({
                    isalert:true
                })
            }
        }else{
            return
        }
    }
    _GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return '';
    }
}
