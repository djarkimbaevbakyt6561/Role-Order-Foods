import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRequest } from "../../../lib/fetchAPI"

const initialState = {
    items: [],
    totalAmount: 0,
    isLoading: false,
};

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        getTotalAmount: (state, action) => {
            state.totalAmount = state.items.reduce(
                (prev, current) => prev + current.amount,
                0
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getBasket.fulfilled, (state, action) => {
            state.items = action.payload;
            state.isLoading = true;
        });
        builder.addCase(getBasket.pending, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getBasket.rejected, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(incrementAmount.pending, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(incrementAmount.fulfilled, (state, action) => {
            const updatedItemsIncrement = state.items.map((el) => {
                if (el._id === action.payload) {
                    return { ...el, amount: el.amount + 1 };
                }
                return el;
            });
            state.items = updatedItemsIncrement;
            state.isLoading = true
        });
        builder.addCase(incrementAmount.rejected, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(decrementAmount.pending, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(decrementAmount.fulfilled, (state, action) => {
            const updatedItemsDecrement = state.items.map((el) => {
                if (el._id === action.payload) {
                    return { ...el, amount: el.amount - 1 };
                }
                return el;
            });
            state.items = updatedItemsDecrement;
            state.isLoading = true
        });
        builder.addCase(decrementAmount.rejected, (state, action) => {
            state.isLoading = true
        })
    }
});

export const basketReducer = basketSlice.reducer;
export const basketActions = basketSlice.actions;

export const getBasket = createAsyncThunk(
    "basket/getBasket",
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetchRequest(`/basket`);
            return response.data.items;
        } catch (error) {
            new Error(error);
            console.log(error);
            return rejectWithValue(error.message)
        }
    }
);

export const incrementAmount = createAsyncThunk(
    "basket/incrementAmount",
    async ({ id, amount }, { dispatch, rejectWithValue }) => {
        try {
            await fetchRequest(`/basketItem/${id}/update`, {
                method: "put",
                data: { amount: amount + 1 }
            });
            return id;
        } catch (error) {
            new Error(error);
            console.log(error);
            return rejectWithValue(error.message)
        }
    }
);
export const decrementAmount = createAsyncThunk(
    "basket/decrementAmount",
    async ({ id, amount }, { dispatch, rejectWithValue }) => {
        try {
            await fetchRequest(`/basketItem/${id}/update`, {
                method: "put",
                data: { amount: amount - 1 }
            });
            if (amount <= 1) {
                await fetchRequest(`/basketItem/${id}/delete`, { method: "delete" });
                await dispatch(getBasket());
            }
            return id;
        } catch (error) {
            new Error(error);
            console.log(error);
            return rejectWithValue(error.message)
        }
    }
);
