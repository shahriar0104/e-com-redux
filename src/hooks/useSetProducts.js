import {useEffect, useState} from "react";
import {keyCategoryList, keyProductList} from "../constants/keys";
import generateCategoryList from "../helper/generateCategoryList";
// import {ShoppingListContext} from "../context/ShoppingContext";
import {useDispatch} from "react-redux";
import {setCategories, setFilterProducts, setProducts} from "../state/action/productActions";


const useSetProducts = () => {
    // const {productList, setProductList} = useContext(ShoppingListContext);
    // const [filteredProducts, setFilteredProducts] = useState([]);
    // const [categoryList, setCategoryList] = useState([]);
    const [loader, setLoader] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem(keyProductList) === null) {
            setLoader(true);
            fetch('https://fakestoreapi.com/products')
                .then((response) => response.json())
                .then(responseData => {

                    localStorage.setItem(keyProductList, JSON.stringify(responseData));
                    dispatch(setProducts(responseData));
                    dispatch(setFilterProducts(responseData));

                    const categories = generateCategoryList(responseData);
                    localStorage.setItem(keyCategoryList, JSON.stringify(categories));
                    dispatch(setCategories(categories));

                    setLoader(false);
                });
        } else {
            const products = JSON.parse(localStorage.getItem(keyProductList));
            dispatch(setProducts(products));
            dispatch(setFilterProducts(products));
            dispatch(setCategories(JSON.parse(localStorage.getItem(keyCategoryList))));
        }
    }, []);

    return {loader};
}

export default useSetProducts;
