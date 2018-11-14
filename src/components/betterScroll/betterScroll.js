import React, {Component} from 'react';
import {addClass} from '../common/js/dom';
import BScroll from 'better-scroll';
import PropTypes from 'prop-types';
class Carousel extends Component{
    constructor(props){
    super(props);
    this.myRef = React.createRef();
    this.state={
        dots: [],
        currentPageIndex: 0,
    }
  }

  componentDidMount(){

  }
  render(){
    return(
        <div className="slide" ref={slide => this.slide = slide}>
            <div className="slide-group" ref={slideGroup => this.slideGroup = slideGroup}>
                {this.props.children}
            </div>
            <div className={`dots ${this.props.showDots? 'showDots':'hideDots'}`}>
                {
                    this.state.dots.map((dot,index)=><span className={`dots ${this.state.currentPageIndex==index? 'active':''}`}></span>)
                }
            </div>
        </div>
    )
  }

}
Carousel.proopTypes={
    loop:PropTypes.bool,
    autoPlay:PropTypes.bool,
    interval:PropTypes.number,
    showDot:PropTypes.bool,
    click:PropTypes.bool,
    threshold:PropTypes.number,
    speed:PropTypes.number,
}
Carousel.defaultProps={
    loop:true,
    autoPlay:true,
    interval:4000,
    showDot:true,
    click:true,
    threshold:0.3,
    speed:400,
}
export default Carousel;
