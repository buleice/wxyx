import React,{Component} from 'react';
import {ROOT} from '../common/js/url-config';
// import { CSSTransitionGroup } from 'react-transition-group';
import './buttons.css'
import inventory from '../../asserts/inventory.png'
import {wxPay} from '../common/js/jsSdk'

export default class FooterButtons extends Component{
  constructor(props){
    super(props);
    this.pullUpToPay=this.pullUpToPay.bind(this);
  }

  render(){
    return(
        this.props.allBuy===0?( <ul className="buttons">
            <li onClick={this.props.changeStatus}><div className="lists"><img className="inventory" src={inventory} alt="数量"/><b
                className="badge">+{this.props.buyingInfo.count}</b></div><div  className="total-price"><span className="group-text">组合价  </span>￥<span>{this.props.buyingInfo.Fprice}</span></div></li>
            <li onClick={this.pullUpToPay}>购买</li>
        </ul>):(<a href="/shop/index" className="shangKe">去上课</a>)
    )
  }
  pullUpToPay(){
      wxPay(`${ROOT}/pay/weixin/series/prepare.json`,this.props.buyingInfo);
  }
}
