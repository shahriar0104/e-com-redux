import {keyCartItemList} from "../../constants/keys";
import {
    ADD_TO_CART,
    CHANGE_QUANTITY,
    CLEAR_CART,
    DEC_QUANTITY, ON_BLUR_QUANTITY,
    INC_QUANTITY,
    REMOVE_ITEM
} from "../action-types/cartActionTypes";

const initialState = {
    cartItemList: localStorage.getItem(keyCartItemList) === null ?
        new Map() : new Map(JSON.parse(localStorage.getItem(keyCartItemList))),
}

const saveCartItemsToLS = (cartItems) => {
    localStorage.setItem(keyCartItemList, JSON.stringify(Array.from(cartItems.entries())));
}

const cartReducer = (state = initialState, action) => {
    let newProduct;
    switch (action.type) {
        case ADD_TO_CART:
            newProduct = {...action.payload};
            newProduct.quantity = 1;
            newProduct.availableItemCount = newProduct.rating['count'] - 1;
            state.cartItemList.set(newProduct.id, newProduct);
            saveCartItemsToLS(state.cartItemList);
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
            saveCartItemsToLS(state.cartItemList);
            return {
                cartItemList: new Map(state.cartItemList)
            };
        case DEC_QUANTITY:
            newProduct = {...state.cartItemList.get(action.cartItemKey)};
            newProduct.quantity -= 1;
            newProduct.availableItemCount += 1;
            if (newProduct.quantity === 0) state.cartItemList.delete(newProduct.id);
            else state.cartItemList.set(newProduct.id, newProduct);
            saveCartItemsToLS(state.cartItemList);
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
            saveCartItemsToLS(state.cartItemList);
            return {
                cartItemList: new Map(state.cartItemList)
            };
        case ON_BLUR_QUANTITY:
            const cartItem = {...state.cartItemList.get(action.cartItemKey)};
            if (!action.quantity || Number(action.quantity) <= 0) cartItem.quantity = 1;
            if (cartItem.quantity > cartItem.rating['count']) cartItem.quantity = cartItem.rating['count'];
            cartItem.availableItemCount = cartItem.rating['count'] - cartItem.quantity;
            state.cartItemList.set(cartItem.id, cartItem);
            saveCartItemsToLS(state.cartItemList);
            return {
                cartItemList: new Map(state.cartItemList)
            };
        case REMOVE_ITEM:
            state.cartItemList.delete(action.cartItemKey);
            state.cartItemList.size !== 0 ? saveCartItemsToLS(state.cartItemList) : localStorage.removeItem(keyCartItemList);
            return {
                cartItemList: new Map(state.cartItemList)
            };
        case CLEAR_CART:
            localStorage.removeItem(keyCartItemList);
            return {
                cartItemList: new Map()
            };
        default:
            return state;
    }
}
export default cartReducer;
