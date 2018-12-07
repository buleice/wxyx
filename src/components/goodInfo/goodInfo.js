import React,{Component} from 'react'
import './goodInfo.css';
import peopleIcon from '../../asserts/人物拷贝.png';
import numberIcon from '../../asserts/数量榜.png';
import tagIcon from '../../asserts/标签.png'
export default class GoodInfo extends Component{
    render(){
        let {Number,Fsales,buyPrice,origPrice,tag,Ftitle,Fsubtitle}=this.props.goodInfo;
        const tags=tag.split('/')
        return(
            <div className="sad-banner">
                <div className="title">
                    <span><span dangerouslySetInnerHTML={{__html:Ftitle}}></span></span>
                </div>
                <div>
                    <p dangerouslySetInnerHTML={{__html:Fsubtitle}}></p></div>
                <ul className="goodInfo-div">
                    <li className={'labels'}>
                        <img src={numberIcon} alt=""/><span>{Number}</span>
                        <img src={peopleIcon} alt=""/><span>{Fsales}</span>
                        <img src={tagIcon} alt=""/>{tags.map((item,index)=><span className={"spanlabel"} key={index}>{item}</span>)}
                    </li>
                    <li className={'prices'}>
                        <span className="originprice"><del className="del">￥{origPrice}</del></span>
                        <span   className={`price ${this.props.goodInfo.buyPrice===0? 'price-hidden':''}`}>￥<strong>{buyPrice}</strong></span>
                    </li>
                </ul>
                {this.props.hasBonus===1&&<a href={`/groupbuying/poster?shareKey=${this.props.idAndShareKey.shareKey}&id=${this.props.idAndShareKey.id}`} className='bonus_entry'><img src="//udata.youban.com/webimg/wxyx/puintuan/bonus.gif" alt="奖学金"/></a>}

            </div>
        )
    }
}
