import React,{Component} from 'react'
import './goodInfo.css'
export default class GoodInfo extends Component{
    render(){
        return(
            <div className="sad-banner">
                <div className="title">
                    <span><span dangerouslySetInnerHTML={{__html:this.props.goodInfo.Ftitle}}></span></span>
                </div>
                <div>
                    <p dangerouslySetInnerHTML={{__html:this.props.goodInfo.Fsubtitle}}></p></div>
                <div className="goodInfo-div">
                    <span   className={`price ${this.props.goodInfo.buyPrice===0? 'price-hidden':''}`}>￥<strong>{this.props.goodInfo.buyPrice}</strong><span
                        className="sup">现价</span></span>
                    <span className="originprice"><span>原价</span><del className="del">￥{this.props.goodInfo.origPrice}</del></span> <span id="tag">已有{this.props.goodInfo.Fsales}人购买</span>
                </div>
                {this.props.hasBonus===1&&<a href={`/groupbuying/poster?shareKey=${this.props.idAndShareKey.shareKey}&id=${this.props.idAndShareKey.id}`} className='bonus_entry'><img src="//udata.youban.com/webimg/wxyx/puintuan/bonus.gif" alt="奖学金"/></a>}

            </div>
        )
    }
}
