import { configureStore, createSlice } from "@reduxjs/toolkit";

/**
 * So for slice, the format is
 *
 * 1. name
 * 2. initialState
 * 3. reducer
 */

const initialState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  //defining the initial state
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

//Export the functions eg. the login and logout
export const authActions = authSlice.actions;

//export to the store.js
// export default authSlice.reducer;

export const store = configureStore({ reducer: authSlice.reducer });
