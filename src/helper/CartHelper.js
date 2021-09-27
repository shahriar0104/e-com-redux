// import {useContext} from "react";
// import {ShoppingListContext} from "../context/ShoppingContext";
import {keyCartItemList} from "../constants/keys";
import {useSelector} from "react-redux";
import {useState} from "react";

const CartHelper = () => {
    // const {productList, cartItemList, setCartItemList} = useContext(ShoppingListContext);
    // const productList = useSelector(state => {
    //     console.log(state);
    //     return state.productReducer.productList;
    // });
    // const [cartItemList, setCartItemList] = useState(new Map());
    // const [productList, setProductList] = useState([]);

    const productList = useSelector(state => {
        // console.log(state.productReducer.productList);
        return state.productReducer.productList
    });
    const cartItemList = useSelector(state => {
        // console.log(state.cartReducer.cartItemList);
        return state.cartReducer.cartItemList
    });

    // const updateCart = (cartItem, isItemPresent, isIncrement) => {
    //     if (!cartItemList.has(cartItem.id)) {
    //         const newProduct = {...cartItem};
    //         newProduct.quantity = 1;
    //         newProduct.availableItemCount = newProduct.rating['count'] - 1;
    //         cartItemList.set(newProduct.id, newProduct);
    //     } else {
    //         const newProduct = {...cartItemList.get(cartItem.id)};
    //         if (isIncrement) {
    //             if (newProduct.availableItemCount > 0) {
    //                 newProduct.quantity += 1
    //                 newProduct.availableItemCount -= 1;
    //             }
    //         } else {
    //             newProduct.quantity -= 1;
    //             newProduct.availableItemCount += 1;
    //         }
    //         if (newProduct.quantity === 0) cartItemList.delete(newProduct.id);
    //         else cartItemList.set(newProduct.id, newProduct);
    //     }
    //     setCartItemList(new Map(cartItemList));
    //     saveCartItemsToLS(cartItemList);
    // }

    const saveCartItemsToLS = (cartItems) => {
      localStorage.setItem(keyCartItemList, JSON.stringify(Array.from(cartItems.entries())));
    }

    // const removeItemFromCart = (cartItemKey) => {
    //     cartItemList.delete(cartItemKey);
    //     setCartItemList(new Map(cartItemList));
    //     cartItemList.size !== 0 ? saveCartItemsToLS(cartItemList) : localStorage.removeItem(keyCartItemList);
    // }

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

    const onChangeQuantity = (event, cartItem, isItemPresent, isIncrement) => {
        let quantity = 0;
        try {
            quantity = event.target.value;
            if (quantity > productList[cartItem.id - 1].rating['count'] || !quantity)
                event.preventDefault();
            else {
                const item = {...cartItem};
                item.quantity = Number(quantity);
                item.availableItemCount = item.rating['count'] - item.quantity;
                cartItemList.set(item.id, item);
                // setCartItemList(new Map(cartItemList));
                saveCartItemsToLS(cartItemList);
            }
        } catch (e) {
            // isIncrement ?
            //     (
            //         isItemPresent ? updateCart(cartItem, true, true)
            //         : updateCart(cartItem, false, true)
            //     )
            //     :
            //     updateCart(cartItem, true, false);
        }
    }

    return {
        // updateCart,
        // removeItemFromCart,
        isProductAvailable,
        isItemPresentInCart,
        itemsLeft,
        getNumOfSpecificItemAddedInCart,
        getTotalNumOfItemAddedInCart,
        allItemPriceAddedInCart,
        onChangeQuantity,
    }
}

export default CartHelper;
