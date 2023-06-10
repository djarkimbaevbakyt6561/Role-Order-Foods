import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: "",
    emailValid: false,
    password: "",
    passwordValid: false,
    formValid: false
}
export const signInSlice = createSlice({
    name: "signIn",
    initialState,
    reducers: {
        getEmailValue: (state, action) => {
            state.email = action.payload
        },
        getPasswordValue: (state, action) => {
            state.password = action.payload
        },
        emailValidHandler: (state, action) => {
            state.emailValid = action.payload.includes("@")
        },
        passwordValidHandler: (state, action) => {
            state.passwordValid = action.payload.trim().length > 6
        },
        formValidHandler: (state, action) => {
            state.formValid = state.passwordValid && state.emailValid ? true : false
        }
    }
})
export const signInReducer = signInSlice.reducer
export const signInActions = signInSlice.actions