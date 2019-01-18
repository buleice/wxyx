import {combineReducers} from 'redux'
import {
    carts, totalPrice, showCouponBuy, couponBuyFilter, userCoupons
} from "./cartsReducer";
import {pageData} from "./reducer-child";
export default combineReducers({
    carts,
    totalPrice,
    showCouponBuy,
    couponBuyFilter,
    userCoupons,
    pageData
})
