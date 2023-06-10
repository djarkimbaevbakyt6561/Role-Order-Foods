import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/authSlice";
import { basketReducer } from "./user/basket/basket";
import { mealsReducer } from "./user/meals/meals";
import { modalReducer } from "./user/modal";
import { signInReducer } from "./sign/signIn";
import { signUpReducer } from "./sign/signUp";
import { snackBarReducer } from "./snackBar";
import { adminModalReducer, adminModalSlice } from "./admin/adminModal/adminModalSlice";
import { foodsReducer, foodsSlice } from "./admin/foods/foodsSlice";

const rootReducer = combineReducers({
    basket: basketReducer,
    meals: mealsReducer,
    snackBar: snackBarReducer,
    modal: modalReducer,
    signIn: signInReducer,
    signUp: signUpReducer,
    auth: authReducer,
    [adminModalSlice.name]: adminModalReducer,
    [foodsSlice.name]: foodsReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))