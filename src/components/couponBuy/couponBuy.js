import React,{Component} from 'react';
import './couponBuy.scss'
import {wxPay} from "../common/js/jsSdk";
import {ROOT} from "../common/js/url-config";

export default class CouponBuy extends Component{
   constructor(props){
       super(props);
       this.state={
           couponBuy:true,
           canclick:true
       }
   }
    payByclickCoupon(id) {
        this.pullUpToPay(id);
    }
    payByClickButton() {
        // let id=this.props.userCoupons[0].id;
        this.pullUpToPay("");
    }
    pullUpToPay(couponid) {
       if(this.state.canclick){
           this.setState({
               canclick:false
           })
           setTimeout(()=> {
               this.setState({
                   canclick:true
               })
           },2000)
           wxPay(`/pay/weixin/series/prepare.json`, Object.assign({},{goodsids:[...this.props.carts.keys()],couponid:couponid},this.props.buyingInfo));
       }else{
           return
       }
    }
    render(){
        let filteredCoupons=this.props.userCoupons.filter(item=>{
            return this.props.couponBuyFilter>=item.spendMoney
        });
        return(
            <div>
                {this.props.showCouponBuy&&<div className="show-cover-mask" onClick={()=>{this.props.setshowCouponBuy(false)}}></div>}
                {
                    this.props.showCouponBuy && (<div className={'buyStyle-options'}>
                        <div className={"select-info"}>您有{filteredCoupons.length}张可用优惠券 <img src="//wxyx.youban.com/img/delete.png"
                                                                       alt="close" onClick={()=>{this.props.setshowCouponBuy(false)}}/></div>
                        <ul className={"coupons-can-select"}>
                            { filteredCoupons.map((item,index)=><li className={'coupon'}  onClick={() => this.payByclickCoupon(item.id)} key={index}>
                            <ul className={"left"}>
                                <li><span>￥</span><span>{item.couponMoney}</span></li>
                                <li>满{item.spendMoney}元可用</li>
                            </ul>
                            <ul className={"middle"}>
                                <li>{item.name}</li>
                                {/*<li></li>*/}
                                <li>有效期至:{item.expiration}</li>
                            </ul>
                            <div className={"right"}>
                                <span>使用</span>
                                <img src="//udata.youban.com/webimg/wxyx/puintuan/discount1.png" alt=""/>
                            </div>
                        </li>)}
                        </ul>
                        <div className={'coupons-buy'} onClick={() => this.payByClickButton()}>直接支付 <span>￥</span><span>{this.props.couponBuyFilter.toFixed(2)}</span></div>
                    </div>)
                }
            </div>
        )
    }
}
