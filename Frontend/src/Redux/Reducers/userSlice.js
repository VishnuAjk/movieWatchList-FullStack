// src/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getMovies } from './movieSlice';



export const fetchUserStatus = createAsyncThunk('user/fetchUserStatus', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { userInfo: null };
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await axios.get('https://moviewatchlist-server.onrender.com/user/status', config);
    return response.data;
  } catch (error) {
    console.error('Error fetching user status:', error);
    throw error;
  }
});

export const signUp = createAsyncThunk('user/signUp', async (formData) => {
  const response = await axios.post('https://moviewatchlist-server.onrender.com/user/signup', formData);
  return response.data;
});

export const signIn = createAsyncThunk('user/signIn', async (formData) => {
  const response = await axios.post('https://moviewatchlist-server.onrender.com/user/signin', formData);
 
  return response.data;
});

export const signOut = createAsyncThunk('user/signOut', async () => {
  // Remove token from localStorage
  localStorage.removeItem('token');
});


const userSlice = createSlice({
  name: 'user',
  initialState: { 
    userInfo: null,
    status: 'idle',
    error: null,
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserStatus.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.userInfo = action.payload.userInfo;
    })
    .addCase(fetchUserStatus.rejected, (state, action) => {
      state.status = 'failed';
      state.userInfo = null;
      state.error = action.error.message;
    })
    .addCase(signUp.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(signUp.fulfilled, (state) => {
      state.status = 'succeeded';
    })
    .addCase(signUp.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(signIn.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(signIn.fulfilled, (state, action) => {
      state.status = 'succeeded';
      console.log(action.payload.user);
      state.userInfo = action.payload.user;
      // Store token in local storage
      localStorage.setItem('token', action.payload.token);
    })
    .addCase(signIn.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(signOut.fulfilled, (state) => {
      state.status = 'idle';
      state.userInfo = null;
    });
  },
});


const userReducer = userSlice.reducer;
export const userSelector = (state) => state.user;
export default userReducer;

