import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://reqres.in/api/users";

// Fetch Users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (page = 1) => {
  const response = await axios.get(`${API_URL}?page=${page}`);
  return response.data.data;
});

// Add User (Register)
export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data; // The API returns the created user
});

// Login User
export const loginUser = createAsyncThunk("users/loginUser", async ({ email, password }, { getState }) => {
  const { users } = getState().users;
  const user = users.find((u) => u.email === email && u.password === password);
  
  if (user) {
    localStorage.setItem("token", "fake-jwt-token"); // Simulate authentication
    return user;
  } else {
    throw new Error("Invalid credentials");
  }
});

// Logout User
export const logoutUser = createAsyncThunk("users/logoutUser", async () => {
  localStorage.removeItem("token");
  return null;
});

// Update User
export const updateUser = createAsyncThunk("users/updateUser", async ({ id, data }) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return { id, ...response.data };
});

// Delete User
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    currentUser: null,
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "succeeded";
      })
      // Add User (Register)
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      // Login User
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.token = "fake-jwt-token";
      })
      .addCase(loginUser.rejected, (state) => {
        state.error = "Invalid credentials";
      })
      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.token = null;
      })
      // Update User
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
