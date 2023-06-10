import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRequest } from "../../../lib/fetchAPI";

export const getFoodsForAdmins = createAsyncThunk("foods/getFoods", async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await fetchRequest(`/foods`);
        return response.data
    } catch (error) {
        return rejectWithValue(error.message);
    }
})
export const deleteFood = createAsyncThunk("foods/deleteFood", async (id, { dispatch, rejectWithValue }) => {
    try {
        await fetchRequest(`/foods/${id}`, { method: 'delete' });
        await dispatch(getFoodsForAdmins())
    } catch (error) {
        return rejectWithValue(error.message);
    }

})
export const getFoodWithId = createAsyncThunk("foods/getFood", async (id, { dispatch, rejectWithValue }) => {
    try {
        const response = await fetchRequest(`/foods/${id}`);
        return response.data
    } catch (error) {
        return rejectWithValue(error.message);
    }

})
export const updateFood = createAsyncThunk("food/updateFood", async ({ data, id }, { dispatch, rejectWithValue }) => {
    try {
        await fetchRequest(`/foods/${id}`, { method: "put", data: data });
        await dispatch(getFoodsForAdmins())
    } catch (error) {
        return rejectWithValue(error.message);
    }
})