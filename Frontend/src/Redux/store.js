// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Reducers/userSlice.js';
import movieReducer from "./Reducers/movieSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
  },
});

export default store;
