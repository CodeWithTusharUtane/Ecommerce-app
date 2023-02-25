import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userId: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
        // console.log(action.payload)
        const {email, userName, userId} = action.payload;
        state.isLoggedIn = true
        state.email = email
        state.userId = userId
        state.userName = userName
    },
    REMOVE_ACTIVE_USER: (state, action) => {
        state.isLoggedIn = false
        state.email = null
        state.userId = null
        state.userName = null
        // console.log(state.isLoggedIn)
    }

  }
});

export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserId = (state) => state.auth.userId;

export default authSlice.reducer