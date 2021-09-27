import {useSelector} from "react-redux";

const CartHelper = () => {
    const cartItemList = useSelector(state => state.cartReducer.cartItemList);

    const isProductAvailable = (cartItemKey) => {
        return cartItemList.get(cartItemKey).availableItemCount > 0;
    }

    const itemsLeft = (cartItemKey) => {
        return cartItemList.get(cartItemKey).availableItemCount;
    }

    const isItemPresentInCart = (cartItemKey) => {
        return cartItemList.has(cartItemKey);
    }

    const getNumOfSpecificItemAddedInCart = (cartItemKey) => {
        return cartItemList.get(cartItemKey).quantity;
    }

    const getTotalNumOfItemAddedInCart = () => {
        let totalItemInCart = 0;
        cartItemList.forEach((value) => totalItemInCart += value.quantity);
        return totalItemInCart;
    }

    const allItemPriceAddedInCart = (cartItems) => {
        let totalPrice = 0;
        if (cartItems === undefined) cartItems = new Map(cartItemList);
        cartItems.forEach((value) => totalPrice += (value.price * value.quantity));
        return totalPrice.toFixed(2);
    }

    return {
        isProductAvailable,
        isItemPresentInCart,
        itemsLeft,
        getNumOfSpecificItemAddedInCart,
        getTotalNumOfItemAddedInCart,
        allItemPriceAddedInCart,
    }
}

export default CartHelper;
