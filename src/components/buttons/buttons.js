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
                (<a href="/shop/index?source=mine" className="shangKe">去上课</a>)}
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
        if(this.props.carts.size>0){
            wxPay(`${ROOT}/pay/weixin/series/prepare.json`, Object.assign({},{goodsids:[...this.props.carts.keys()]},this.props.buyingInfo));
        }else{
            this.setState({
                isalert:true
            })
        }
    }
}
