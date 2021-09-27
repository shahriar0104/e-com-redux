import {
    ADD_TO_CART,
    CHANGE_QUANTITY,
    CLEAR_CART,
    DEC_QUANTITY,
    INC_QUANTITY,
    REMOVE_ITEM
} from "../action-types/cartActionTypes";

export const addToCart = cartItem => {
    return {
        type: ADD_TO_CART,
        payload: cartItem
    }
}

export const incQuantity = cartItemKey => {
    return {
        type: INC_QUANTITY,
        cartItemKey
    }
}

export const decQuantity = cartItemKey => {
    return {
        type: DEC_QUANTITY,
        cartItemKey
    }
}

export const changeQuantity = (cartItemKey, quantity) => {
    return {
        type: CHANGE_QUANTITY,
        cartItemKey,
        quantity
    }
}

export const removeItem = cartItemKey => {
    return {
        type: REMOVE_ITEM,
        cartItemKey
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}
