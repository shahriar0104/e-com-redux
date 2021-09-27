import {keyCartItemList} from "../../constants/keys";
import {
    ADD_TO_CART,
    CHANGE_QUANTITY,
    CLEAR_CART,
    DEC_QUANTITY,
    INC_QUANTITY,
    REMOVE_ITEM
} from "../action-types/cartActionTypes";

const initialState = {
    cartItemList: localStorage.getItem(keyCartItemList) === null ?
        new Map() : new Map(JSON.parse(localStorage.getItem(keyCartItemList))),
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
            item.quantity = Number(action.quantity);
            item.availableItemCount = item.rating['count'] - item.quantity;
            state.cartItemList.set(item.id, item);
            return {
                cartItemList: new Map(state.cartItemList)
            };
        case REMOVE_ITEM:
            state.cartItemList.delete(action.cartItemKey);
            // cartItemList.size !== 0 ? saveCartItemsToLS(cartItemList) : localStorage.removeItem(keyCartItemList);
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
