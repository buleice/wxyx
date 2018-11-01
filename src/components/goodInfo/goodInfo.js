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
                    <span><span>【21堂记忆力训练课】最强大脑选手教练亲授，开发大脑潜在的记忆能力，高效提升孩子记忆力，成就最强记忆大脑</span></span>
                </div>
                <div>
                    <p>掌握正确的学习方法，比努力更重要</p></div>
                <div className="goodInfo-div">
                    <span  className="price">￥<strong>158.0</strong><span
                        className="sup">现价</span></span>
                    <span className="originprice"><span>原价</span><del className="del">￥198</del></span> <span id="tag">已有238人购买</span>
                </div>
            </div>
        )
    }
}