import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../state/action/productActions";


const useSetProducts = () => {
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const fetched = useSelector(state => state.productReducer.fetched);

    useEffect(() => {
        async function fetchProductList() {
            setLoader(true);
            await dispatch(fetchProducts);
        }
        if (!fetched) {
            fetchProductList().then(() => setLoader(false));
        }
    }, []);

    return {loader};
}

export default useSetProducts;
