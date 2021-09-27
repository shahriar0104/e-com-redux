import {OPEN_MODAL} from "../action-types/modalActions";

const initState = {
    openModal: false,
}

const modalReducer = (state = initState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                openModal: !state.openModal
            }
        default:
            return state;
    }
}
export default modalReducer;
