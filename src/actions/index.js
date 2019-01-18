
import * as types from './action-types';
export const setCarts=newCarts=>({
    type:types.SET_CARTS,
    carts:newCarts
})
export const modalOpen=modalopen=>({
    type:types.SET_MODALOPEN,
    modalOpen:modalopen
})

export const totalPrice=totalprice=>({
    type:types.CAL_TOATOLPRICE,
    totalPrice:totalprice
})
export const showCouponBuy=isShow=>({
    type:types.SET_SHOWCOUPONBUY,
    showCouponBuy:isShow,
})
export const couponBuyFilter=condition=>({
    type:types.SET_COUPONBUYFILTER,
    couponBuyFilter:condition
})
export const userCoupons=coupons=>({
    type:types.SET_COUPONS,
    userCoupons:coupons
})

export const cantuanPrice=price=>({
    type:types.SET_CANTUANPRICE,
    cantuanPrice:price
})
export const pageData=data=>({
    type:types.SET_PAGEDATA,
    pageData:data
})
