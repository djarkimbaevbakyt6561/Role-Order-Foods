import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    open: false
}
export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        toggleModalHandler: (state, action) => {
            state.open = !state.open
        } 
    } 
    
})
export const modalReducer = modalSlice.reducer
export const modalActions = modalSlice.actions
