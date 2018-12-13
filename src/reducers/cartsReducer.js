import {addClass} from "../components/common/js/dom";

const carts = (state = [], action) => {
    switch (action.type) {
        case 'SET_CARTS':
            return action.carts;
        default:
            return state
    }
}
const modalOpen = (state = false, action) => {
    switch (action.type) {
        case 'SET_MODALOPEN':
            return action.modalOpen;
        default:
            return state
    }
}

const totalPrice=(state=0,action)=>{
    switch (action.type) {
        case 'CAL_TOATOLPRICE':
            return action.totalPrice;
        default:
            return state
    }
}
const showCouponBuy=(state=false,action)=>{
    switch (action.type) {
        case 'SET_SHOWCOUPONBUY':
            return action.showCouponBuy;
        default:
            return state
    }
}
const couponBuyFilter=(state=0,action)=>{
    switch (action.type) {
        case 'SET_COUPONBUYFILTER':
            return action.couponBuyFilter;
        default:
            return state
    }
}
const userCoupons=(state=[],action)=>{
    switch (action.type) {
        case "SET_COUPONS":
            return action.userCoupons;
        default:
            return state
    }
}
const cantuanPrice=(state=0,action)=>{
    switch (action.type) {
        case "SET_CANTUANPRICE":
            return action.cantuanPrice;
        default:
            return state
    }
}
export {
    carts,
    totalPrice,
    showCouponBuy,
    couponBuyFilter,
    userCoupons,
    cantuanPrice
}
