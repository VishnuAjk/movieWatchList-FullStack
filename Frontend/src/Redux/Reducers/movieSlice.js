
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');
  
const config = {
  headers: {
    authorization: `Bearer ${token}`, 
  },
};

// Get movies from DB
export const getMovies = createAsyncThunk('movies/getMovies', async (_, { getState }) => {
   
    const response = await axios.get('http://localhost:3100/movies/get', config);
    return response.data.movies;
  });
  
//   Add a new movie to the watchList
  export const addMovie = createAsyncThunk('movies/add', async (movieData) => {

    const response = await axios.post('http://localhost:3100/movies/add', movieData, config); 
    
    return response.data;
  });
  
//   delete Movie from WatchList

export const deleteMovie = createAsyncThunk('/movies/delete', async(movieId)=>{

    const response = await axios.delete(`http://localhost:3100/movies/delete/${movieId}`, config);
    return movieId;
})

// Updating a movie in list
export const updateMovie = createAsyncThunk('movies/update', async ({ _id, title, description, year, genre }) => {
    try {
      const response = await axios.put(`http://localhost:3100/movies/update/${_id}`, { title, description, year, genre }, config);
      return response.data; // Assuming your API returns the updated movie object
    } 
    catch (error) {
      throw Error(error.response.data.message); // Adjust error handling as per your API response structure
    }
  });

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [
        {
            title: 'Inception',
            description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
            year: 2010,
            genre: 'Sci-Fi'
          },
          {
            title: 'The Shawshank Redemption',
            description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
            year: 1994,
            genre: 'Drama'
          },
          {
            title: 'The Godfather',
            description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
            year: 1972,
            genre: 'Crime'
          }
    ],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        state.movies.push(action.payload);
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = state.movies.filter(movie => movie.id !== action.payload);
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Find the index of the updated movie in the movies array and update it
        console.log(action.payload);
        const index = state.movies.findIndex((movie) => movie._id === action.payload._id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const movieSelector = (state) => state.movies;
export default movieSlice.reducer;
