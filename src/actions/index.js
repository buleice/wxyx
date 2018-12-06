
import * as types from './action-types';
export const setCarts=newCarts=>({
    type:types.SET_CARTS,
    carts:newCarts
})
export const modalOpen=modalopen=>({
    type:types.SET_MODALOPEN,
    modalOpen:modalopen
})
