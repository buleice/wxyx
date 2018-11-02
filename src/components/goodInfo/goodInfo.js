import React,{Component} from 'react'
import './goodInfo.css'
export default class GoodInfo extends Component{
    // constructor(props){
    //     super(props)
    // }

    render(){
        return(
            <div className="ad-banner">
                <div className="title">
                    <span><span dangerouslySetInnerHTML={{__html:this.props.goodInfo.Ftitle}}></span></span>
                </div>
                <div>
                    <p dangerouslySetInnerHTML={{__html:this.props.goodInfo.Fsubtitle}}></p></div>
                <div className="goodInfo-div">
                    <span  className="price">￥<strong>{this.props.goodInfo.buyPrice}</strong><span
                        className="sup">现价</span></span>
                    <span className="originprice"><span>原价</span><del className="del">￥{this.props.goodInfo.origPrice}</del></span> <span id="tag">已有{this.props.goodInfo.Fsales}人购买</span>
                </div>
            </div>
        )
    }
}