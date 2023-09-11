import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload));
            localStorage.setItem("isLoggedIn", true);
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state, action) => {
            localStorage.clear();
            state.user = null;
            state.isLoggedIn = false;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
