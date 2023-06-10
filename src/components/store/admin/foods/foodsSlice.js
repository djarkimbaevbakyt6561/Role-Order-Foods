import { createSlice } from '@reduxjs/toolkit'
import { deleteFood, getFoodsForAdmins, getFoodWithId, updateFood } from './foodsThunk';

const initialState = {
    open: false,
    title: "",
    description: "",
    price: "",
    id: "",
    foods: [],
    isLoading: false,
}

export const foodsSlice = createSlice({
    name: "foods",
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
    },
    extraReducers: (builder) => {
        builder.addCase(getFoodsForAdmins.fulfilled, (state, action) => {
            state.foods = action.payload
            state.isLoading = true
        })
        builder.addCase(getFoodsForAdmins.rejected, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(deleteFood.pending, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(deleteFood.rejected, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getFoodWithId.fulfilled, (state, action) => {
            state.title = action.payload.title
            state.description = action.payload.description
            state.price = action.payload.price
            state.isLoading = true
            state.id = action.payload._id
        })
        builder.addCase(getFoodWithId.pending, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(getFoodWithId.rejected, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(updateFood.fulfilled, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(updateFood.pending, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(updateFood.rejected, (state, action) => {
            state.isLoading = true
        })
    }
});

export const foodsActions = foodsSlice.actions
export const foodsReducer = foodsSlice.reducer