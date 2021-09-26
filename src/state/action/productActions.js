import {FETCH_PRODUCTS, SET_CATEGORIES, SET_FILTER_PRODUCTS, SET_PRODUCTS} from "../action-types/productActionTypes";
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
    return {
        type: SET_PRODUCTS,
        payload: products
    }
}

export const setFilterProducts = filteredProducts => {
    return {
        type: SET_FILTER_PRODUCTS,
        payload: filteredProducts
    }
}

export const setCategories = categories => {
    return {
        type: SET_CATEGORIES,
        payload: categories
    }
}