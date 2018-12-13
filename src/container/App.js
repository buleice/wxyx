import {connect}  from 'react-redux';
import App from '../App'
import {userCoupons} from "../actions";
const mapDispatchToProps = dispatch => ({
    setUserCoupons:coupons=>dispatch(userCoupons(coupons)),
})
const mapStateToProps = (state, ownProps) => ({
    userCoupons:state.userCoupons
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
