import React, {Component} from 'react'
import './products-introduction.css'

export default class ProductsInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intro: 0,
        }
    }

    handleClick(index) {
        this.setState({
            intro: index
        })
    }

    render() {
        return (
            <div>
                {this.props.Fvideo!=="" && (<nav className="nav" id="nav">
                    <ul className="con">
                        <li onClick={this.handleClick.bind(this, 0)} className={this.state.intro === 0 ? 'chosen' : ''}>
                            <a className={this.state.intro === 0 ? 'chosen' : ''}>课程介绍 </a></li>
                        <li onClick={this.handleClick.bind(this, 1)} className={this.state.intro === 1 ? 'chosen' : ''}>
                            <a className={this.state.intro === 1 ? 'chosen' : ''}>免费体验</a></li>
                    </ul>
                </nav>)}
                {this.state.intro==0 ? (<div className="introduction">
                    <div dangerouslySetInnerHTML={{__html: this.props.Fintros[0]}}></div>
                    <div dangerouslySetInnerHTML={{__html: this.props.Fintros[1]}}></div>
                    <div dangerouslySetInnerHTML={{__html: this.props.Fintros[2]}}></div>
                </div>) : (
                    <div className="experience">
                        <video src={this.props.Fvideo}
                               x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-playsinline=""
                               playsinline=""
                               wekit-playsinline="" preload="auto"
                               controls="controls"></video>
                    </div>
                )}
            </div>
        )
    }
}
