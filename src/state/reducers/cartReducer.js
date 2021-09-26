
const initialState = {
    cartItems: [],
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        // case SET_PRODUCTS:
        //     return {
        //         productList: action.payload
        //     };
        // case SET_FILTER_PRODUCTS:
        //     return {
        //         filterProducts: action.payload
        //     };
        default:
            return state;
    }
}
export default cartReducer;