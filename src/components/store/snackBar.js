import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    open: false,
    saverity: 'error',
    message: '',
}
export const snackBarSlice = createSlice({
    name: "snackBar",
    initialState,
    reducers: {
        successHandler: (state, action) => {
            state.open = true
            state.message = action.payload
            state.saverity = "success"
        },
        errorHandler: (state, action) => {
            state.open = true
            state.message = action.payload
            state.saverity = "error"
        },
        closeHandler: (state, action) => {
            state.open = false
        }
    }
})
export const snackBarReducer = snackBarSlice.reducer
export const snackBarActions = snackBarSlice.actions