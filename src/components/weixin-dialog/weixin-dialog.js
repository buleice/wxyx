import React, {Component} from 'react';
import './weixin-dialog.scss';

class PromptDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            this.props.showAlertDialog ?
                (
                    <div className="alert_dialog">
                        <div className="weui-mask"></div>
                        <div className="weui-dialog">
                            <div className="weui-dialog__bd"></div>
                            <div className="weui-dialog__ft">
                                <a className="weui-dialog__btn weui-dialog__btn_primary">知道了</a>
                            </div>
                        </div>
                    </div>
                )
                :
                null
        )
    }
}

// PromptDialog.proopTypes = {
//     loop: PropTypes.bool,
//     autoPlay: PropTypes.bool,
//     interval: PropTypes.number,
//     showDot: PropTypes.bool,
//     click: PropTypes.bool,
//     threshold: PropTypes.number,
//     speed: PropTypes.number,
// }
PromptDialog.defaultProps = {
    promptTitle: '温馨提示',
    cancleText: '取消',
    okText: '确定',
}

export default PromptDialog
