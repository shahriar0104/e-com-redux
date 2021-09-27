import {
    FETCH_PRODUCTS,
    SET_CATEGORIES,
    SET_CATEGORY,
    SET_FILTER_PRODUCTS,
    SET_PRODUCTS, SET_SEARCH_TEXT
} from "../action-types/productActionTypes";
import axios from "axios";
import generateCategoryList from "../../helper/generateCategoryList";

export const fetchProducts = async (dispatch) => {
    const res = await axios('https://fakestoreapi.com/products');
    const categories = generateCategoryList(res.data);
    dispatch({
        type: FETCH_PRODUCTS,
        products: res.data,
        filteredProducts: res.data,
        categories: categories
    });
}

export const setProducts = products => {
    const categories = generateCategoryList(products);
    return {
        type: SET_PRODUCTS,
        products,
        categories
    }
}

export const setFilterProducts = filteredProducts => {
    return {
        type: SET_FILTER_PRODUCTS,
        payload: filteredProducts
    }
}

export const setCategory = category => {
    return {
        type: SET_CATEGORY,
        payload: category
    }
}

export const setSearchText = text => {
    return {
        type: SET_SEARCH_TEXT,
        payload: text
    }
}

export const setCategories = categories => {
    return {
        type: SET_CATEGORIES,
        payload: categories
    }
}