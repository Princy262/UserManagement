import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null, // Load token from localStorage
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload); // Store in localStorage
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token"); // Remove token on logout
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
