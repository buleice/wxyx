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
export {
    carts,
    modalOpen
}
