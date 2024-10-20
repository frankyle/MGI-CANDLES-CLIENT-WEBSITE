import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Corrected to default import
import dayjs from 'dayjs';

const baseURL = "https://django-backend-4feae45a7e65.herokuapp.com/api/";

// Function to get auth tokens from localStorage
const getAuthTokens = () => {
  const tokens = localStorage.getItem('authTokens');
  return tokens ? JSON.parse(tokens) : null;
};

// Function to check if token is expired
const isTokenExpired = (token) => {
  const decoded = jwtDecode(token);
  return dayjs.unix(decoded.exp).diff(dayjs()) < 1; // Returns true if expired
};

// Initial state
const initialState = {
  user: getAuthTokens() && !isTokenExpired(getAuthTokens().access)
    ? jwtDecode(getAuthTokens().access)
    : null,
  authTokens: getAuthTokens() && !isTokenExpired(getAuthTokens().access)
    ? getAuthTokens()
    : null,
  loading: false,
  error: null,
};

// Thunk for logging in the user
export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios.post(`${baseURL}token/`, { email, password });
    const data = response.data;
    localStorage.setItem('authTokens', JSON.stringify(data)); // Save tokens to local storage
    return data;
  } catch (error) {
    console.error("Login Error:", error); // Logs full error object
    const errorMsg = error.response?.data || error.message || 'Login failed';
    return thunkAPI.rejectWithValue(errorMsg);
  }
});



// Thunk for registering a new user
export const registerUser = createAsyncThunk('auth/registerUser', async ({ email, username, password, password2 }, thunkAPI) => {
  try {
    const response = await axios.post(`${baseURL}register/`, { email, username, password, password2 });
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error); // Logs full error object
    // Capture error details (status, message) if available
    const errorMsg = error.response?.data || error.message || 'Something went wrong';
    return thunkAPI.rejectWithValue(errorMsg);
  }
});



// Thunk for refreshing the token
export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const refresh = state.auth.authTokens?.refresh; // Get refresh token from state

  if (!refresh) {
    thunkAPI.dispatch(logout()); // Clear tokens if no refresh token is found
    return thunkAPI.rejectWithValue('No refresh token found');
  }

  try {
    const response = await axios.post(`${baseURL}token/refresh/`, { refresh });
    const data = response.data;
    localStorage.setItem('authTokens', JSON.stringify(data)); // Update tokens in local storage
    return data;
  } catch (error) {
    thunkAPI.dispatch(logout()); // Clear tokens on failure
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to refresh token');
  }
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.authTokens = null;
      localStorage.removeItem('authTokens'); // Clear tokens from local storage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authTokens = action.payload;
        state.user = jwtDecode(action.payload.access); // Decode user info
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.authTokens = action.payload;
        state.user = jwtDecode(action.payload.access); // Update user info after refresh
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.authTokens = null;
        state.user = null;
        localStorage.removeItem('authTokens'); // Clear tokens on failure
      });
  },
});

// Exporting logout action
export const { logout } = authSlice.actions;
export default authSlice.reducer;
