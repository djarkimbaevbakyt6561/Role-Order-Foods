import { fetchRequest } from "../../../lib/fetchAPI"
import { getBasket } from "../basket/basket"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
const initialState = {
    meals: [],
    isLoading: false,
}
export const mealsSlice = createSlice({
    name: 'meals',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getMeals.fulfilled, (state, action) => {
            state.meals = action.payload
            state.isLoading = true
        });
        builder.addCase(getMeals.rejected, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(addItem.pending, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(addItem.fulfilled, (state, action) => {
            state.isLoading = true
        })
    }
})
export const mealsReducer = mealsSlice.reducer;
export const mealsActions = mealsSlice.actions;
export const getMeals = createAsyncThunk("meals/getMeals", async (payload, { dispatch, rejectWithValue }) => {
    try {
        const response = await fetchRequest('/foods');
        console.log(response);
        return response.data
    } catch (error) {
        new Error(error);
        console.log(error);
        return rejectWithValue(error.message)
    }
})
export const addItem = createAsyncThunk("meals/addItem", async ({ id, amount }, { dispatch, rejectWithValue }) => {
    try {
        await fetchRequest(`/foods/${id}/addToBasket`, { method: 'post', data: { amount } });
        dispatch(getBasket());
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
    }
});