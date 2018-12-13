import {combineReducers} from 'redux'
import {
    carts, totalPrice, showCouponBuy, couponBuyFilter, userCoupons
} from "./cartsReducer";

export default combineReducers({
    carts,
    totalPrice,
    showCouponBuy,
    couponBuyFilter,
    userCoupons,
})
