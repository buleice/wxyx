import React,{Component} from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './buttons.css'

export default class FooterButtons extends Component{
  constructor(props){
    super(props);
    this.state={
      price:100,
      count:4,
    }
  }
  render(){
    return(<ul className="buttons">
        <li><img src="" alt="数量"/><span>100</span></li>
        <li>购买</li>
    </ul>)
  }
}
