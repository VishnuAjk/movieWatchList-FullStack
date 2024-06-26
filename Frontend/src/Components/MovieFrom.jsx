// src/components/MovieForm.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, updateMovie, movieSelector } from '../Redux/Reducers/movieSlice.js';
import formStyles from '../styles/addMovieFrom.module.css'; 
import {useParams, useNavigate } from 'react-router-dom';

const MovieForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieId } = useParams();
  const {movies} = useSelector(movieSelector);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    if (movieId) {
      const movie = movies.find((movie) => movie._id === movieId);
      if (movie) {
        setTitle(movie.title);
        setDescription(movie.description);
        setYear(movie.year);
        setGenre(movie.genre);
      }
    }
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (movieId) {
      // Update existing movie
      dispatch(updateMovie({ _id: movieId, title, description, year, genre }));
    } else {
      // Add new movie
      dispatch(addMovie({ title, description, year, genre }));
    }
    setTitle('');
    setDescription('');
    setYear('');
    setGenre('');
    navigate('/home');
  };

  const handleClose = ()=>{
    navigate('/home');
  }

  return (
    <form className={formStyles.form} onSubmit={handleSubmit}>
      <div className={formStyles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={formStyles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className={formStyles.formGroup}>
        <label htmlFor="year">Year</label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>
      <div className={formStyles.formGroup}>
        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
      </div>
      <button type="submit"> {movieId ? 'Update Movie' : 'Add Movie'}</button>
      <button onClick={handleClose}><strong>Close</strong></button>
    </form>
  );
};

export default MovieForm;
