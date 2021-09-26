import React, {createContext, useState} from "react";
import {keyCartItemList, keyProductList} from "../constants/keys";

export const ShoppingListContext = createContext([]);

function ShoppingContext(props) {
    const [productList, setProductList] = useState(
        localStorage.getItem(keyProductList) === null ? []
            : JSON.parse(localStorage.getItem(keyProductList))
    );
    const [cartItemList, setCartItemList] = useState(
        localStorage.getItem(keyCartItemList) === null ?
            new Map() : new Map(JSON.parse(localStorage.getItem(keyCartItemList)))
    );
    const [openModal, setOpenModal] = useState(false);
    return (
        <ShoppingListContext.Provider value={{
            productList, setProductList, cartItemList, setCartItemList, openModal, setOpenModal
        }}>
            {props.children}
        </ShoppingListContext.Provider>
    )
}

export default ShoppingContext;
