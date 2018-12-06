import {connect}  from 'react-redux';
import Series from'../components/series/series'
import {setCarts,modalOpen} from "../actions";
const mapDispatchToProps = dispatch => ({
    onSetCarts: newvalue => dispatch(setCarts(newvalue)),
    setModalOpen:modalopen=>dispatch(modalOpen(modalopen))
})
export default connect(
    mapDispatchToProps
)(Series)
