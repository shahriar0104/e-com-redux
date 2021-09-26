import {FETCH_PRODUCTS, SET_CATEGORIES, SET_FILTER_PRODUCTS, SET_PRODUCTS} from "../action-types/productActionTypes";
import {keyCategoryList, keyProductList} from "../../constants/keys";

const initialState = {
    productList: localStorage.getItem(keyProductList) === null ? [] : JSON.parse(localStorage.getItem(keyProductList)),
    filteredProducts: localStorage.getItem(keyProductList) === null ? [] : JSON.parse(localStorage.getItem(keyProductList)),
    categoryList: localStorage.getItem(keyCategoryList) === null ? [] : JSON.parse(localStorage.getItem(keyCategoryList)),
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            localStorage.setItem(keyProductList, JSON.stringify(action.products));
            localStorage.setItem(keyCategoryList, JSON.stringify(action.categories));
            return {
                ...state,
                productList: action.products,
                filteredProducts: action.filteredProducts,
                categoryList: action.categories,
            };
        case SET_PRODUCTS:
            return {
                ...state,
                productList: action.payload
            };
        case SET_FILTER_PRODUCTS:
            return {
                ...state,
                filteredProducts: action.payload
            };
        case SET_CATEGORIES:
            return {
                ...state,
                categoryList: action.payload
            };
        default:
            return state;
    }
}
export default productReducer;