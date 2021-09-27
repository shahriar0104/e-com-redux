import {
    FETCH_PRODUCTS,
    SET_CATEGORIES,
    SET_CATEGORY,
    SET_FILTER_PRODUCTS,
    SET_PRODUCTS, SET_SEARCH_TEXT
} from "../action-types/productActionTypes";

const initialState = {
    fetched: false,
    productList: [],
    filteredProducts: [],
    categoryList: [],
    selectedCategory: 'All',
    searchText: '',
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                fetched: true,
                productList: action.products,
                filteredProducts: action.filteredProducts,
                categoryList: action.categories,
            };
        case SET_PRODUCTS:
            return {
                ...state,
                productList: action.products,
                categoryList: action.categories,
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
        case SET_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload
            };
        case SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.payload
            };
        default:
            return state;
    }
}
export default productReducer;