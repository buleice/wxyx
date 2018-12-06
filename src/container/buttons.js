import {connect}  from 'react-redux';
import FooterButtons from '../components/buttons/buttons'

const mapStateToProps = (state, ownProps) => ({
    carts: state.carts,
})

export default connect(
    mapStateToProps,
)(FooterButtons)
