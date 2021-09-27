import {
    ADD_TO_CART,
    CHANGE_QUANTITY,
    CLEAR_CART,
    DEC_QUANTITY, ON_BLUR_QUANTITY,
    INC_QUANTITY,
    REMOVE_ITEM
} from "../action-types/cartActionTypes";

const initialState = {
    cartItemList: new Map(),
}

const cartReducer = (state = initialState, action) => {
    let newProduct;
    switch (action.type) {
        case ADD_TO_CART:
            newProduct = {...action.payload};
            newProduct.quantity = 1;
            newProduct.availableItemCount = newProduct.rating['count'] - 1;
            state.cartItemList.set(newProduct.id, newProduct);
            return {
                cartItemList: new Map(state.cartItemList)
            };
        case INC_QUANTITY:
            newProduct = {...state.cartItemList.get(action.cartItemKey)};
            if (newProduct.availableItemCount > 0) {
                newProduct.quantity += 1
                newProduct.availableItemCount -= 1;
            }
            state.cartItemList.set(newProduct.id, newProduct);
            return {
                cartItemList: new Map(state.cartItemList)
            };
        case DEC_QUANTITY:
            newProduct = {...state.cartItemList.get(action.cartItemKey)};
            newProduct.quantity -= 1;
            newProduct.availableItemCount += 1;
            if (newProduct.quantity === 0) state.cartItemList.delete(newProduct.id);
            else state.cartItemList.set(newProduct.id, newProduct);
            return {
                cartItemList: new Map(state.cartItemList)
            };
        case CHANGE_QUANTITY:
            const item = {...state.cartItemList.get(action.cartItemKey)};
            if (!action.quantity) {
                item.quantity = '';
                item.availableItemCount = item.rating['count'];
            } else {
                item.quantity = Number(action.quantity);
                item.availableItemCount = item.rating['count'] - item.quantity;
            }
            state.cartItemList.set(item.id, item);
            return {
                cartItemList: new Map(state.cartItemList)
            };
        case ON_BLUR_QUANTITY:
            const cartItem = {...state.cartItemList.get(action.cartItemKey)};
            if (!action.quantity || Number(action.quantity) <= 0) cartItem.quantity = 1;
            if (cartItem.quantity > cartItem.rating['count']) cartItem.quantity = cartItem.rating['count'];
            cartItem.availableItemCount = cartItem.rating['count'] - cartItem.quantity;
            state.cartItemList.set(cartItem.id, cartItem);
            return {
                cartItemList: new Map(state.cartItemList)
            };
        case REMOVE_ITEM:
            state.cartItemList.delete(action.cartItemKey);
            return {
                cartItemList: new Map(state.cartItemList)
            };
        case CLEAR_CART:
            return {
                cartItemList: new Map()
            };
        default:
            return state;
    }
}
export default cartReducer;
