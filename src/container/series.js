import {connect}  from 'react-redux';
import Series from'../components/series/series'
import {setCarts,modalOpen,totalPrice} from "../actions";
const mapDispatchToProps = (dispatch,ownProps)=> ({
    onSetCarts: newvalue => dispatch(setCarts(newvalue)),
    setModalOpen:modalopen=>dispatch(modalOpen(modalopen)),
    calTotalPrice:totalprice=>dispatch(totalPrice(totalprice))
})


export default connect(
    mapDispatchToProps
)(Series)
