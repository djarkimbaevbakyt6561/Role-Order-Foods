import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: "",
    email: "",
    emailValid: false,
    password: "",
    passwordValid: false,
    confirmPassword: "",
    confirmPasswordValid: false,
    formValid: false
}
export const signUpSlice = createSlice({
    name: "signUp",
    initialState,
    reducers: {
        getNameValue: (state, action) => {
            state.name = action.payload
        },
        getEmailValue: (state, action) => {
            state.email = action.payload
        },
        getPasswordValue: (state, action) => {
            state.password = action.payload
        },
        getConfirmPasswordValue: (state, action) => {
            state.confirmPassword = action.payload
        },
        emailValidHandler: (state, action) => {
            state.emailValid = action.payload.includes("@")
        },
        passwordValidHandler: (state, action) => {
            state.passwordValid = action.payload.trim().length > 6
        },
        confirmPasswordValidHandler: (state, action) => {
            state.confirmPasswordValid = state.password === action.payload
        },
        formValidHandler: (state, action) => {
            state.formValid = state.passwordValid && state.emailValid && state.confirmPasswordValid ? true : false
            console.log(state.formValid);
            
        }
    }
})
export const signUpReducer = signUpSlice.reducer
export const signUpActions = signUpSlice.actions