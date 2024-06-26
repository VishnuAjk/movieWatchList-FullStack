import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { movieSelector } from '../Redux/Reducers/movieSlice.js';
import styles from "../styles/movieDetails.module.css";
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { movies } = useSelector(movieSelector);
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (movieId && movies.length > 0) {
      const selectedMovie = movies.find((movie) => movie._id === movieId);
      if (selectedMovie) {
        setMovie(selectedMovie);
      } else {
        // Handle case where movieId doesn't match any movie in the list
        console.log(`Movie with id ${movieId} not found`);
      }
    }
  }, [movieId, movies]);

  // Conditional rendering when movie is null
  if (!movie) {
    return <div className={styles.loading}>Loading...</div>;
  }

  

  return (
    <div className={styles.movieDetails}>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsHeader}>
          <h1>{movie.title}</h1>
        </div>
        <div className={styles.detailsContent}>
          <p><strong>Description:</strong> {movie.description}</p>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
