import { createSlice } from '@reduxjs/toolkit'
import { USERS_ROLE } from '../../../constants';
import { signInRequest, signUpRequest } from './authThunk';
function getUserDataFromStorage() {
    const userData = localStorage.getItem("AuthLogin")
    if (userData) {
        const parsedUserData = JSON.parse(userData)
        return {
            isAuthorization: true,
            isLoading: true,
            token: parsedUserData.token,
            user: {
                name: parsedUserData.user.name,
                email: parsedUserData.user.email,
                role: parsedUserData.user.role
            }
        }
    }

    return {
        isAuthorization: false,
        isLoading: true,
        token: "",
        user: {
            name: "",
            email: "",
            password: "",
            role: ""
        }
    }
}
const initialState = getUserDataFromStorage()
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOutHandler: (state, action) => {
            state.isAuthorization = false
            state.user.role = USERS_ROLE.ADMIN
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpRequest.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.isLoading = true
            state.user = {
                name: action.payload.user.name,
                email: action.payload.user.email,
                role: action.payload.user.role
            }
        });
        builder.addCase(signUpRequest.pending, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(signUpRequest.rejected, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(signInRequest.fulfilled, (state, action) => {
            state.isAuthorization = true;
            state.token = action.payload.token;
            state.isLoading = true
            state.user = {
                name: action.payload.user.name,
                email: action.payload.user.email,
                role: action.payload.user.role
            };
        });
        builder.addCase(signInRequest.pending, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(signInRequest.rejected, (state, action) => {
            state.isLoading = true
        })
    },
});

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer