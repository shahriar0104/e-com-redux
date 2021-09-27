import {useEffect, useState} from "react";
import {keyProductList} from "../constants/keys";
import {useDispatch} from "react-redux";
import {fetchProducts} from "../state/action/productActions";


const useSetProducts = () => {
    const [loader, setLoader] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchProductList() {
            setLoader(true);
            await dispatch(fetchProducts);
        }
        if (localStorage.getItem(keyProductList) === null) {
            fetchProductList().then(() => setLoader(false));
        }
    }, []);

    return {loader};
}

export default useSetProducts;
