import React, {Component} from 'react'
import CSSModules from 'react-css-modules';
import timeIcon from '../../asserts/课时(1).png';
import peopleIcon from '../../asserts/人物拷贝.png';
import catalogueIcon from '../../asserts/目录.png'
import styles from './series.css'
import {setCarts,totalPrice} from "../../actions";
import {Calculation} from '../common/js/process'

class Series extends Component {
    constructor(props){
        super(props);
        this.state={
            goodsList:new Map()
        }
    }
    componentDidMount(){
        let tempMap=new Map();
        let filterList=this.props.FgoodsList.filter((item,index)=>{
            return item.haveBuy==0;
        })
        filterList.map(item=>{
            tempMap.set(item.id,item);
        })
        this.setState({
            goodsList:tempMap
        })
        this.props.dispatch(setCarts(tempMap))
        this.calculatePrice(tempMap)
    }
    handleCart(courseId,goods,e){
        // e.nativeEvent.stopImmediatePropagation();
        // e.stopPropagation();
        let usercart=this.state.goodsList;
        if(usercart.size>0){
            if(usercart.has(courseId)){
                usercart.delete(courseId)
                this.setState({
                    goodsList:usercart
                })
                this.props.dispatch(setCarts(usercart))
            }else {
                usercart.set(courseId,goods)
                this.setState({
                    goodsList:usercart
                })
                this.props.dispatch(setCarts(usercart))
            }
        } else{
            usercart=new Map().set(courseId,goods)
            this.setState({
                goodsList:usercart
            })
            this.props.dispatch(setCarts(usercart))

        }
        this.calculatePrice(usercart)
    }

    calculatePrice(goodsList){
        let goodslist=goodsList;
        let totalprice=0;
        if(goodslist.size===0){
            this.props.dispatch(totalPrice(0))
        }else if(goodslist.size===1){
            goodslist.forEach(function(value, key, map) {
                totalprice=Calculation("add",totalprice,Number(value.oriprice))
            });
        }else{
            goodslist.forEach(function(value, key, map) {
                totalprice=Calculation("add",totalprice,Number(value.price))
            });
        }
        this.props.dispatch(totalPrice(totalprice))
    }
    hrefTo(id,e){
        if(e.target&&e.target.matches('input')){
            return;
        }else{
            window.location.href= `/purchase/index?id=${id}`
        }

    }

    render() {
        return (
            <div>
                <hr className="divide"/>
                <div className="series-container">
                    <div className="header">
                        <img src={catalogueIcon} alt=""/>
                        <span className="title">系列内容</span>
                    </div>
                    <ul className="series-body">
                        {
                            this.props.FgoodsList.map((goods, index) => <li className="single-course" onClick={(e)=>this.hrefTo(goods.id,e)} key={index}>
                                    <img className="course-img" src={goods.img} alt="图片"/>
                                    <div className="course-other">
                                        <div>
                                            <b>{goods.title}</b>
                                            <div className="course-info"><img src={timeIcon} alt=""/><span>{goods.number}</span><img src={peopleIcon} alt=""/><span>{goods.sales}</span></div>
                                        </div>
                                        {
                                            goods.haveBuy === 0 ?
                                                (<div className={"clickbox"} onClick={(e)=>{e.stopPropagation()}}>
                                                        <input type="checkbox"  defaultChecked className="checkbox" id={`checkbox${index}`}/>
                                                        <label htmlFor={`checkbox${index}`} onClick={()=>this.handleCart(goods.id,goods)}  className='cb-label'></label>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className={"clickbox"}><span className="hasBought">已购买</span></div>
                                                )
                                        }
                                    </div>
                            </li>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default CSSModules(Series, styles);
