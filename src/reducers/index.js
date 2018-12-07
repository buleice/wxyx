import {combineReducers} from 'redux'
import {carts,totalPrice} from "./cartsReducer";
export default combineReducers({
    carts,totalPrice
})
