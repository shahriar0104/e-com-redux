import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
    productReducer,
    cartReducer,
    modalReducer
});

// const rootReducer = (state = {}, action) => {
//     const languageCodes = state.languages.map(language => language.code);
//     return {
//         languages: languages(state.languages, action),
//         // merge languageCodes with original action object, now you have access in translations reducer
//         translations: translations(state.translations, {...action, languageCodes})
//     };
// };

export default rootReducer
