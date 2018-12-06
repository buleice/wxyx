import React, {Component} from 'react'
import CSSModules from 'react-css-modules';
import timeIcon from '../../asserts/课时(1).png';
import peopleIcon from '../../asserts/人物拷贝.png';
import catalogueIcon from '../../asserts/目录.png'
import styles from './series.css'
import {setCarts} from "../../actions";

class Series extends Component {
    constructor(props){
        super(props);
        this.state={
            usercart:new Set()
        }
    }
    componentDidMount(){
        let tempArr=[]
        let filterList=this.props.FgoodsList.filter((item,index)=>{
            return item.haveBuy==0;
        })
        filterList.map(item=>{
            tempArr.push(item.id);
        })
        this.setState({
            usercart:new Set(tempArr)
        })
    }
    handleCart(courseId){
        // this.props.onSetCarts("")
        let usercart=this.state.usercart;
        if(usercart.size>0){
            if(usercart.has(courseId)){
                usercart.delete(courseId)
                this.setState({
                    carts:usercart
                })
                // this.props.onSetCarts(usercart)
            }else {
                usercart.add(courseId)
                this.setState({
                    carts:usercart
                })
                // this.props.setCarts(carts)
            }
        }else{
            this.setState({
                carts:new Set().add(courseId)
            })
            // this.props.setCarts(new Set().add(courseId))
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
                            this.props.FgoodsList.map((goods, index) => <li className="single-course" key={index}>
                                <img className="course-img" src={goods.img} alt="图片"/>
                                <div className="course-other">
                                    <div>
                                        <b>{goods.title}</b>
                                        <div className="course-info"><img src={timeIcon} alt=""/><span>共{goods.number}课时</span><img src={peopleIcon} alt=""/><span>1234</span></div>
                                    </div>
                                    {
                                        goods.haveBuy === 0 ?
                                        (<div>
                                                <input type="checkbox"  defaultChecked className="checkbox" id={`checkbox${index}`}/>
                                                <label htmlFor={`checkbox${index}`} onClick={this.handleCart.bind(this,goods.id)} className='cb-label'></label>
                                            </div>
                                        )
                                        :
                                        (
                                            <div><span className="hasBought">已购买</span></div>
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
