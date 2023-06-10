import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRequest } from "../../../lib/fetchAPI";
import { getFoodsForAdmins } from "../foods/foodsThunk";

export const addFood = createAsyncThunk("admin/addItem", async (data, { dispatch, rejectWithValue }) => {
    try {
        await fetchRequest(`/foods`, { method: 'post', data: data });
        await dispatch(getFoodsForAdmins())
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
    }
});
