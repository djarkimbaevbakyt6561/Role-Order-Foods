import { createSlice } from "@reduxjs/toolkit";
import { addFood } from "./adminModalThunk";
const initialState = {
    open: false,
    title: "",
    description: "",
    price: "",
    isLoading: true
}
export const adminModalSlice = createSlice({
    name: "adminModal",
    initialState,
    reducers: {
        toggleModalHandler: (state, action) => {
            state.open = !state.open
        },
        getTitleValue: (state, action) => {
            state.title = action.payload
        },
        getDescriptionValue: (state, action) => {
            state.description = action.payload
        },
        getPriceValue: (state, action) => {
            state.price = action.payload
        },
        resetHandler: (state, action) => {
            state.price = ""
            state.title = ""
            state.description = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addFood.pending, (state, action) => {
            state.isLoading = false            
        })
        builder.addCase(addFood.fulfilled, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(addFood.rejected, (state, action) => {
            state.isLoading = true
        })
    }

})
export const adminModalReducer = adminModalSlice.reducer
export const adminModalActions = adminModalSlice.actions
